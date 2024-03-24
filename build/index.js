/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CreateUpgradeButton.js":
/*!************************************!*\
  !*** ./src/CreateUpgradeButton.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateUpgradeButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);






function CreateUpgradeButton({
  categories,
  hasCategoriesResolved
}) {
  const [isOpen, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: openModal,
    variant: "primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Uusi päivitys", "hk-product-upgrades")), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    onRequestClose: closeModal,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Luo uusi päivitys", "hk-product-upgrades")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CreateUpgradeForm, {
    onCancel: closeModal,
    onSaveFinished: closeModal,
    categories: categories,
    hasCategoriesResolved: hasCategoriesResolved
  })));
}
function CreateUpgradeForm({
  onCancel,
  onSaveFinished,
  categories,
  hasCategoriesResolved
}) {
  const [upgrade, setUpgrade] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
    title: "",
    price: "",
    category: ""
  });
  const handleChange = (value, field) => {
    setUpgrade(prev => ({
      ...prev,
      [field]: value
    }));
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    console.log("upgrade:", upgrade);
  }, [upgrade]);
  const {
    saveEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store);
  const handleSave = async () => {
    const savedRecord = await saveEntityRecord("postType", "product-upgrade", {
      title: upgrade.title,
      meta: {
        hkpu_price: upgrade.price,
        hkpu_category: upgrade.category
      },
      status: "publish"
    });
    if (savedRecord) {
      console.log("Saved upgrade:", savedRecord);
      onSaveFinished();
    }
  };
  const {
    lastError,
    isSaving
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    lastError: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getLastEntitySaveError("postType", "product-upgrade"),
    isSaving: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).isSavingEntityRecord("postType", "product-upgrade")
  }), []);
  const categoryArray = categories?.map(category => ({
    label: category.name,
    value: category.id
  }));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, lastError && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("There was an error saving the upgrade. Please try again.", "hk-product-upgrades")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, lastError.message)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    id: "title",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Title", "hk-product-upgrades"),
    value: upgrade.title,
    onChange: value => handleChange(value, "title")
  }), hasCategoriesResolved && categoryArray && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    id: "category",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Category", "hk-product-upgrades"),
    value: upgrade.category,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No category", "hk-product-upgrades"),
      value: ""
    }, ...categoryArray],
    onChange: value => handleChange(value, "category")
  }), !categoryArray && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    id: "price",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Price", "hk-product-upgrades"),
    value: upgrade.price,
    onChange: value => handleChange(value, "price")
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "primary",
    onClick: handleSave
  }, isSaving ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tallentaa", "hk-product-upgrades")) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tallenna", "hk-product-upgrades")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: onCancel
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Peruuta", "hk-product-upgrades"))));
}

/***/ }),

/***/ "./src/CreateUpgradeCategoryButton.js":
/*!********************************************!*\
  !*** ./src/CreateUpgradeCategoryButton.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateUpgradeCategoryButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);






function CreateUpgradeCategoryButton() {
  const [isOpen, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: openModal,
    variant: "primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Uusi kategoria", "hk-product-upgrades")), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    onRequestClose: closeModal,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Luo uusi päivityskategoria", "hk-product-upgrades")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CreateUpgradeForm, {
    onCancel: closeModal,
    onSaveFinished: closeModal
  })));
}
function CreateUpgradeForm({
  onCancel,
  onSaveFinished
}) {
  const [category, setCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
    name: "",
    description: ""
  });
  const handleChange = (value, field) => {
    setCategory(prev => ({
      ...prev,
      [field]: value
    }));
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    console.log("Category changed", category);
  }, [category]);
  const {
    saveEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store);
  const handleSave = async () => {
    const savedRecord = await saveEntityRecord("taxonomy", "upgrade-category", {
      name: category.name,
      description: category.description,
      status: "publish"
    });
    if (savedRecord) {
      console.log("Saved category:", savedRecord);
      onSaveFinished();
    }
  };
  const {
    lastError,
    isSaving
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    lastError: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getLastEntitySaveError("taxonomy", "upgrade-category"),
    isSaving: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).isSavingEntityRecord("taxonomy", "upgrade-category")
  }), []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, lastError && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("There was an error saving the upgrade. Please try again.", "hk-product-upgrades")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, lastError.message)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    id: "name",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Nimi", "hk-product-upgrades"),
    value: category.name,
    onChange: value => handleChange(value, "name"),
    autoComplete: "off"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    id: "description",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Kuvaus", "hk-product-upgrades"),
    value: category.description,
    onChange: value => handleChange(value, "description"),
    autoComplete: "off"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "primary",
    onClick: handleSave
  }, isSaving ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tallentaa", "hk-product-upgrades")) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tallenna", "hk-product-upgrades")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: onCancel
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Peruuta", "hk-product-upgrades"))));
}

/***/ }),

