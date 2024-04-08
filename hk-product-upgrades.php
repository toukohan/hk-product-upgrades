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
require_once HKPU_DIR . 'inc/tax-meta.php';

register_activation_hook(__FILE__, 'hkpu_activate_plugin' );
register_deactivation_hook(__FILE__, 'hkpu_deactivate_plugin' );
add_action( 'admin_enqueue_scripts', 'hkpu_admin_scripts' );
add_action( 'admin_enqueue_scripts', 'hkpu_product_editor_scripts' );
add_action( 'wp_enqueue_scripts', 'hkpu_enqueue_frontend_scripts' );

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
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/main.asset.php';
 
    // Enqueue CSS dependencies.
    foreach ( $asset_file['dependencies'] as $style ) {
        wp_enqueue_style( $style );
    }
 
    // Load our app.js.
    wp_register_script(
        'hk-product-upgrades',
        plugins_url( 'build/main.js', __FILE__ ),
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

function hkpu_enqueue_frontend_scripts() {
    if( is_admin(  ) ) {
        return;
    }

    wp_register_script(
        'hkpu-frontend',
        plugins_url( 'build/frontend.js', __FILE__ ),
        array(), // dependencies
        '1.0.0', // version number
        true // load the script in the footer
    );

    wp_enqueue_script( 'hkpu-frontend' );

    wp_register_style(
        'hk-product-upgrades',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        $asset_file['version']
    );
    wp_enqueue_style( 'hk-product-upgrades' );
}







