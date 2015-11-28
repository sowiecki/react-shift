import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Arrow from './arrow.jsx';
import handleSwipe from './handle-swipe';


export default class ReactShift extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageCount: 0
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.setPage = this.setPage.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  componentDidMount() {
    const { children, scrollable } = this.props;

    this.setState({
      pageCount: children.length - 1,
      scrollable
    });
  }

  next() {
    const { page, pageCount } = this.state;

    if (page !== pageCount) {
      this.setState({page: page + 1});
    }
  }

  previous() {
    const { page } = this.state;

    if (page !== 0) {
      this.setState({page: page - 1});
    }
  }

  setPage(n) {
    this.setState({page: n});
  }

  handleWheel(e) {
    const { scrollable } = this.props;

    if (scrollable) {
      if (e.deltaY > 0) {
        this.next();
      } else {
        this.previous();
      }
    }
  }

  handleTouch(e) {
    switch (handleSwipe(e.changedTouches[0].pageX)) {
      case 'left':
        this.next();
        break;
      case 'right':
        this.previous();
        break;
    }
  }

  render() {
    const { fastLinks,
            arrowLabels,
            transitions,
            children } = this.props;
    const { page, pageCount } = this.state;

    const paginationArray = Array
      .apply(null, {length: pageCount + 1})
      .map(Number.call, Number);

    const filler = (
      <div
        className='react-shift-nav-arrow'>
        {String.fromCharCode('\u00a0')}
      </div>
    );

    const leftArrow = page === 0 ? filler : (
      <Arrow
        id={'react-shift-previous-page'}
        label={arrowLabels.previous}
        onClick={this.previous}/>
    );

    const rightArrow = page === pageCount ? filler : (
      <Arrow
        id={'react-shift-next-page'}
        label={arrowLabels.next}
        onClick={this.next}/>
    );

    const pagination = (
      <span
        key='react-shift-page-numbers'
        id='react-shift-pagination'
        className='react-shift-pagination'>
        {paginationArray.map((n) => {
          return n === page ? (
            <a
              key={`currentPage-${page}`}
              id={`page-${n}`}
              className='react-shift-page-number react-shift-current-page'
              href='#'>
              {n + 1}
            </a>
          ) : (
            <a
              key={`page-${n}`}
              id={`page-${n}`}
              className='react-shift-page-number'
              href='#'
              onClick={this.setPage.bind(null, n)}>
              {n + 1}
            </a>
          );
        })}
      </span>
    );

    const fastLinksList = fastLinks ? (
      <div id='react-shift-fast-links'>
        {Object.keys(fastLinks).map((i, v) => {
          return (
            <a
              key={`fastLink${i}`}
              className='react-shift-fast-link'
              href='#'
              onClick={this.setPage.bind(null, fastLinks[i])}>
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
        onTouchMove={this.handconstouch}>
        <div id='react-shift-page'>
          {transitions ?
            <ReactCSSTransitionGroup
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              transitionName='react-shift-page'>
                {children[page]}
            </ReactCSSTransitionGroup>
          : children[page]}
        </div>
        <nav id='react-shift-navigation'>
          {fastLinksList}
          {leftArrow} {pagination} {rightArrow}
        </nav>
      </div>
    );
  }
}

ReactShift.propTypes = {
  children: PropTypes.node,
  arrowLabels: PropTypes.shape({
    next: PropTypes.string,
    previous: PropTypes.string
  }),
  fastLinks: PropTypes.object,
  transitions: PropTypes.bool,
  scrollable: PropTypes.bool
};

ReactShift.defaultProps = {
  arrowLabels: {
    next: 'Next page',
    previous: 'Previous page'
  },
  fastLinks: {},
  // TODO: Scrollable is broken, fix it
  scrollable: false
};
