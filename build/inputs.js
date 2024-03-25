/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UpgradeInputs.js":
/*!******************************!*\
  !*** ./src/UpgradeInputs.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpgradeInputs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);



function UpgradeInputs() {
  var _categories$map;
  const [selectedUpgrades, setSelectedUpgrades] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [selectionsResolved, setSelectionsResolved] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [upgrades, setUpgrades] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const productId = window.location.search.split("&")[0].split("=")[1];
    fetch(`/wp-json/hkpu/v1/product-upgrade-data/${productId}`).then(response => response.json()).then(data => {
      setUpgrades(data.upgrades);
      setCategories(data.categories);
      setSelectedUpgrades(data.selected_upgrades);
      setSelectionsResolved(true);
    });
  }, []);
  const handleChange = e => {
    const upgradeId = e.target.value;
    if (selectedUpgrades.includes(upgradeId)) {
      setSelectedUpgrades(selectedUpgrades.filter(id => id !== upgradeId));
    } else {
      setSelectedUpgrades([...selectedUpgrades, upgradeId]);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "upgrade-inputs"
  }, selectionsResolved ? (_categories$map = categories?.map(category => category && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(UpgradeCategory, {
    key: category.id,
    category: category,
    upgrades: upgrades,
    selectedUpgrades: selectedUpgrades,
    handleChange: handleChange
  }))) !== null && _categories$map !== void 0 ? _categories$map : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null));
}
const UpgradeCategory = ({
  category,
  upgrades,
  selectedUpgrades,
  handleChange
}) => {
  const categoryUpgrades = upgrades.filter(upgrade => Number(upgrade.category) === category.id);
  if (categoryUpgrades.length === 0) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: category.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, category.name), categoryUpgrades.map(upgrade => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(UpgradeCheckbox, {
    key: upgrade.id,
    upgrade: upgrade,
    selectedUpgrades: selectedUpgrades,
    handleChange: handleChange
  })));
};
const UpgradeCheckbox = ({
  upgrade,
  selectedUpgrades,
  handleChange
}) => {
  const isChecked = selectedUpgrades?.includes(upgrade.id.toString());
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: upgrade.id,
    className: "hkpu-upgrade-input"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "hkpu-upgrade-input__label",
    htmlFor: `hkpu_upgrades_${upgrade.id}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "hkpu-upgrade-input__checkbox",
    type: "checkbox",
    id: `hkpu_upgrades_${upgrade.id}`,
    name: "hkpu_upgrades[]",
    value: upgrade.id,
    checked: isChecked,
    onChange: handleChange
  }), upgrade.title, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hkpu-upgrade-input__title"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hkpu-upgrade-input__price"
  }, upgrade.price, "\u20AC"));
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/inputs.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UpgradeInputs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UpgradeInputs */ "./src/UpgradeInputs.js");



const InputsApp = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_UpgradeInputs__WEBPACK_IMPORTED_MODULE_2__["default"], null);
};
window.addEventListener("load", function () {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(InputsApp, null), document.querySelector("#hkpu_product_upgrade_inputs"));
}, false);
})();

/******/ })()
;
//# sourceMappingURL=inputs.js.map