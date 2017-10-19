'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _table_row_cell = require('./table_row_cell');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiTableRowCell', function () {
  var component = _react2.default.createElement(
    _table_row_cell.KuiTableRowCell,
    _required_props.requiredProps,
    'children'
  );

  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

describe('align', function () {
  test('defaults to left', function () {
    var component = _react2.default.createElement(_table_row_cell.KuiTableRowCell, null);

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  test('renders right when specified', function () {
    var component = _react2.default.createElement(_table_row_cell.KuiTableRowCell, { align: _services.RIGHT_ALIGNMENT });

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});

describe('wrapText', function () {
  test('is rendered when specified', function () {
    var component = _react2.default.createElement(_table_row_cell.KuiTableRowCell, { wrapText: true });

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});
//# sourceMappingURL=table_row_cell.test.js.map