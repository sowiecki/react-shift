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