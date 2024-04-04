/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
const inputs = document.querySelectorAll('input[name^="hkpu_product_upgrade_"]');
let checkedInputs = document.querySelectorAll('input[name^="hkpu_product_upgrade_"]:checked');
const initialPrice = document.querySelector(".woocommerce-Price-amount bdi");
const basePrice = parseFloat(initialPrice.textContent);
const priceSuffix = initialPrice.innerHTML.split("&nbsp;")[1];
console.log("basePrice", basePrice);
inputs.forEach(input => {
  input.addEventListener("change", event => {
    updateTotalPrice();
  });
});
function updateTotalPrice() {
  checkedInputs = document.querySelectorAll('input[name^="hkpu_product_upgrade_"]:checked');
  let totalPrice = 0;
  checkedInputs.forEach(input => {
    totalPrice += parseFloat(input.dataset.price);
  });
  const total = basePrice + totalPrice;
  initialPrice.innerHTML = total.toFixed(2) + priceSuffix;
}
/******/ })()
;
//# sourceMappingURL=frontend.js.map