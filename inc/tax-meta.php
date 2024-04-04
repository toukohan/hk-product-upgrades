<?php

// Custom Tax Meta
add_action( 'upgrade-category_add_form_fields', 'hkpu_add_upgrade_category_fields', 10, 2 );

function hkpu_add_upgrade_category_fields() {
    ?>
    <div class="form-field">
        <label for="hkpu_term_icon"><?php _e( 'Icon', 'hk-product-upgrades' ); ?></label>
        <input type="text" name="hkpu_term_icon" id="hkpu_term_icon" value="">
        <p class="description"><?php _e( 'Enter an icon for this category', 'hk-product-upgrades' ); ?></p>
    </div>
    <div class="form-field">
        <label for="hkpu_custom_field_reference"><?php _e( 'Custom Field Reference', 'hk-product-upgrades' ); ?></label>
        <input type="text" name="hkpu_custom_field_reference" id="hkpu_custom_field_reference" value="">
        <p class="description"><?php _e( 'Enter a custom field reference for this category', 'hk-product-upgrades' ); ?></p>
    </div>
    <?php
}

add_action( 'create_upgrade-category', 'hkpu_save_upgrade_category_meta' );
add_action( 'edited_upgrade-category', 'hkpu_save_upgrade_category_meta' );

// function hkpu_save_upgrade_category_meta( $term_id ) {
//     if ( ! isset( $_POST['hkpu_term_icon'] ) ) {
//         return;
//     }

//     update_term_meta(
//         $term_id,
//         'hkpu_term_icon',
//         sanitize_text_field( $_POST['hkpu_term_icon'] )
//     );
// }

function hkpu_save_upgrade_category_meta( $term_id ) {
    if ( isset( $_POST['hkpu_term_icon'] ) ) {
        update_term_meta(
            $term_id,
            'hkpu_term_icon',
            sanitize_text_field( $_POST['hkpu_term_icon'] )
        );
    }

    if ( isset( $_POST['hkpu_custom_field_reference']) ) {
        update_term_meta(
            $term_id,
            'hkpu_custom_field_reference',
            sanitize_text_field( $_POST['hkpu_custom_field_reference'] )
        );
    }
    
}

add_action( 'upgrade-category_edit_form_fields', 'hkpu_edit_upgrade_category_fields', 10, 2 );

function hkpu_edit_upgrade_category_fields( $term, $taxonomy ) {
    $icon = get_term_meta( $term->term_id, 'hkpu_term_icon', true );
    $custom_field_reference = get_term_meta( $term->term_id, 'custom_field_reference', true );
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

    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="hkpu_custom_field_reference"><?php _e( 'Custom Field Reference', 'hk-product-upgrades' ); ?></label>
        </th>
        <td>
            <input type="text" name="hkpu_custom_field_reference" id="hkpu_custom_field_reference" value="<?php echo esc_attr( $custom_field_reference ); ?>">
            <p class="description"><?php _e( 'Enter a custom field reference for this category', 'hk-product-upgrades' ); ?></p>
        </td>
    </tr>
    <?php
}