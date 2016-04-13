'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pagination = function Pagination(props) {
  var classes = props.classes;
  var styles = props.styles;
  var fakeLinks = props.fakeLinks;
  var page = props.page;
  var pageCount = props.pageCount;
  var onClick = props.onClick;


  var paginationArray = Array.apply(null, { length: pageCount + 1 }).map(Number.call, Number);

  var renderPage = function renderPage(n) {
    return n === page ? _react2.default.createElement(
      'a',
      {
        key: 'currentPage-' + page,
        className: classes.pageNumber + '-' + n + ' ' + classes.currentPage
        // TODO Implement unique style prop for each page number element
        , style: styles.currentPage,
        href: fakeLinks ? '#' : null },
      n + 1
    ) : _react2.default.createElement(
      'a',
      {
        key: 'page-' + n,
        className: classes.pageNumber,
        style: styles.pageNumber,
        href: fakeLinks ? '#' : null,
        onClick: onClick.bind(null, n) },
      n + 1
    );
  };

  return _react2.default.createElement(
    'span',
    {
      key: 'react-shift-pagination',
      className: classes.pagination,
      style: styles.pagination },
    paginationArray.map(renderPage)
  );
};

exports.default = Pagination;


Pagination.propTypes = {
  classes: _react.PropTypes.object,
  styles: _react.PropTypes.object,
  fakeLinks: _react.PropTypes.bool,
  page: _react.PropTypes.number,
  pageCount: _react.PropTypes.number,
  onClick: _react.PropTypes.func
};
//# sourceMappingURL=pagination.js.map
