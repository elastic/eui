'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiPagination = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pagination_button = require('./pagination_button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MAX_VISIBLE_PAGES = 5;
var NUMBER_SURROUNDING_PAGES = Math.floor(MAX_VISIBLE_PAGES * 0.5);

var KuiPagination = function KuiPagination(_ref) {
  var className = _ref.className,
      pageCount = _ref.pageCount,
      activePage = _ref.activePage,
      onPageClick = _ref.onPageClick,
      rest = _objectWithoutProperties(_ref, ['className', 'pageCount', 'activePage', 'onPageClick']);

  var classes = (0, _classnames2.default)('kuiPagination', className);

  var pages = [];
  var firstPageInRange = Math.max(0, Math.min(activePage - NUMBER_SURROUNDING_PAGES, pageCount - MAX_VISIBLE_PAGES));
  var lastPageInRange = Math.min(pageCount, firstPageInRange + MAX_VISIBLE_PAGES);

  for (var i = firstPageInRange, index = 0; i < lastPageInRange; i++, index++) {
    pages.push(_react2.default.createElement(
      _pagination_button.KuiPaginationButton,
      {
        isActive: i === activePage,
        key: index,
        onClick: onPageClick.bind(null, i),
        hideOnMobile: true
      },
      i + 1
    ));
  }

  var previousButton = void 0;

  if (activePage !== 0) {
    previousButton = _react2.default.createElement(
      _pagination_button.KuiPaginationButton,
      {
        onClick: onPageClick.bind(null, activePage - 1),
        iconType: 'arrowLeft'
      },
      'Previous'
    );
  }

  var firstPageButtons = [];

  if (firstPageInRange > 0) {
    firstPageButtons.push(_react2.default.createElement(
      _pagination_button.KuiPaginationButton,
      {
        key: '0',
        onClick: onPageClick.bind(null, 0),
        hideOnMobile: true
      },
      '1'
    ));

    if (firstPageInRange > 1) {
      firstPageButtons.push(_react2.default.createElement(_pagination_button.KuiPaginationButton, {
        key: 'beginningEllipsis',
        isPlaceholder: true,
        hideOnMobile: true
      }));
    }
  }

  var lastPageButtons = [];

  if (lastPageInRange < pageCount) {
    if (lastPageInRange < pageCount - 1) {
      lastPageButtons.push(_react2.default.createElement(_pagination_button.KuiPaginationButton, {
        key: 'endingEllipsis',
        isPlaceholder: true,
        hideOnMobile: true
      }));
    }

    lastPageButtons.push(_react2.default.createElement(
      _pagination_button.KuiPaginationButton,
      {
        key: pageCount - 1,
        onClick: onPageClick.bind(null, pageCount - 1),
        hideOnMobile: true
      },
      pageCount
    ));
  }

  var nextButton = void 0;

  if (activePage !== pageCount - 1) {
    nextButton = _react2.default.createElement(
      _pagination_button.KuiPaginationButton,
      {
        onClick: onPageClick.bind(null, activePage + 1),
        iconType: 'arrowRight',
        iconSide: 'right'
      },
      'Next'
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    previousButton,
    firstPageButtons,
    pages,
    lastPageButtons,
    nextButton
  );
};

exports.KuiPagination = KuiPagination;
KuiPagination.propTypes = {
  className: _propTypes2.default.string,
  pagesCount: _propTypes2.default.number,
  activePage: _propTypes2.default.number,
  onPageClick: _propTypes2.default.func,
  pageLinkProvider: _propTypes2.default.func
};