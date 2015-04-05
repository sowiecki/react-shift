module.exports = Slide

slides = document.getElementsByClassName('react-slide') || []

// Dependencies
var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    ReactTransitionGroup = React.addons.TransitionGroup,
    SlideLength = slides.length - 1
    paginationArray = Array.apply(null, {length: SlideLength + 1}).map(Number.call, Number);

// Carousel
var Slide = React.createClass({displayName: "Slide",
    getInitialState: function() {
      return {
        mounted: false,
        page: 0
      };
    },
    componentDidMount: function() {
      this.setState({
        mounted: true
      });
    },
    nextPage: function() {
      this.state.page === SlideLength ? null : this.setState({page: this.state.page + 1});
    },
    previousPage: function() {
      this.state.page === 0 ? null : this.setState({page: this.state.page - 1});
    },
    skipToPage: function(n) {
      this.setState({page: n});
    },
    render: function() {
      var self = this,
          filler =
            React.createElement("span", {className: "react-shift-nav-arrow noclick"}, "\u00a0"),
          leftArrow =
            this.state.page === 0 ? filler : React.createElement("a", {key: "react-shift-previous-page", id: "react-shift-previous-page", className: "react-shift-nav-arrow", href: "#", onClick: this.previousPage}, "«"),
          rightArrow =
           this.state.page === SlideLength ? filler : React.createElement("a", {key: "react-shift-next-page", id: "react-shift-next-page", className: "react-shift-nav-arrow", href: "#", onClick: this.nextPage}, "»"),
          pagination =
            React.createElement("span", {id: "page-numbers", className: "noselect"}, 
              paginationArray.map(function(n) {
                return n == self.state.page ? React.createElement("a", {key: n, className: "current-page", href: "#"}, n + 1) : React.createElement("a", {key: n, href: "#", onClick: self.skipToPage.bind(null, n)}, n + 1)
              })
            )

      return (
        React.createElement("div", {id: "react-shift-wrapper"}, 
          React.createElement("div", {id: "react-shift-slide"}, 
            React.createElement(ReactCSSTransitionGroup, {transitionName: "react-shift-slide-transition"}, 
              slides[this.state.page]
            )
          ), 
          React.createElement("nav", null, 
            leftArrow, pagination, rightArrow
          )
        )
      );
    }
  });

if (document) React.render(React.createElement(Slide, null), document.getElementById("react-shift-anchor"));