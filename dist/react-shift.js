'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Arrow = function Arrow(_ref) {
  var fakeLink = _ref.fakeLink;
  var onClick = _ref.onClick;
  var label = _ref.label;
  var className = _ref.className;
  var style = _ref.style;
  return _react2.default.createElement(
    'a',
    {
      className: className,
      style: style,
      href: fakeLink ? '#' : null,
      onClick: onClick },
    label
  );
};

Arrow.propTypes = {
  fakeLink: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  label: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};

exports.default = Arrow;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  classes: _propTypes2.default.object,
  styles: _propTypes2.default.object,
  fakeLinks: _propTypes2.default.bool,
  page: _propTypes2.default.number,
  pageCount: _propTypes2.default.number,
  onClick: _propTypes2.default.func
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _arrow = require('./arrow.jsx');

var _arrow2 = _interopRequireDefault(_arrow);

var _pagination = require('./pagination.jsx');

var _pagination2 = _interopRequireDefault(_pagination);

var _touchHandler = require('./touch-handler');

var _touchHandler2 = _interopRequireDefault(_touchHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-did-mount-set-state:0 */


var ReactShift = function (_Component) {
  _inherits(ReactShift, _Component);

  function ReactShift(props) {
    _classCallCheck(this, ReactShift);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactShift).call(this, props));

    _this.state = {
      page: 0,
      pageCount: 0
    };

    _this.next = _this.next.bind(_this);
    _this.previous = _this.previous.bind(_this);
    _this.setPage = _this.setPage.bind(_this);
    _this.handleWheel = _this.handleWheel.bind(_this);
    _this.handleTouch = _this.handleTouch.bind(_this);
    return _this;
  }

  _createClass(ReactShift, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // TODO move this out of componentDidMount
      var _props = this.props;
      var children = _props.children;
      var scrollable = _props.scrollable;


      this.setState({
        pageCount: children.length - 1,
        scrollable: scrollable
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var _state = this.state;
      var page = _state.page;
      var pageCount = _state.pageCount;


      if (page !== pageCount) {
        this.setState({ page: page + 1 });
      }
    }
  }, {
    key: 'previous',
    value: function previous() {
      var page = this.state.page;


      if (page !== 0) {
        this.setState({ page: page - 1 });
      }
    }
  }, {
    key: 'setPage',
    value: function setPage(n) {
      this.setState({ page: n });
    }
  }, {
    key: 'handleWheel',
    value: function handleWheel(e) {
      var scrollable = this.props.scrollable;


      if (scrollable) {
        if (e.deltaY > 0) {
          this.next();
        } else {
          this.previous();
        }
      }
    }
  }, {
    key: 'handleTouch',
    value: function handleTouch(e) {
      var next = this.next;
      var previous = this.previous;


      (0, _touchHandler2.default)(e.changedTouches[0].pageX, next, previous);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var fastLinks = _props2.fastLinks;
      var fakeLinks = _props2.fakeLinks;
      var arrowLabels = _props2.arrowLabels;
      var transitions = _props2.transitions;
      var children = _props2.children;
      var classes = _props2.classes;
      var styles = _props2.styles;
      var _state2 = this.state;
      var page = _state2.page;
      var pageCount = _state2.pageCount;


      var filler = _react2.default.createElement(
        'a',
        {
          className: classes.arrowFiller || classes.navArrow,
          style: styles.arrowFiller || styles.navArrow },
        String.fromCharCode(' ')
      );

      var leftArrow = page === 0 ? filler : _react2.default.createElement(_arrow2.default, {
        className: classes.previousPage,
        style: styles.previousPage,
        label: arrowLabels.previous,
        fakeLink: fakeLinks,
        onClick: this.previous });

      var rightArrow = page === pageCount ? filler : _react2.default.createElement(_arrow2.default, {
        className: classes.nextPage,
        style: styles.nextPage,
        label: arrowLabels.next,
        fakeLink: fakeLinks,
        onClick: this.next });

      var pagination = _react2.default.createElement(_pagination2.default, _extends({
        onClick: this.setPage,
        page: page,
        pageCount: pageCount
      }, this.props));

      var fastLinksList = fastLinks ? _react2.default.createElement(
        'div',
        null,
        Object.keys(fastLinks).map(function (i, v) {
          return _react2.default.createElement(
            'a',
            {
              key: 'fastLink-' + i,
              className: classes.fastLinks,
              style: styles.faskLinks,
              href: fakeLinks ? '#' : null,
              onClick: _this2.setPage.bind(null, fastLinks[i]) },
            Object.keys(fastLinks)[v]
          );
        })
      ) : null;

      return _react2.default.createElement(
        'div',
        {
          key: 'react-shift',
          className: classes.wrapper,
          style: styles.wrapper,
          onWheelCapture: this.handleWheel,
          onTouchMove: this.handconstouch },
        _react2.default.createElement(
          'div',
          {
            className: classes.page,
            style: styles.page },
          transitions ? _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
              transitionEnterTimeout: 300,
              transitionLeaveTimeout: 300,
              transitionName: transitions.name },
            children[page]
          ) : children[page]
        ),
        _react2.default.createElement(
          'nav',
          {
            className: classes.navigation,
            style: styles.navigation },
          fastLinksList,
          leftArrow,
          ' ',
          pagination,
          ' ',
          rightArrow
        )
      );
    }
  }]);

  return ReactShift;
}(_react.Component);

