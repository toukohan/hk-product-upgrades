/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
const inputs = document.querySelectorAll('input[name^="hkpu_product_upgrade_"]');
const initialPriceElement = document.querySelector(".woocommerce-Price-amount bdi");
if (inputs.length && initialPriceElement) {
  const taxFreePriceElement = document.querySelector(".woocommerce-price-suffix .woocommerce-Price-amount bdi");
  const basePrice = parseFloat(initialPriceElement.textContent.replace(",", "."));
  const priceSuffix = initialPriceElement.innerHTML.split("&nbsp;")[1];
  const taxFreePrice = parseFloat(taxFreePriceElement.textContent.replace(",", "."));
  inputs.forEach(input => {
    input.addEventListener("change", event => {
      updateTotalPrice();
    });
  });
  function updateTotalPrice() {
    const checkedInputs = document.querySelectorAll('input[name^="hkpu_product_upgrade_"]:checked');
    let totalPrice = 0;
    checkedInputs.forEach(input => {
      totalPrice += parseFloat(input.dataset.price.replace(",", "."));
    });
    const total = basePrice + totalPrice;
    initialPriceElement.innerHTML = total.toFixed(2) + " " + priceSuffix;
    if (!taxFreePriceElement) return;
    const taxFreeTotal = taxFreePrice + totalPrice;
    taxFreePriceElement.innerHTML = taxFreeTotal.toFixed(2) + " " + priceSuffix;
  }
}
/******/ })()
;
//# sourceMappingURL=frontend.js.map