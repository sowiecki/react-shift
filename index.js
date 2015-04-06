var React = require('react/addons');

// Dependencies
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    ReactTransitionGroup = React.addons.TransitionGroup;

// Carousel
var Shift = React.createClass({displayName: "Shift",
    propTypes: {
      pages: React.PropTypes.array.isRequired
    },
    getDefaultProps: function() {
      return {
        pages: [React.createElement("div", null, "You haven't passed any pages.")]
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
        pageCount: this.props.pages.length - 1
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
          paginationArray = Array.apply(null, {length: this.state.pageCount + 1}).map(Number.call, Number),
          filler =
            React.createElement("span", {className: "react-shift-nav-arrow"}, "\u00a0"),
          leftArrow =
            this.state.page === 0 ? filler : React.createElement("a", {key: "react-shift-previous-page", id: "react-shift-previous-page", className: "react-shift-nav-arrow", href: "#", onClick: this.previousPage}, "«"),
          rightArrow =
           this.state.page === this.state.pageCount ? filler : React.createElement("a", {key: "react-shift-next-page", id: "react-shift-next-page", className: "react-shift-nav-arrow", href: "#", onClick: this.nextPage}, "»"),
          pagination =
            React.createElement("span", {id: "react-shift-page-numbers", className: "noselect"}, 
              paginationArray.map(function(n) {
                return n == self.state.page ? React.createElement("a", {key: n, className: "react-shift-current-page", href: "#"}, n + 1) : React.createElement("a", {key: n, href: "#", onClick: self.skipToPage.bind(null, n)}, n + 1)
              })
            )

      return (
        React.createElement("div", {id: "react-shift-wrapper"}, 
          React.createElement("div", {id: "react-shift-slide"}, 
            this.props.pages[this.state.page]
          ), 
          React.createElement("nav", null, 
            leftArrow, pagination, rightArrow
          )
        )
      );
    }
  });

module.exports = Shift