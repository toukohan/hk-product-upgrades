<?php

// Admin Hooks
add_action( 'admin_menu', 'hkpu_admin_menu' );
add_action( 'add_meta_boxes', 'hkpu_add_product_upgrade_meta_box' );


// Admin Menu
function hkpu_admin_menu() {
  add_menu_page(
      __( 'Hk Product Upgrades', 'hk-product-upgrades' ),
      __( 'Hk Product Upgrades', 'hk-product-upgrades' ),
      'manage_options',
      'hk-product-upgrades',
      'hkpu_admin_page',
      'dashicons-schedule',
      3
  );
}

function hkpu_admin_page() {
  ?>
      <div class="hk-product-upgrades-wrapper">
          <h2><?php echo __('Product Upgrades', 'hk-product-upgrades'); ?></h2>
          <div id="hk-product-upgrades"></div>
      </div>
  <?php
}

// Add meta box for Woocommerce product
function hkpu_add_product_upgrade_meta_box() {
  if( class_exists('Woocommerce')) {
      add_meta_box(
          'hkpu_product_upgrade_meta_box',
          __('Product Upgrades', 'hk-product-upgrades'),
          'hkpu_product_upgrade_test_box',
          'product',
          'side',
          'default'
      );
  }
}
function hkpu_product_upgrade_test_box( $post ) {
    ?>
    <div class="components-base-control">
        <div class="components-base-control__field" id="hkpu_product_upgrade_inputs">
         
        </div>
    </div>
    <?php
}

function hkpu_product_upgrade_meta_box( $post ) {
  $selected_upgrades = get_post_meta( $post->ID, 'hkpu_upgrades', false );
  $selected_upgrades = empty( $selected_upgrades ) ? array() : $selected_upgrades[0];
  
  
  $upgrades = new WP_Query( array(
      'post_type' => 'product-upgrade',
      'posts_per_page' => -1,
      'meta_key' => 'hkpu_category',
      'orderby' => 'meta_value',
     
  ) );
  ?>
  <div class="components-base-control">
      <div class="components-base-control__field">
          <?php
          $current_category = '';
          while ( $upgrades->have_posts() ) {
              $upgrades->the_post();
              if ( $current_category !== get_post_meta( get_the_ID(), 'hkpu_category', true ) ) {
                  $current_category = get_post_meta( get_the_ID(), 'hkpu_category', true );
                  $term = get_term( $current_category, 'upgrade-category' );
                  if ( $term instanceof WP_Term ) {
                      echo '<h4>' . esc_html( $term->name ) . '</h4>';
                  }
              }
              ?>
              <div>
                  <input
                      type="checkbox"
                      id="hkpu_upgrades_<?php the_ID(); ?>"
                      name="hkpu_upgrades[]"
                      value="<?php the_ID(); ?>"
                      <?php checked( in_array( get_the_ID(), $selected_upgrades ), true ); ?>
                  />
                  <label for="hkpu_upgrades_<?php the_ID(); ?>"><?php the_title(); ?></label>
              </div>
              <?php
          }
          wp_reset_postdata();
          ?>
      </div>
  </div>
  <?php
}