/***/ "./src/UpgradeItem.js":
/*!****************************!*\
  !*** ./src/UpgradeItem.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpgradeItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);






function UpgradeItem({
  upgrade,
  upgradeCategories
}) {
  const {
    editedUpgrade,
    lastError,
    isSaving,
    hasEdits
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      lastError: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getLastEntitySaveError("postType", "product-upgrade", upgrade.id),
      isSaving: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).isSavingEntityRecord("postType", "product-upgrade", upgrade.id),
      hasEdits: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).hasEditsForEntityRecord("postType", "product-upgrade", upgrade.id),
      editedUpgrade: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getEditedEntityRecord("postType", "product-upgrade", upgrade.id)
    };
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    console.log("editedUpgrade", editedUpgrade);
  }, [editedUpgrade]);
  const {
    editEntityRecord,
    saveEditedEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store);
  const categoryArray = upgradeCategories?.map(category => ({
    label: category.name,
    value: category.id
  }));
  const placeholderCategory = {
    label: "No category",
    value: ""
  };
  const handleTitleChange = title => {
    editEntityRecord("postType", "product-upgrade", editedUpgrade.id, {
      title
    });
  };
  const handleCategoryChange = category => {
    editEntityRecord("postType", "product-upgrade", editedUpgrade.id, {
      meta: {
        hkpu_category: category
      },
      terms: {
        "upgrade-category": [category]
      }
    });
  };
  const handlePriceChange = price => {
    editEntityRecord("postType", "product-upgrade", editedUpgrade.id, {
      meta: {
        hkpu_price: price
      }
    });
  };
  const handleSave = async () => {
    const savedRecord = await saveEditedEntityRecord("postType", "product-upgrade", editedUpgrade.id);
    if (savedRecord) {
      console.log("Saved upgrade:", savedRecord);
    }
  };
  console.log("array", categoryArray);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: editedUpgrade.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    id: "upgrade-title",
    value: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__.decodeEntities)(editedUpgrade.title),
    onChange: handleTitleChange
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    id: "upgrade-category",
    value: editedUpgrade.meta.hkpu_category,
    options: categoryArray ? categoryArray : [],
    onChange: handleCategoryChange
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    id: "upgrade-price",
    value: editedUpgrade.meta.hkpu_price,
    onChange: handlePriceChange
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    disabled: !hasEdits,
    onClick: handleSave
  }, "Save"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DeleteUpgradeButton, {
    upgradeId: editedUpgrade.id
  }))));
}
function DeleteUpgradeButton({
  upgradeId
}) {
  const {
    deleteEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store);
  const handleDelete = async () => {
    const deletedRecord = await deleteEntityRecord("postType", "product-upgrade", upgradeId);
    if (deletedRecord) {
      console.log("Upgrade deleted", upgradeId);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isDestructive: true,
    onClick: handleDelete
  }, "Delete");
}

/***/ }),

/***/ "./src/UpgradeList.js":
/*!****************************!*\
  !*** ./src/UpgradeList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpgradeList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _UpgradeItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UpgradeItem */ "./src/UpgradeItem.js");






function UpgradeList({
  upgrades,
  hasResolved,
  upgradeCategories,
  hasCategoriesResolved
}) {
  if (!hasResolved || !hasCategoriesResolved) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null);
  }
  if (!upgrades?.length) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "No upgrades found");
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "wp-list-table widefat fixed striped table-view-list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Title"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Category"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Price"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    style: {
      width: 190
    }
  }, "Actions"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, upgrades?.map(upgrade => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_UpgradeItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: upgrade.id,
    upgrade: upgrade,
    upgradeCategories: upgradeCategories
  }))));
}
function EditUpgradeButton({
  upgradeId
}) {
  const [isOpen, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const {
    upgrade,
    lastError,
    isSaving,
    hasEdits
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    upgrade: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getEditedEntityRecord("postType", "product-upgrade", upgradeId),
    lastError: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getLastEntitySaveError("postType", "product-upgrade", upgradeId),
    isSaving: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).isSavingEntityRecord("postType", "product-upgrade", upgradeId),
    hasEdits: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).hasEditsForEntityRecord("postType", "product-upgrade", upgradeId)
  }), [upgradeId]);
  const handleEdit = () => {
    console.log("Edited upgrade:", upgrade);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: openModal
  }, "Edit"), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    onRequestClose: closeModal,
    title: "Edit upgrade"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Editing upgrade ", upgradeId), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: handleEdit
  }, "Save")));
}

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

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/html-entities":
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
/***/ ((module) => {

module.exports = window["wp"]["htmlEntities"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _UpgradeList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UpgradeList */ "./src/UpgradeList.js");
/* harmony import */ var _CreateUpgradeButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CreateUpgradeButton */ "./src/CreateUpgradeButton.js");
/* harmony import */ var _CreateUpgradeCategoryButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CreateUpgradeCategoryButton */ "./src/CreateUpgradeCategoryButton.js");










const MemoizedUpgradeList = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(_UpgradeList__WEBPACK_IMPORTED_MODULE_6__["default"]);
function App() {
  const [searchTerm, setSearchTerm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const {
    upgrades,
    hasResolved
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const query = {};
    if (searchTerm) {
      query.search = searchTerm;
    }
    const selectorArgs = ["postType", "product-upgrade", query];
    return {
      upgrades: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getEntityRecords(...selectorArgs),
      hasResolved: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).hasFinishedResolution("getEntityRecords", selectorArgs)
    };
  }, [searchTerm]);
  const {
    upgradeCategories,
    hasResolved: hasCategoriesResolved
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return {
      upgradeCategories: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getEntityRecords("taxonomy", "upgrade-category"),
      hasResolved: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).hasFinishedResolution("getEntityRecords", ["taxonomy", "upgrade-category"])
    };
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-upgrade-app"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "upgrade-controls"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SearchControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Search upgrades", "hk-product-upgrades"),
    value: searchTerm,
    onChange: setSearchTerm
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CreateUpgradeButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
    categories: upgradeCategories,
    hasCategoriesResolved: hasCategoriesResolved
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CreateUpgradeCategoryButton__WEBPACK_IMPORTED_MODULE_8__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MemoizedUpgradeList, {
    upgrades: upgrades,
    hasResolved: hasResolved,
    upgradeCategories: upgradeCategories,
    hasCategoriesResolved: hasCategoriesResolved
  }));
}
window.addEventListener("load", function () {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null), document.querySelector("#hk-product-upgrades"));
}, false);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map