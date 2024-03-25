<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

global $product;

$upgrades = get_post_meta($product->get_id(), 'hkpu_upgrades', false);
if (empty($upgrades)) {
	return;
}
$upgrades = get_posts([
	'post_type' => 'product-upgrade',
	'post__in' => $upgrades[0],
	'meta_key' => 'hkpu_category',
  'orderby' => 'meta_value',
	'posts_per_page' => -1,
]);
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'hkpu-product-upgrades',
));
$current_category = '';
$first_of_category = true;
?>
<div <?php echo $wrapper_attributes; ?>>
	<h2><?php echo __('Product Upgrades', 'hk-product-upgrades'); ?></h2>
	<div class="hkpu-product-upgrades__grid">
		<?php foreach ($upgrades as $upgrade) : 
			$category = get_post_meta($upgrade->ID, 'hkpu_category', true);
			if ($first_of_category && !$current_category === '') {
				?>
				</div>
				<?php
			}	
			if ($current_category !== $category) {
				$current_category = $category;
				$cat_name = get_term($category, 'upgrade-category')->name;
				$first_of_category = true;
			}
			if ($first_of_category) {
			?>
			<div class="hkpu-product-upgrades__<?php echo esc_attr($cat_name); ?>">
			<h4><?php echo esc_html($cat_name); ?></h4>
			<?php
			$first_of_category = false;
			} 
			?>
			<div class="hkpu-product-upgrades__upgrade">
				<h5><?php echo esc_html($upgrade->post_title); ?></h5>
				<p><?php echo esc_html(get_post_meta($upgrade->ID, 'hkpu_price', true)); ?></p>
			</div>
		<?php endforeach; ?>
		</div> <!-- close last category div -->
	</div>
</div>
