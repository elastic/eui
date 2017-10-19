'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comboBoxKeyCodes = undefined;

var _key_codes = require('../key_codes');

var comboBoxKeyCodes = exports.comboBoxKeyCodes = {
  DOWN: _key_codes.DOWN,
  ENTER: _key_codes.ENTER,
  ESCAPE: _key_codes.ESCAPE,
  TAB: _key_codes.TAB,
  UP: _key_codes.UP
}; /**
    * These keys are used for navigating combobox UI components.
    *
    * UP: Select the previous item in the list.
    * DOWN: Select the next item in the list.
    * ENTER / TAB: Complete input with the current selection.
    * ESC: Deselect the current selection and hide the list.
    */