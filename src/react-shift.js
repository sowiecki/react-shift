/* eslint react/no-did-mount-set-state:0 */
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Arrow from './arrow';
import Pagination from './pagination';

import touchHandler from './touch-handler';

class ReactShift extends Component {
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

  componentWillMount() {
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
      this.setState({ page: page + 1 });
    }
  }

  previous() {
    const { page } = this.state;

    if (page !== 0) {
      this.setState({ page: page - 1 });
    }
  }

  setPage(n) {
    this.setState({ page: n });
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
    const { next, previous } = this;

    touchHandler(
      e.changedTouches[0].pageX,
      next,
      previous
    );
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

    const filler = (
      <a
        className={classes.arrowFiller || classes.navArrow}
        style={styles.arrowFiller || styles.navArrow}>
        {String.fromCharCode('\u00a0')}
      </a>
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
      <Pagination
        onClick={this.setPage}
        page={page}
        pageCount={pageCount}
        {...this.props}/>
    );

    const fastLinksList = fastLinks ? (
      <div>
        {Object.keys(fastLinks).map((i, v) => {
          return (
            <a
              key={`fastLink-${i}`}
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
    previousPage: PropTypes.string,
    arrowFiller: PropTypes.string
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
    previousPage: PropTypes.object,
    arrowFiller: PropTypes.object
  }),
  arrowLabels: PropTypes.shape({
    className: PropTypes.string,
    next: PropTypes.string,
    previous: PropTypes.string
  }),
  fastLinks: PropTypes.object,
  fakeLinks: PropTypes.bool,
  transitions: PropTypes.shape({
    active: PropTypes.bool,
    name: PropTypes.string
  }),
  scrollable: PropTypes.bool
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

export default ReactShift;
