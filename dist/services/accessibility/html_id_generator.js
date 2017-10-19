'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlIdGenerator = htmlIdGenerator;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function returns a function to generate ids.
 * This can be used to generate unique, but predictable ids to pair labels
 * with their inputs. It takes an optional prefix as a parameter. If you don't
 * specify it, it generates a random id prefix.
 */
function htmlIdGenerator(idPrefix) {
  var prefix = idPrefix || _uuid2.default.v1();
  return function (suffix) {
    return prefix + '_' + (suffix || _uuid2.default.v1());
  };
}