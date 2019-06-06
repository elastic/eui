(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["icon.swatch_input-js"],{

/***/ "../../src/components/icon/assets/swatch_input.js":
/*!****************************************************************************!*\
  !*** /Users/thompsongl/src/eui/src/components/icon/assets/swatch_input.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icon = void 0;

__webpack_require__(/*! core-js/modules/es6.object.assign */ "../../node_modules/core-js/modules/es6.object.assign.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var EuiIconSwatchInput = function EuiIconSwatchInput(props) {
  return _react.default.createElement("svg", _extends({
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _react.default.createElement("rect", {
    x: 2,
    y: 2,
    width: 12,
    height: 12,
    rx: 3
  }), _react.default.createElement("rect", {
    className: "euiSwatchInput__stroke",
    x: 2.5,
    y: 2.5,
    width: 11,
    height: 11,
    rx: 2
  }));
};

var icon = EuiIconSwatchInput;
exports.icon = icon;
EuiIconSwatchInput.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiIconSwatchInput"
};

/***/ })

}]);
//# sourceMappingURL=icon.swatch_input-js.bundle.js.map