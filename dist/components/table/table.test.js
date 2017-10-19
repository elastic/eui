'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _table = require('./table');

var _table_row = require('./table_row');

var _table_row_cell = require('./table_row_cell');

var _table_body = require('./table_body');

var _table_header = require('./table_header');

var _table_header_cell = require('./table_header_cell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiTable', function () {
  var component = _react2.default.createElement(
    _table.KuiTable,
    _required_props.requiredProps,
    _react2.default.createElement(
      _table_header.KuiTableHeader,
      null,
      _react2.default.createElement(
        _table_header_cell.KuiTableHeaderCell,
        null,
        'Hi Title'
      ),
      _react2.default.createElement(
        _table_header_cell.KuiTableHeaderCell,
        null,
        'Bye Title'
      )
    ),
    _react2.default.createElement(
      _table_body.KuiTableBody,
      null,
      _react2.default.createElement(
        _table_row.KuiTableRow,
        null,
        _react2.default.createElement(
          _table_row_cell.KuiTableRowCell,
          null,
          'Hi'
        )
      ),
      _react2.default.createElement(
        _table_row.KuiTableRow,
        null,
        _react2.default.createElement(
          _table_row_cell.KuiTableRowCell,
          null,
          'Bye'
        )
      )
    )
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
//# sourceMappingURL=table.test.js.map