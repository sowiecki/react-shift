var React = require('react/addons');

// Dependencies
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// Carousel
var Shift = React.createClass({displayName: "Shift",
    propTypes: {
      nextAndPrev: React.PropTypes.object,
      nextAndPrev: React.PropTypes.shape({
        nextPage: React.PropTypes.string,
        previousPage: React.PropTypes.string
      }),
      fastLinks: React.PropTypes.object,
      transitions: React.PropTypes.bool,
      scrollable: React.PropTypes.bool
    },
    getDefaultProps: function() {
      return {
        nextAndPrev: {
          nextPage: "Next page",
          previousPage: "Previous page"
        },
        fastLinks: {},
        scrollable: true
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
        pageCount: this.props.children.length - 1,
        scrollable: this.props.scrollable
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
    handleWheel: function(e) {
      if (this.props.scrollable) {
        if (e.deltaY > 0) {
          this.nextPage();
        } else {
          this.previousPage();
        };
      };
    },
    render: function() {
      var self = this,
          fastLinks = this.props.fastLinks,
          paginationArray = Array.apply(null, {length: this.state.pageCount + 1}).map(Number.call, Number),
          filler =
            React.createElement("div", {className: "react-shift-nav-arrow"}, "\u00a0"),
          leftArrow =
            this.state.page === 0 ? filler : React.createElement("div", {key: "react-shift-previous-page", className: "react-shift-nav-arrow"}, React.createElement("a", {id: "react-shift-previous-page", href: "#", onClick: this.previousPage}, this.props.nextAndPrev.previousPage)),
          rightArrow =
           this.state.page === this.state.pageCount ? filler : React.createElement("div", {key: "react-shift-next-page", className: "react-shift-nav-arrow"}, React.createElement("a", {id: "react-shift-next-page", href: "#", onClick: this.nextPage}, this.props.nextAndPrev.nextPage)),
          pagination =
            React.createElement("span", {key: "react-shift-page-numbers", id: "react-shift-pagination", className: "react-shift-pagination"}, 
              paginationArray.map(function(n) {
                return n == self.state.page ? React.createElement("a", {key: "currentPage-" + self.state.page, id: "page-" + n, className: "react-shift-page-number react-shift-current-page", href: "#"}, n + 1) : React.createElement("a", {key: "page" + n, id: "page-" + n, className: "react-shift-page-number", href: "#", onClick: self.skipToPage.bind(null, n)}, n + 1)
              })
            )

          if (this.props.fastLinks) {
            var fastLinksList =
              React.createElement("div", {id: "react-shift-fast-links"}, 
                Object.keys(fastLinks).map(function(i, v) {
                  return React.createElement("a", {key: "fastLink" + i, className: "react-shift-fast-link", href: "#", onClick: self.skipToPage.bind(null, fastLinks[i])}, Object.keys(fastLinks)[v]);
                })
              )
          } else {
            var fastLinksList;
          };

      return (
        React.createElement("div", {key: "react-shift", id: "react-shift-wrapper", onWheelCapture: this.handleWheel}, 
          React.createElement("div", {id: "react-shift-page"}, 
            this.props.transitions ? React.createElement(ReactCSSTransitionGroup, {transitionName: "react-shift-page"}, 
              this.props.children[this.state.page]
            ) : this.props.children[this.state.page]
          ), 
          React.createElement("nav", {id: "react-shift-navigation"}, 
            fastLinksList, 
            leftArrow, pagination, rightArrow
          )
        )
      );
    }
  });

module.exports = Shift;