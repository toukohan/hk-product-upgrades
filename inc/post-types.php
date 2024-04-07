<?php

// Post Type Hooks
add_action( 'init', 'hkpu_product_upgrade_post_type' );
add_action( 'save_post_product-upgrade', 'hkpu_save_product_upgrade_meta' );
add_action( 'save_post_product', 'hkpu_save_product_meta' );

// Custom Post Type
function hkpu_product_upgrade_post_type() {
  $labels = array(
      'name'               => _x( 'Product Upgrades', 'post type general name', 'hk-product-upgrades' ),
      'singular_name'      => _x( 'Product Upgrade', 'post type singular name', 'hk-product-upgrades' ),
      'menu_name'          => _x( 'Product Upgrades', 'admin menu', 'hk-product-upgrades' ),
      'name_admin_bar'     => _x( 'Product Upgrade', 'add new on admin bar', 'hk-product-upgrades' ),
      'add_new'            => _x( 'Add New', 'product upgrade', 'hk-product-upgrades' ),
      'add_new_item'       => __( 'Add New Product Upgrade', 'hk-product-upgrades' ),
      'new_item'           => __( 'New Product Upgrade', 'hk-product-upgrades' ),
      'edit_item'          => __( 'Edit Product Upgrade', 'hk-product-upgrades' ),
      'view_item'          => __( 'View Product Upgrade', 'hk-product-upgrades' ),
      'all_items'          => __( 'All Product Upgrades', 'hk-product-upgrades' ),
      'search_items'       => __( 'Search Product Upgrades', 'hk-product-upgrades' ),
      'parent_item_colon'  => __( 'Parent Product Upgrades:', 'hk-product-upgrades' ),
      'not_found'          => __( 'No product upgrades found.', 'hk-product-upgrades' ),
      'not_found_in_trash' => __( 'No product upgrades found in Trash.', 'hk-product-upgrades' )
  );

  $args = array(
      'labels'             => $labels,
      'public'             => false,
      'publicly_queryable' => false,
      'show_ui'            => true,
      'show_in_menu'       => true,
      'show_in_rest'       => true,     
      'query_var'          => true,
      'rewrite'            => array( 'slug' => 'product-upgrade' ),
      'capability_type'    => 'post',
      'has_archive'        => true,
      'hierarchical'       => false,
      'menu_position'      => null,
      'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
      'taxonomies'         => array( 'upgrade-category' ),
  );

  register_post_type( 'product-upgrade', $args );

  register_taxonomy( 'upgrade-category', 'product-upgrade', array(
      'label' => __( 'Upgrade Category', 'hk-product-upgrades' ),
      'rewrite' => array( 'slug' => 'upgrade-category' ),
      'show_in_rest' => true,
  ) );

  register_post_meta( 'product-upgrade', 'hkpu_price', array(
      'show_in_rest' => true,
      'single' => true,
      'type' => 'string',
      'default' => '',
      'description' => __('The price of the product upgrade', 'hk-product-upgrades'),
  ) );

  register_post_meta( 'product-upgrade', 'hkpu_category', array(
      'show_in_rest' => true,
      'single' => true,
      'type' => 'string',
      'default' => '',
      'description' => __('The category of the product upgrade', 'hk-product-upgrades'),
  ) );

  // Add meta field for Woocommerce product
  if( class_exists('Woocommerce')) {
    register_post_meta( 'product', 'hkpu_upgrades', array(
        'show_in_rest' => array(
            'schema' => array(
                'type'  => 'array',
                'items' => array(
                    'type' => 'integer',
                ),
            ),
        ),
        'single' => true,
        'type' => 'array',
        'default' => array(),
        'description' => __('The upgrades available for this product', 'hk-product-upgrades'
    )));
  }
}

function hkpu_save_product_upgrade_meta( $post_id ) {
  if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
      return;
  }

  if ( ! current_user_can( 'edit_post', $post_id ) ) {
      return;
  }

  if ( isset( $_POST['hkpu_price'] ) ) {
      update_post_meta(
          $post_id,
          'hkpu_price',
          sanitize_text_field( $_POST['hkpu_price'] )
      );
  }

  if ( isset( $_POST['hkpu_category'] ) ) {
      update_post_meta(
          $post_id,
          'hkpu_category',
          sanitize_text_field( $_POST['hkpu_category'] )
      );}
      wp_set_object_terms( 
        $post_id, 
        sanitize_text_field( $_POST['hkpu_category'] ), 
        'upgrade-category', 
        false 
    );
}

function hkpu_save_product_meta( $post_id ) {
    if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
        return;
    }
  
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
  
    if ( isset( $_POST['hkpu_upgrades'] ) ) {
        update_post_meta(
            $post_id,
            'hkpu_upgrades',
            $_POST['hkpu_upgrades']
        );
    }
  }

// add_action( 'woocommerce_admin_process_product_object', 'inspect_product_data_before_save', 10, 1 );

function inspect_product_data_before_save( $product ) {
    // Log the product data
    error_log( 'woocommerce_admin_process_product_object');
    error_log( print_r( $product->get_data(), true ) );
}

 // add_action( 'woocommerce_before_product_object_save', 'inspect_product_data', 10, 2 );

  function inspect_product_data( $product, $data_store ) {
      // Log the product data
      error_log( 'woocommerce_before_product_object_save');
    error_log( print_r( $product->get_data(), true ) );
    //   error_log( '$_POST' );
    //   error_log( print_r( $_POST, true ) );
    //   error_log( 'Product' );
    //   error_log( print_r( $product, true ) );
    //   error_log( 'Data Store' );
    //   error_log( print_r( $data_store, true ) );
  }


  //add_action( 'woocommerce_after_product_object_save', 'inspect_product_data_after', 10, 2 );



