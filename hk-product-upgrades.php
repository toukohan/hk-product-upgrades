<?php
/**
 * Plugin Name: Hk Product Upgrades
 * 
*/
 
if( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'HKPU_VERSION', '1.0.0' );
define( 'HKPU_DIR', plugin_dir_path( __FILE__ ) );
define( 'HKPU_DIR_URL', plugin_dir_url( __FILE__ ) );

require_once HKPU_DIR . 'inc/post-types.php';
require_once HKPU_DIR . 'inc/admin.php';
require_once HKPU_DIR . 'inc/cart.php';
require_once HKPU_DIR . 'inc/rest-api.php';

register_activation_hook(__FILE__, 'hkpu_activate_plugin' );
register_deactivation_hook(__FILE__, 'hkpu_deactivate_plugin' );
add_action( 'admin_enqueue_scripts', 'hkpu_admin_scripts' );
add_action( 'admin_enqueue_scripts', 'hkpu_product_editor_scripts' );

function hkpu_activate_plugin() {
    // If version is less than 5.9, then show an error and deactivate the plugin
    if( version_compare(get_bloginfo('version'), '5.9', '<') ) {
        wp_die(__('You must update WordPress to use this plugin', 'hk-product-upgrades'));
    }
    hkpu_product_upgrade_post_type();
    flush_rewrite_rules();
}
function hkpu_deactivate_plugin() {
    flush_rewrite_rules();
}

function hkpu_admin_scripts( $hook ) {
    // Load only on ?page=hk-product-upgrades.
    if ( 'toplevel_page_hk-product-upgrades' !== $hook ) {
        return;
    }
 
    // Load the required WordPress packages.
 
    // Automatically load imported dependencies and assets version.
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
 
    // Enqueue CSS dependencies.
    foreach ( $asset_file['dependencies'] as $style ) {
        wp_enqueue_style( $style );
    }
 
    // Load our app.js.
    wp_register_script(
        'hk-product-upgrades',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );
    wp_enqueue_script( 'hk-product-upgrades' );
 
    // Load our style.css.
    wp_register_style(
        'hk-product-upgrades',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        $asset_file['version']
    );
    wp_enqueue_style( 'hk-product-upgrades' );
}
 
function hkpu_product_editor_scripts() {
    global $post_type;
    // Load only on product edit page.
    if ( ! is_admin() || 'product' !== $post_type ) {
        return;
    }

    // Load the required WordPress packages.

    // Automatically load imported dependencies and assets version.
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/inputs.asset.php';

    // Enqueue CSS dependencies.
    foreach ( $asset_file['dependencies'] as $style ) {
        wp_enqueue_style( $style );
    }

    // Load our inputs.js.
    wp_register_script(
        'hk-product-inputs',
        plugins_url( 'build/inputs.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );
    wp_enqueue_script( 'hk-product-inputs' );

    // Load our style.css.
    wp_register_style(
        'hk-product-inputs',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        $asset_file['version']
    );
    wp_enqueue_style( 'hk-product-inputs' );
}



// Custom Tax Meta
add_action( 'upgrade-category_add_form_fields', 'hkpu_add_upgrade_category_fields', 10, 2 );

function hkpu_add_upgrade_category_fields() {
    ?>
    <div class="form-field">
        <label for="hkpu_term_icon"><?php _e( 'Icon', 'hk-product-upgrades' ); ?></label>
        <input type="text" name="hkpu_term_icon" id="hkpu_term_icon" value="">
        <p class="description"><?php _e( 'Enter an icon for this category', 'hk-product-upgrades' ); ?></p>
    </div>
    <?php
}

add_action( 'create_upgrade-category', 'hkpu_save_upgrade_category_meta' );
add_action( 'edited_upgrade-category', 'hkpu_save_upgrade_category_meta' );

function hkpu_save_upgrade_category_meta( $term_id ) {
    if ( ! isset( $_POST['hkpu_term_icon'] ) ) {
        return;
    }

    update_term_meta(
        $term_id,
        'hkpu_term_icon',
        sanitize_text_field( $_POST['hkpu_term_icon'] )
    );
}

add_action( 'upgrade-category_edit_form_fields', 'hkpu_edit_upgrade_category_fields', 10, 2 );

function hkpu_edit_upgrade_category_fields( $term, $taxonomy ) {
    $icon = get_term_meta( $term->term_id, 'hkpu_term_icon', true );
    ?>
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="hkpu_term_icon"><?php _e( 'Icon', 'hk-product-upgrades' ); ?></label>
        </th>
        <td>
            <input type="text" name="hkpu_term_icon" id="hkpu_term_icon" value="<?php echo esc_attr( $icon ); ?>">
            <p class="description"><?php _e( 'Enter an icon for this category', 'hk-product-upgrades' ); ?></p>
        </td>
    </tr>
    <?php
}



