'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
  onClick: _react.PropTypes.func,
  label: _react.PropTypes.string,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object
};

exports.default = Arrow;
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

  return _react2.default.createElement(
    'span',
    {
      key: 'react-shift-pagination',
      className: classes.pagination,
      style: styles.pagination },
    paginationArray.map(function (n) {
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
    })
  );
};

exports.default = Pagination;

Pagination.propTypes = {
  classes: _react.PropTypes.object,
  styles: _react.PropTypes.object,
  fakeLinks: _react.PropTypes.boolean,
  page: _react.PropTypes.number,
  pageCount: _react.PropTypes.number,
  onClick: propTypes.func
};
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var ReactShift = (function (_Component) {
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
    key: 'componentDidMount',
    value: function componentDidMount() {
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
        'div',
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
        page: true,
        pageCount: true
      }, this.props));

      var fastLinksList = fastLinks ? _react2.default.createElement(
        'div',
        null,
        Object.keys(fastLinks).map(function (i, v) {
          return _react2.default.createElement(
            'a',
            {
              key: 'fastLink' + i,
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
})(_react.Component);

exports.default = ReactShift;

ReactShift.propTypes = {
  children: _react.PropTypes.node.isRequired,
  classes: _react.PropTypes.shape({
    wrapper: _react.PropTypes.string,
    navigation: _react.PropTypes.string,
    page: _react.PropTypes.string,
    pagination: _react.PropTypes.string,
    pageNumber: _react.PropTypes.string,
    currentPage: _react.PropTypes.string,
    fastLinks: _react.PropTypes.string,
    navArrow: _react.PropTypes.string,
    nextPage: _react.PropTypes.string,
    previousPage: _react.PropTypes.string,
    arrowFiller: _react.PropTypes.string
  }),
  styles: _react.PropTypes.shape({
    wrapper: _react.PropTypes.object,
    navigation: _react.PropTypes.object,
    page: _react.PropTypes.object,
    pagination: _react.PropTypes.object,
    pageNumber: _react.PropTypes.object,
    currentPage: _react.PropTypes.object,
    fastLinks: _react.PropTypes.object,
    navArrow: _react.PropTypes.object,
    nextPage: _react.PropTypes.object,
    previousPage: _react.PropTypes.object,
    arrowFiller: _react.PropTypes.object
  }),
  arrowLabels: _react.PropTypes.shape({
    className: _react.PropTypes.string,
    next: _react.PropTypes.string,
    previous: _react.PropTypes.string
  }),
  fastLinks: _react.PropTypes.object,
  transitions: _react.PropTypes.shape({
    active: _react.PropTypes.bool,
    name: _react.PropTypes.string
  }),
  scrollable: _react.PropTypes.bool
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
