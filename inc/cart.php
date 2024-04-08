<?php

// Hook into add to cart
//add_action( 'woocommerce_before_add_to_cart_quantity', 'hkpu_add_hidden_cart_inputs' );
add_action( 'woocommerce_after_add_to_cart_button', 'hkpu_add_visible_cart_inputs' );
//add_action( 'woocommerce_add_to_cart', 'hkpu_add_to_cart', 10, 6);
//add_action( 'woocommerce_ajax_added_to_cart', 'hkpu_ajax_add_to_cart');
// Add hidden input field to add to cart form for each product upgrade category

function hkpu_add_hidden_cart_inputs() {
  // Check if we are on the single product page and if the product has upgrades
  if ( ! is_product() || ! hkpu_product_has_upgrades() ) {
    return;
  }

  // Get the product upgrade categories
  $categories = hkpu_get_product_upgrade_categories();
  $upgrades = get_post_meta( get_the_ID(), 'hkpu_upgrades', true );
  echo '<pre>';
  print_r($categories);
  echo '</pre>';
  // Loop through the categories and add a hidden input field for each
  foreach ( $categories as $category ) {
    echo '<input type="hidden" name="hkpu_category_' . esc_attr( $category ) . '" value="">';
  }
}

function hkpu_add_visible_cart_inputs() {
  // Check if we are on the single product page and if the product has upgrades
  if ( ! is_product() || ! hkpu_product_has_upgrades() ) {
    return;
  }
  global $product;

  // Get the product upgrade categories
  $categories = hkpu_get_product_upgrade_categories();

  // Wrap the inputs in a div
  ?>
  <div class="product__upgrades">
  <?php
  // Loop through categories and create inputs for each category
  foreach ( $categories as $category ) {
    // Get the upgrades for the current category
    $upgrades = hkpu_get_product_upgrades_by_category( $category );
    $term = get_term( $category, 'upgrade-category' );
    $term_custom_field_reference = get_term_meta( $category, 'hkpu_custom_field_reference', true );
    $term_name = $term instanceof WP_Term ? $term->name : $category;
    $default_upgrade = 'Ei päivitystä';
    if($term_custom_field_reference) {
      $default_upgrade = get_post_meta( $product->get_id(), $term_custom_field_reference, true );
      if(is_array($default_upgrade)) {
        $default_upgrade = $default_upgrade[0];
      }
    }
    ?>
    <div class="product__upgrade--category product__upgrade--<?php echo esc_attr(strtolower($term_name)); ?>">
      <h3 class="product__upgrade--title"><?php echo esc_html($term_name); ?></h3>
      <label class="product__upgrade--label" for="product__upgrade--default-<?php echo esc_attr(strtolower($term_name)); ?>">
        <input id="product__upgrade--default-<?php echo esc_attr(strtolower($term_name)); ?>" type="radio" name="hkpu_product_upgrade_<?php echo esc_attr($category); ?>" value="default" data-price=0 checked>
        <span class="product__upgrade--name"><?php echo esc_html($default_upgrade); ?></span>
        <span class="product__upgrade--price">0€</span>
      </label>
    <?php
    
    foreach ( $upgrades as $upgrade ) {
      $upgrade_title = get_the_title( $upgrade );
      $upgrade_price = get_post_meta( $upgrade, 'hkpu_price', true );
      ?>
        <label class="product__upgrade--label" for="product__upgrade--<?php echo $upgrade; ?>">
            <input id="product__upgrade--<?php echo $upgrade; ?>" type="radio" name="hkpu_product_upgrade_<?php echo esc_attr($category); ?>" value="<?php echo $upgrade; ?>" data-price="<?php echo $upgrade_price; ?>">
            <span class="product__upgrade--name"><?php echo $upgrade_title; ?></span>
            <span class="product__upgrade--price">+<?php echo $upgrade_price; ?>€</span>
          </label>
        
      <?php
    } ?>
    </div>
  <?php
  }
  ?>
  </div>
  <?php
}

function hkpu_product_has_upgrades() {
  global $product;
  $upgrades = get_post_meta( $product->get_id(), 'hkpu_upgrades', false );
  return ! empty( $upgrades );
}

function hkpu_filter_upgrades($upgrades) {
  return array_filter($upgrades, function($upgrade_id) {
    $post_status = get_post_status($upgrade_id);
    return $post_status === 'publish';
  });
}

