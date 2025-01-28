"use strict";
(self["webpackChunkaressa_restaurant_apps"] = self["webpackChunkaressa_restaurant_apps"] || []).push([[777],{

/***/ 777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var DrawerInitiator = {
  init: function init(_ref) {
    var _this = this;
    var button = _ref.button,
      drawer = _ref.drawer,
      content = _ref.content;
    button.addEventListener('click', function (event) {
      _this._toggleDrawer(event, drawer);
    });
    content.addEventListener('click', function (event) {
      _this._closeDrawer(event, drawer);
    });
  },
  _toggleDrawer: function _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },
  _closeDrawer: function _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawerInitiator);

/***/ })

}]);
//# sourceMappingURL=777.00516155cdb34ed74248.bundle.js.map