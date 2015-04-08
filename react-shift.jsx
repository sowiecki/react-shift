var React = require('react/addons');

// Dependencies
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// Carousel
var Shift = React.createClass({
    propTypes: {
      options: React.PropTypes.object,
      options: React.PropTypes.shape({
        nextPage: React.PropTypes.string,
        previousPage: React.PropTypes.string,
        fastLinks: React.PropTypes.object,
        transitions: React.PropTypes.bool
      })
    },
    getDefaultProps: function() {
      return {
        options: {
          nextPage: "Next page",
          previousPage: "Previous page",
          fastLinks: {}
        }
      };
    },
    getInitialState: function() {
      return {
        mounted: false,
        page: 0,
        pageCount: 0
      };
    },
    componentDidMount: function() {
      this.setState({
        mounted: true,
        pageCount: this.props.children.length - 1
      });
    },
    nextPage: function() {
      this.state.page === this.state.pageCount ? null : this.setState({page: this.state.page + 1});
    },
    previousPage: function() {
      this.state.page === 0 ? null : this.setState({page: this.state.page - 1});
    },
    skipToPage: function(n) {
      this.setState({page: n});
    },
    render: function() {
      var self = this,
          fastLinks = this.props.options.fastLinks,
          paginationArray = Array.apply(null, {length: this.state.pageCount + 1}).map(Number.call, Number),
          filler =
            <div className="react-shift-nav-arrow">{"\u00a0"}</div>,
          leftArrow =
            this.state.page === 0 ? filler : <div key="react-shift-previous-page" className="react-shift-nav-arrow"><a id="react-shift-previous-page" href="#" onClick={this.previousPage}>{this.props.options.previousPage}</a></div>,
          rightArrow =
           this.state.page === this.state.pageCount ? filler : <div key="react-shift-next-page" className="react-shift-nav-arrow"><a id="react-shift-next-page" href="#" onClick={this.nextPage}>{this.props.options.nextPage}</a></div>,
          pagination =
            <span key="react-shift-pagination" id="react-shift-page-numbers" className="noselect">
              {paginationArray.map(function(n) {
                return n == self.state.page ? <a key={"currentPage" + self.state.page} id="react-shift-current-page" href="#">{n + 1}</a> : <a key={"page" + n} href="#" onClick={self.skipToPage.bind(null, n)}>{n + 1}</a>
              })}
            </span>

      return (
        <div key="react-shift" id="react-shift-wrapper">
          <div id="react-shift-page">
            {this.props.options.transitions ? <ReactCSSTransitionGroup transitionName="react-shift-page">
              {this.props.children[this.state.page]}
            </ReactCSSTransitionGroup> : this.props.children[this.state.page]}
          </div>
          <nav id="react-shift-navigation">
            <div id="react-shift-fast-links">
              {Object.keys(fastLinks).map(function(i, v) {
                return <a key={"fastLink" + i} className="react-shift-fast-link" href="#" onClick={self.skipToPage.bind(null, fastLinks[i])}>{Object.keys(fastLinks)[v]}</a>;
              })}
            </div>
            {leftArrow, pagination, rightArrow}
          </nav>
        </div>
      );
    }
  });

module.exports = Shift