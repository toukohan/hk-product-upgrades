<?php

add_action('rest_api_init', function () {
  register_rest_route('hkpu/v1', '/product/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'hkpu_get_product_by_id',
    'args' => array(
      'id' => array(
        'validate_callback' => function($param, $request, $key) {
          return is_numeric($param);
        }
      ),
    ),
  ));

  register_rest_route('hkpu/v1', '/product-upgrades/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'hkpu_get_product_upgrades',
    'args' => array(
      'id' => array(
        'validate_callback' => function($param, $request, $key) {
          return is_numeric($param);
        }
      ),
    ),
  ));
  register_rest_route('hkpu/v1', '/product-upgrade-data/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'hkpu_get_all_product_upgrade_data',
    'args' => array(
      'id' => array(
        'validate_callback' => function($param, $request, $key) {
          return is_numeric($param);
        }
      ),
    ),
  ));
});

function hkpu_get_product_by_id($data) {
  $product_id = $data['id'];
  $product = wc_get_product($product_id);

  if (!empty($product)) {
    return $product->get_data();
  }

  return null;
}

function hkpu_get_product_upgrades($data) {
  $product_id = $data['id'];
  $upgrades = get_post_meta($product_id, 'hkpu_upgrades', false);
  $upgrades = empty($upgrades) ? array() : maybe_unserialize($upgrades[0]);
 
  return $upgrades;
}

function hkpu_get_all_product_upgrade_data($data) {
  $upgrades = new WP_Query(array(
    'post_type' => 'product-upgrade',
    'posts_per_page' => -1,
    'meta_key' => 'hkpu_category',
    'orderby' => 'meta_value',
  ));

  $upgrade_data = array();

  while ($upgrades->have_posts()) {
    $upgrades->the_post();
    $upgrade_data['upgrades'][] = array(
      'id' => get_the_ID(),
      'title' => get_the_title(),
      'price' => get_post_meta(get_the_ID(), 'hkpu_price', true),
      'category' => get_post_meta(get_the_ID(), 'hkpu_category', true),
    );
  }

  wp_reset_postdata();

  $product_id = $data['id'];
  $selected_upgrades = get_post_meta($product_id, 'hkpu_upgrades', false);
  $selected_upgrades = empty($selected_upgrades) ? array() : maybe_unserialize($selected_upgrades[0]);

  $upgrade_data['selected_upgrades'] = $selected_upgrades;

  // Terms for the upgrade categories.
  $terms = get_terms(array(
    'taxonomy' => 'upgrade-category',
    'hide_empty' => false,
  ));

  $upgrade_data['categories'] = array();

  foreach ($terms as $term) {
    $upgrade_data['categories'][] = array(
      'id' => $term->term_id,
      'name' => $term->name,
      'icon' => get_term_meta($term->term_id, 'hkpu_term_icon', true),
    );
  }

  return $upgrade_data;
}