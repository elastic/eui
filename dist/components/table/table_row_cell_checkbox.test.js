'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _table_row_cell_checkbox = require('./table_row_cell_checkbox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTableRowCellCheckbox', function () {
  test('is rendered', function () {
    var component = (0, _enzyme.render)(_react2.default.createElement(_table_row_cell_checkbox.KuiTableRowCellCheckbox, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
//# sourceMappingURL=table_row_cell_checkbox.test.js.map