/* eslint react/no-did-mount-set-state:0 */
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
    // TODO move this out of componentDidMount
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
            fakeLinks,
            arrowLabels,
            transitions,
            children,
            classes,
            styles } = this.props;
    const { page, pageCount } = this.state;


    const paginationArray = Array
      .apply(null, {length: pageCount + 1})
      .map(Number.call, Number);

    const filler = (
      <div
        className={classes.arrowFiller || classes.navArrow}
        style={styles.arrowFiller || styles.navArrow}>
        {String.fromCharCode('\u00a0')}
      </div>
    );

    const leftArrow = page === 0 ? filler : (
      <Arrow
        className={classes.previousPage}
        style={styles.previousPage}
        label={arrowLabels.previous}
        fakeLink={fakeLinks}
        onClick={this.previous}/>
    );

    const rightArrow = page === pageCount ? filler : (
      <Arrow
        className={classes.nextPage}
        style={styles.nextPage}
        label={arrowLabels.next}
        fakeLink={fakeLinks}
        onClick={this.next}/>
    );

    const pagination = (
      <span
        key='react-shift-page-numbers'
        className={classes.pagination}
        style={styles.pagination}>
        {paginationArray.map((n) => {
          return n === page ? (
            <a
              key={`currentPage-${page}`}
              className={`${classes.pageNumber}-${n} ${classes.currentPage}`}
              // TODO Implement unique style prop for each page number element
              style={styles.currentPage}
              href={fakeLinks ? '#' : null}>
              {n + 1}
            </a>
          ) : (
            <a
              key={`page-${n}`}
              className={classes.pageNumber}
              style={styles.pageNumber}
              href={fakeLinks ? '#' : null}
              onClick={this.setPage.bind(null, n)}>
              {n + 1}
            </a>
          );
        })}
      </span>
    );

    const fastLinksList = fastLinks ? (
      <div>
        {Object.keys(fastLinks).map((i, v) => {
          return (
            <a
              key={`fastLink${i}`}
              className={classes.fastLinks}
              style={styles.faskLinks}
              href={fakeLinks ? '#' : null}
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
        className={classes.wrapper}
        style={styles.wrapper}
        onWheelCapture={this.handleWheel}
        onTouchMove={this.handconstouch}>
        <div
          className={classes.page}
          style={styles.page}>
            {transitions ?
              <ReactCSSTransitionGroup
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                transitionName={transitions.name}>
                  {children[page]}
              </ReactCSSTransitionGroup>
            : children[page]}
        </div>
        <nav
          className={classes.navigation}
          style={styles.navigation}>
            {fastLinksList}
            {leftArrow} {pagination} {rightArrow}
        </nav>
      </div>
    );
  }
}

ReactShift.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    navigation: PropTypes.string,
    page: PropTypes.string,
    pagination: PropTypes.string,
    pageNumber: PropTypes.string,
    currentPage: PropTypes.string,
    fastLinks: PropTypes.string,
    navArrow: PropTypes.string,
    nextPage: PropTypes.string,
    previousPage: PropTypes.string
  }),
  styles: PropTypes.shape({
    wrapper: PropTypes.object,
    navigation: PropTypes.object,
    page: PropTypes.object,
    pagination: PropTypes.object,
    pageNumber: PropTypes.object,
    currentPage: PropTypes.object,
    fastLinks: PropTypes.object,
    navArrow: PropTypes.object,
    nextPage: PropTypes.object,
    previousPage: PropTypes.object
  }),
  arrowLabels: PropTypes.shape({
    className: PropTypes.string,
    next: PropTypes.string,
    previous: PropTypes.string
  }),
  fastLinks: PropTypes.object,
  transitions: PropTypes.shape({
    active: PropTypes.bool,
    name: PropTypes.string
  }),
  scrollable: PropTypes.bool
};

ReactShift.defaultProps = {
  styles: {},
  arrowLabels: {
    next: 'Next page',
    previous: 'Previous page'
  },
  fakeLinks: true,
  // TODO: Fix scrolling problems on mobile devices
  scrollable: false
};
