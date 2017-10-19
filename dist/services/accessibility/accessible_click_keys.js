'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessibleClickKeys = undefined;

var _accessibleClickKeys;

var _key_codes = require('../key_codes');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// These keys are used to execute click actions on interactive elements like buttons and links.
var accessibleClickKeys = exports.accessibleClickKeys = (_accessibleClickKeys = {}, _defineProperty(_accessibleClickKeys, _key_codes.ENTER, 'enter'), _defineProperty(_accessibleClickKeys, _key_codes.SPACE, 'space'), _accessibleClickKeys);