ReactShift.propTypes = {
  children: _propTypes2.default.node.isRequired,
  classes: _propTypes2.default.shape({
    wrapper: _propTypes2.default.string,
    navigation: _propTypes2.default.string,
    page: _propTypes2.default.string,
    pagination: _propTypes2.default.string,
    pageNumber: _propTypes2.default.string,
    currentPage: _propTypes2.default.string,
    fastLinks: _propTypes2.default.string,
    navArrow: _propTypes2.default.string,
    nextPage: _propTypes2.default.string,
    previousPage: _propTypes2.default.string,
    arrowFiller: _propTypes2.default.string
  }),
  styles: _propTypes2.default.shape({
    wrapper: _propTypes2.default.object,
    navigation: _propTypes2.default.object,
    page: _propTypes2.default.object,
    pagination: _propTypes2.default.object,
    pageNumber: _propTypes2.default.object,
    currentPage: _propTypes2.default.object,
    fastLinks: _propTypes2.default.object,
    navArrow: _propTypes2.default.object,
    nextPage: _propTypes2.default.object,
    previousPage: _propTypes2.default.object,
    arrowFiller: _propTypes2.default.object
  }),
  arrowLabels: _propTypes2.default.shape({
    className: _propTypes2.default.string,
    next: _propTypes2.default.string,
    previous: _propTypes2.default.string
  }),
  fastLinks: _propTypes2.default.object,
  fakeLinks: _propTypes2.default.bool,
  transitions: _propTypes2.default.shape({
    active: _propTypes2.default.bool,
    name: _propTypes2.default.string
  }),
  scrollable: _propTypes2.default.bool
};

ReactShift.defaultProps = {
  classes: {},
  styles: {},
  arrowLabels: {
    next: 'Next page',
    previous: 'Previous page'
  },
  fakeLinks: true,
  // TODO: Fix scrolling problems on mobile devices
  scrollable: false
};

exports.default = ReactShift;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var position = {
  right: 0,
  left: 0,
  direction: null,
  clear: function clear() {
    this.right = 0;
    this.left = 0;
  }
};

exports.default = function (e, left, right) {
  e = Math.round(e);

  position.direction = null;

  if (e < 450) {
    position.left += 1;
    position.right = 0;
  } else if (e > 550) {
    position.right += 1;
    position.left = 0;
  }

  if (position.left > 4) {
    position.clear();
    left();
    return;
  }

  if (position.right > 4) {
    position.clear();
    right();
    return;
  }
};
//# sourceMappingURL=react-shift.js.map
