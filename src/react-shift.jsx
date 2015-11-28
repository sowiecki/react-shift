import React from 'react/addons';

import handleSwipe from './handle-swipe';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

React.initializeTouchEvents(true);

let Arrow = React.createClass({
  render() {
    return (
      <div className='react-shift-nav-arrow'>
        <a id={this.props.id} href='#' onClick={this.props.onClick}>
          {this.props.label}
        </a>
      </div>
    );
  }
});

export default React.createClass({
  propTypes: {
    arrowLabels: React.PropTypes.object,
    arrowLabels: React.PropTypes.shape({
      next: React.PropTypes.string,
      previous: React.PropTypes.string
    }),
    fastLinks: React.PropTypes.object,
    transitions: React.PropTypes.bool,
    scrollable: React.PropTypes.bool
  },
  getDefaultProps() {
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
  getInitialState() {
    return {
      mounted: false,
      page: 0,
      pageCount: 0
    };
  },
  componentDidMount() {
    this.setState({
      mounted: true,
      pageCount: this.props.children.length - 1,
      scrollable: this.props.scrollable
    });
  },
  next() {
    if (this.state.page === this.state.pageCount) {
      null;
    } else {
      this.setState({page: this.state.page + 1});
    }
  },
  previous() {
    if (this.state.page === 0) {
      null;
    } else {
      this.setState({page: this.state.page - 1});
    }
  },
  setPage(n) {
    this.setState({page: n});
  },
  handleWheel(e) {
    if (this.props.scrollable) {
      if (e.deltaY > 0) {
        this.next();
      } else {
        this.previous();
      }
    }
  },
  handleTouch(e) {
    switch (handleSwipe(e.changedTouches[0].pageX)) {
    case 'left':
      this.next();
      break;
    case 'right':
      this.previous();
      break;
    }
  },
  render() {
    let self = this;
    let fastLinks = this.props.fastLinks;
    let paginationArray = Array
      .apply(null, {length: this.state.pageCount + 1})
      .map(Number.call, Number);
    let filler = (
      <div
        className='react-shift-nav-arrow'>
        {String.fromCharCode('\u00a0')}
      </div>
    );
    let leftArrow = this.state.page === 0 ? filler : (
      <Arrow
        id={'react-shift-previous-page'}
        label={this.props.arrowLabels.previous}
        onClick={this.previous}/>
    );
    let rightArrow = this.state.page === this.state.pageCount ? filler : (
      <Arrow
        id={'react-shift-next-page'}
        label={this.props.arrowLabels.next}
        onClick={this.next}/>
    );
    let pagination = (
      <span
        key='react-shift-page-numbers'
        id='react-shift-pagination'
        className='react-shift-pagination'>
        {paginationArray.map((n) => {
          return n == self.state.page ? (
            <a
              key={'currentPage-' + self.state.page}
              id={'page-' + n}
              className='react-shift-page-number react-shift-current-page'
              href='#'>
              {n + 1}
            </a>
          ) : (
            <a
              key={'page' + n}
              id={'page-' + n}
              className='react-shift-page-number'
              href='#'
              onClick={self.setPage.bind(null, n)}>
              {n + 1}
            </a>
          );
        })}
      </span>
    );
    let fastLinksList = this.props.fastLinks ? (
      <div id='react-shift-fast-links'>
        {Object.keys(fastLinks).map(function(i, v) {
          return (
            <a
              key={'fastLink' + i}
              className='react-shift-fast-link'
              href='#'
              onClick={self.setPage.bind(null, fastLinks[i])}>
                {Object.keys(fastLinks)[v]}
            </a>
          );
        })}
      </div>
    ) : null;
    return (
      <div
        key='react-shift'
        id='react-shift-wrapper'
        onWheelCapture={this.handleWheel}
        onTouchMove={this.handleTouch}>
        <div id='react-shift-page'>
          {this.props.transitions ?
            <ReactCSSTransitionGroup transitionName='react-shift-page'>
              {this.props.children[this.state.page]}
            </ReactCSSTransitionGroup>
          : this.props.children[this.state.page]}
        </div>
        <nav id='react-shift-navigation'>
          {fastLinksList}
          {leftArrow} {pagination} {rightArrow}
        </nav>
      </div>
    );
  }
});
