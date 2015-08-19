'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _handleSwipe = require('./handle-swipe');

var _handleSwipe2 = _interopRequireDefault(_handleSwipe);

var ReactCSSTransitionGroup = _reactAddons2['default'].addons.CSSTransitionGroup;

_reactAddons2['default'].initializeTouchEvents(true);

var Arrow = _reactAddons2['default'].createClass({
	displayName: 'Arrow',

	render: function render() {
		return _reactAddons2['default'].createElement(
			'div',
			{ className: 'react-shift-nav-arrow' },
			_reactAddons2['default'].createElement(
				'a',
				{ id: this.props.id, href: '#', onClick: this.props.onClick },
				this.props.label
			)
		);
	}
});

exports['default'] = _reactAddons2['default'].createClass({
	displayName: 'react-shift',

	propTypes: {
		arrowLabels: _reactAddons2['default'].PropTypes.object,
		arrowLabels: _reactAddons2['default'].PropTypes.shape({
			next: _reactAddons2['default'].PropTypes.string,
			previous: _reactAddons2['default'].PropTypes.string
		}),
		fastLinks: _reactAddons2['default'].PropTypes.object,
		transitions: _reactAddons2['default'].PropTypes.bool,
		scrollable: _reactAddons2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			arrowLabels: {
				next: 'Next page',
				previous: 'Previous page'
			},
			fastLinks: {},
			// TODO: Scrollable is broken, fix it
			scrollable: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			mounted: false,
			page: 0,
			pageCount: 0
		};
	},
	componentDidMount: function componentDidMount() {
		this.setState({
			mounted: true,
			pageCount: this.props.children.length - 1,
			scrollable: this.props.scrollable
		});
	},
	next: function next() {
		if (this.state.page === this.state.pageCount) {
			null;
		} else {
			this.setState({ page: this.state.page + 1 });
		}
	},
	previous: function previous() {
		if (this.state.page === 0) {
			null;
		} else {
			this.setState({ page: this.state.page - 1 });
		}
	},
	setPage: function setPage(n) {
		this.setState({ page: n });
	},
	handleWheel: function handleWheel(e) {
		if (this.props.scrollable) {
			if (e.deltaY > 0) {
				this.next();
			} else {
				this.previous();
			}
		}
	},
	handleTouch: function handleTouch(e) {
		switch ((0, _handleSwipe2['default'])(e.changedTouches[0].pageX)) {
			case 'left':
				this.next();
				break;
			case 'right':
				this.previous();
				break;
		}
	},
	render: function render() {
		var self = this;
		var fastLinks = this.props.fastLinks;
		var paginationArray = Array.apply(null, { length: this.state.pageCount + 1 }).map(Number.call, Number);
		var filler = _reactAddons2['default'].createElement(
			'div',
			{
				className: 'react-shift-nav-arrow' },
			String.fromCharCode(' ')
		);
		var leftArrow = this.state.page === 0 ? filler : _reactAddons2['default'].createElement(Arrow, {
			id: 'react-shift-previous-page',
			label: this.props.arrowLabels.previous,
			onClick: this.previous });
		var rightArrow = this.state.page === this.state.pageCount ? filler : _reactAddons2['default'].createElement(Arrow, {
			id: 'react-shift-next-page',
			label: this.props.arrowLabels.next,
			onClick: this.next });
		var pagination = _reactAddons2['default'].createElement(
			'span',
			{
				key: 'react-shift-page-numbers',
				id: 'react-shift-pagination',
				className: 'react-shift-pagination' },
			paginationArray.map(function (n) {
				return n == self.state.page ? _reactAddons2['default'].createElement(
					'a',
					{
						key: 'currentPage-' + self.state.page,
						id: 'page-' + n,
						className: 'react-shift-page-number react-shift-current-page',
						href: '#' },
					n + 1
				) : _reactAddons2['default'].createElement(
					'a',
					{
						key: 'page' + n,
						id: 'page-' + n,
						className: 'react-shift-page-number',
						href: '#',
						onClick: self.setPage.bind(null, n) },
					n + 1
				);
			})
		);
		var fastLinksList = this.props.fastLinks ? _reactAddons2['default'].createElement(
			'div',
			{ id: 'react-shift-fast-links' },
			Object.keys(fastLinks).map(function (i, v) {
				return _reactAddons2['default'].createElement(
					'a',
					{
						key: 'fastLink' + i,
						className: 'react-shift-fast-link',
						href: '#',
						onClick: self.setPage.bind(null, fastLinks[i]) },
					Object.keys(fastLinks)[v]
				);
			})
		) : null;
		return _reactAddons2['default'].createElement(
			'div',
			{
				key: 'react-shift',
				id: 'react-shift-wrapper',
				onWheelCapture: this.handleWheel,
				onTouchMove: this.handleTouch },
			_reactAddons2['default'].createElement(
				'div',
				{ id: 'react-shift-page' },
				this.props.transitions ? _reactAddons2['default'].createElement(
					ReactCSSTransitionGroup,
					{ transitionName: 'react-shift-page' },
					this.props.children[this.state.page]
				) : this.props.children[this.state.page]
			),
			_reactAddons2['default'].createElement(
				'nav',
				{ id: 'react-shift-navigation' },
				fastLinksList,
				leftArrow,
				' ',
				pagination,
				' ',
				rightArrow
			)
		);
	}
});
module.exports = exports['default'];