function hkpu_get_product_upgrade_categories($product_id = null) {
  if ( is_null( $product_id ) ) {
    $product_id = get_the_ID();
  }
  $upgrades = get_post_meta( $product_id, 'hkpu_upgrades', false );
  $upgrades = empty( $upgrades ) ? array() : $upgrades[0];
  // Filter upgrades to include only those with 'publish' status
  $upgrades = hkpu_filter_upgrades($upgrades);

  $categories = array();
  foreach ( $upgrades as $upgrade_id ) {
    $category = get_post_meta( $upgrade_id, 'hkpu_category', true );
    if ( ! empty( $category ) ) {
      $categories[] = $category;
    }
  }
  return array_unique( $categories );
}

function hkpu_get_product_upgrades_by_category( $category ) {
  $upgrades = get_post_meta( get_the_ID(), 'hkpu_upgrades', false );
  $upgrades = empty( $upgrades ) ? array() : $upgrades[0];

  // Filter upgrades to include only those with 'publish' status
  $upgrades = hkpu_filter_upgrades($upgrades);

  $category_upgrades = array();
  foreach ( $upgrades as $upgrade_id ) {
    $upgrade_category = get_post_meta( $upgrade_id, 'hkpu_category', true );
    if ( $upgrade_category === $category ) {
      $category_upgrades[] = $upgrade_id;
    }
  }
  return $category_upgrades;
}

function hkpu_add_to_cart($cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data) {
  $product = wc_get_product($product_id);
  $upgrades = array();
  $categories = hkpu_get_product_upgrade_categories($product_id);
  foreach ( $categories as $category ) {
    $upgrade_id = isset( $_POST['hkpu_product_upgrade_' . $category] ) ? absint( $_POST['hkpu_product_upgrade_' . $category] ) : 0;
    if ( $upgrade_id ) {
      $cart_item_data['hkpu_product_upgrade_' . $category] = $upgrade_id;
    }
  }
  return $cart_item_data;
}

add_filter( 'woocommerce_add_cart_item_data', 'hkpu_add_cart_item_data', 10, 3 );
function hkpu_add_cart_item_data( $cart_item_data, $product_id, $variation_id ) {

  error_log( 'Before add_to_cart: ' . print_r( $_POST, true ) );
  error_log( 'Before add_to_cart: ' . print_r( $cart_item_data, true ) );
    $categories = hkpu_get_product_upgrade_categories($product_id);

  error_log( 'Categories: ' . print_r( $categories, true ) );
    foreach ( $categories as $category ) {
        $upgrade_id = isset( $_POST['hkpu_product_upgrade_' . $category] ) ? absint( $_POST['hkpu_product_upgrade_' . $category] ) : 0;
        if ( $upgrade_id ) {
            $cart_item_data['hkpu_product_upgrade_' . $category] = $upgrade_id;
        }
    }

    error_log( 'After add_to_cart: ' . print_r( $cart_item_data, true ) );
    return $cart_item_data;
}

add_filter( 'woocommerce_cart_item_name', 'hkpu_display_product_upgrades_in_cart', 10, 3 );
function hkpu_display_product_upgrades_in_cart( $name, $cart_item, $cart_item_key ) {
    $product_id = $cart_item['product_id'];
    $categories = hkpu_get_product_upgrade_categories($product_id);
    $upgrade_html = '';
    $upgrades_total = 0;
    foreach ( $categories as $category ) {
        if ( isset( $cart_item['hkpu_product_upgrade_' . $category] ) ) {
            $upgrade_id = $cart_item['hkpu_product_upgrade_' . $category];
            $upgrade = get_post( $upgrade_id );
            $term_name = get_term( $category, 'upgrade-category' )->name;
            if ( $upgrade instanceof WP_Post && get_post_type( $upgrade ) === 'product-upgrade' ) {
              $upgrade_title = $upgrade->post_title;
              $upgrade_price = get_post_meta( $upgrade_id, 'hkpu_price', true );
              $upgrades_total += $upgrade_price;
              $upgrade_price .= '€';
              $upgrade_html .= '<div class="cart-product-upgrades__upgrade">';
              $upgrade_html .= '<span class="cart-product-upgrades__upgrade--category">'. $term_name . ': </span>';
              $upgrade_html .= '<span class="cart-product-upgrades__upgrade--name">' . $upgrade_title . '</span>';
              $upgrade_html .= '<span class="cart-product-upgrades__upgrade--price"> ' .$upgrade_price . '</span>';
              $upgrade_html .= '</div>';
          }
        }
    } 
    if ( ! empty( $upgrade_html ) ) {
        $base_price = $cart_item['data']->get_price();
        $name = '<div class="cart-product-upgrades"><span class="cart-product-upgrades__name">' . $name . '</span>';
        $name .= '<div class="cart-product-upgrades__wrapper">';
        $name .= '<div class="cart-product-upgrades__base">';
        $name .= '<span class="cart-product-upgrades__base--key">Perushinta: </span><span class="cart-product-upgrades__base--price">' . $base_price . '€</span>';
        $name .= '</div>';
        $name .= $upgrade_html;
        $name .= '</div>';

    }
    return $name;
}

