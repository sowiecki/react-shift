module.exports = Slide

slides = document.getElementsByClassName('react-slide') || []

// Dependencies
var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    ReactTransitionGroup = React.addons.TransitionGroup,
    SlideLength = slides.length - 1
    paginationArray = Array.apply(null, {length: SlideLength + 1}).map(Number.call, Number);

// Carousel
var Slide = React.createClass({
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
            <span className="react-shift-nav-arrow">{"\u00a0"}</span>,
          leftArrow =
            this.state.page === 0 ? filler : <a key="react-shift-previous-page" id="react-shift-previous-page" className="react-shift-nav-arrow" href="#" onClick={this.previousPage}>«</a>,
          rightArrow =
           this.state.page === SlideLength ? filler : <a key="react-shift-next-page" id="react-shift-next-page" className="react-shift-nav-arrow" href="#" onClick={this.nextPage}>»</a>,
          pagination =
            <span id="react-shift-page-numbers" className="noselect">
              {paginationArray.map(function(n) {
                return n == self.state.page ? <a key={n} className="react-shift-current-page" href="#">{n + 1}</a> : <a key={n} href="#" onClick={self.skipToPage.bind(null, n)}>{n + 1}</a>
              })}
            </span>

      return (
        <div id="react-shift-wrapper">
          <div id="react-shift-slide">
            <ReactCSSTransitionGroup transitionName="react-shift-slide-transition">
              {slides[this.state.page]}
            </ReactCSSTransitionGroup>
          </div>
          <nav>
            {leftArrow, pagination, rightArrow}
          </nav>
        </div>
      );
    }
  });

React.render(<Slide/>, document.getElementById("react-shift-anchor"));