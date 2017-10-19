'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _table_header_cell = require('./table_header_cell');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiTableHeaderCell', function () {
  var component = _react2.default.createElement(
    _table_header_cell.KuiTableHeaderCell,
    _required_props.requiredProps,
    'children'
  );

  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

describe('align', function () {
  test('defaults to left', function () {
    var component = _react2.default.createElement(_table_header_cell.KuiTableHeaderCell, null);

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  test('renders right when specified', function () {
    var component = _react2.default.createElement(_table_header_cell.KuiTableHeaderCell, { align: _services.RIGHT_ALIGNMENT });

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});
//# sourceMappingURL=table_header_cell.test.js.map