add_action( 'woocommerce_before_calculate_totals', 'hkpu_recalculate_product_price', 10, 1 );
function hkpu_recalculate_product_price( $cart ) {
    if ( is_admin() ) {
        return;
    }

    foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) {
        $product_id = $cart_item['product_id'];
        $categories = hkpu_get_product_upgrade_categories($product_id);
        $new_price = $cart_item['data']->get_price();
        foreach ( $categories as $category ) {
            if ( isset( $cart_item['hkpu_product_upgrade_' . $category] ) ) {
                $upgrade_id = $cart_item['hkpu_product_upgrade_' . $category];
                $upgrade_price = get_post_meta( $upgrade_id, 'hkpu_price', true );
                if ( $upgrade_price ) {
                    $new_price += $upgrade_price;
                }
            }
        }
        $cart_item['data']->set_price( $new_price );
    }
}

if( defined( 'CFW_VERSION')) {
  //add_action('cfw_before_cart_item_subtotal', 'hkpu_upgraded_item_price_in_cart' );
  //add_filter('woocommerce_cart_item_product', 'hkpu_upgraded_item_price_in_cart' );
}

function hkpu_upgraded_item_price_in_cart($item) {
  $product_id = $item['product_id'];
  $categories = hkpu_get_product_upgrade_categories($product_id);
  $upgrades_total = 0;
  foreach ( $categories as $category ) {
      if ( isset( $item['hkpu_product_upgrade_' . $category] ) ) {
          $upgrade_id = $item['hkpu_product_upgrade_' . $category];
          $upgrade_price = get_post_meta( $upgrade_id, 'hkpu_price', true );
          $upgrades_total += $upgrade_price;
      }
  }
  if ( $upgrades_total > 0 ) {
      $item['data']->set_price( $item['data']->get_price() + $upgrades_total );
  }
  return $item;
}

// add_filter( 'woocommerce_cart_item_price', 'hkpu_display_upgrade_price_in_cart', 10, 3 );

// function hkpu_display_upgrade_price_in_cart( $price, $cart_item, $cart_item_key ) {
//     $product_id = $cart_item['product_id'];
//     $categories = hkpu_get_product_upgrade_categories($product_id);
//     $upgrades_total = 0;
//     foreach ( $categories as $category ) {
//         if ( isset( $cart_item['hkpu_product_upgrade_' . $category] ) ) {
//             $upgrade_id = $cart_item['hkpu_product_upgrade_' . $category];
//             $upgrade_price = get_post_meta( $upgrade_id, 'hkpu_price', true );
//             $upgrades_total += $upgrade_price;
//         }
//     }
//     if ( $upgrades_total > 0 ) {
//         $price .= ' + ' . $upgrades_total . '€';
//     }
//     return $price;
// }
// add_filter( 'woocommerce_get_item_data', 'hkpu_display_upgrade_info_in_cart_item_meta', 10, 2 );
// function hkpu_display_upgrade_info_in_cart_item_meta( $item_data, $cart_item ) {
//     $categories = hkpu_get_product_upgrade_categories($cart_item['product_id']);
//     foreach ( $categories as $category ) {
//         if ( isset( $cart_item['hkpu_product_upgrade_' . $category] ) ) {
//             $upgrade_id = $cart_item['hkpu_product_upgrade_' . $category];
//             $upgrade = get_post( $upgrade_id );
//             if ( $upgrade instanceof WP_Post && get_post_type( $upgrade ) === 'product-upgrade' ) {
//                 $upgrade_title = $upgrade->post_title;
//                 $upgrade_price = get_post_meta( $upgrade_id, 'hkpu_price', true ) . '€';
//                 $term_name = get_term( $category, 'upgrade-category' )->name;
//                 $item_data[] = array(
//                     'key'     => $term_name,
//                     'value'   => $upgrade_title . ' ' . $upgrade_price,
//                     'display' => '',
//                 );
//             }
//         }
//     }
//     return $item_data;
// }
// add_action( 'wp_footer', 'hkpu_dump_cart_data' );
// function hkpu_dump_cart_data() {
//     if ( is_cart() ) {
//         echo '<pre style="margin-left: var(--sidebar-width);">';
//         var_dump( WC()->cart->get_cart() );
//         echo '</pre>';
//     }
// }