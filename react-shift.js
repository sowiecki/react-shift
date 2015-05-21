var React = require('react/addons')
    , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
    , handleSwipe = require('./handle-swipe')

React.initializeTouchEvents(true)

var Arrow = React.createClass({displayName: "Arrow",
    render: function() {
      return (
        React.createElement("div", {className: "react-shift-nav-arrow"}, 
          React.createElement("a", {id: this.props.id, href: "#", onClick: this.props.on_click}, 
            this.props.label
          )
        )
      )
    }
  })

var Shift = React.createClass({displayName: "Shift",
    propTypes: {
      arrowLabels: React.PropTypes.object
      , arrowLabels: React.PropTypes.shape({
        next: React.PropTypes.string
        , previous: React.PropTypes.string
      })
      , fastLinks: React.PropTypes.object
      , transitions: React.PropTypes.bool
      , scrollable: React.PropTypes.bool
    }
    , getDefaultProps: function() {
      return {
        arrowLabels: {
          next: "Next page"
          , previous: "Previous page"
        }
        , fastLinks: {}
        , scrollable: true
      }
    }
    , getInitialState: function() {
      return {
        mounted: false
        , page: 0
        , pageCount: 0
      }
    }
    , componentDidMount: function() {
      this.setState({
        mounted: true
        , pageCount: this.props.children.length - 1
        , scrollable: this.props.scrollable
      })
    }
    , next: function() {
      if (this.state.page === this.state.pageCount) {
        null
      } else {
        this.setState({page: this.state.page + 1})
      }
    }
    , previous: function() {
      if (this.state.page === 0) {
        null
      } else {
        this.setState({page: this.state.page - 1})
      }
    }
    , setPage: function(n) {
      this.setState({page: n})
    }
    , handleWheel: function(e) {
      if (this.props.scrollable) {
        if (e.deltaY > 0) {
          this.next()
        } else {
          this.previous()
        }
      }
    }
    , handleTouch: function(e) {
      switch (handleSwipe(e.changedTouches[0].pageX)) {
        case 'left':
          this.next()
          break
        case 'right':
          this.previous()
          break
      }
    }
    , render: function() {
      var self = this
          , fastLinks = this.props.fastLinks
          , paginationArray = Array
              .apply(null, {length: this.state.pageCount + 1})
              .map(Number.call, Number)
          , filler =
            React.createElement("div", {
              className: "react-shift-nav-arrow"}, 
              "\u00a0"
            )
          , leftArrow =
            this.state.page === 0 ? filler :
              React.createElement(Arrow, {
                id: "react-shift-previous-page", 
                label: this.props.arrowLabels.previous, 
                on_click: this.previous})
          , rightArrow =
           this.state.page === this.state.pageCount ? filler :
            React.createElement(Arrow, {
              id: "react-shift-next-page", 
              label: this.props.arrowLabels.next, 
              on_click: this.next})
          , pagination =
            React.createElement("span", {
              key: "react-shift-page-numbers", 
              id: "react-shift-pagination", 
              className: "react-shift-pagination"}, 
              paginationArray.map(function(n) {
                return n == self.state.page ? React.createElement("a", {key: "currentPage-" + self.state.page, id: "page-" + n, className: "react-shift-page-number react-shift-current-page", href: "#"}, n + 1) : React.createElement("a", {key: "page" + n, id: "page-" + n, className: "react-shift-page-number", href: "#", onClick: self.setPage.bind(null, n)}, n + 1)
              })
            )

          if (this.props.fastLinks) {
            var fastLinksList =
              React.createElement("div", {id: "react-shift-fast-links"}, 
                Object.keys(fastLinks).map(function(i, v) {
                  return React.createElement("a", {
                    key: "fastLink" + i, 
                    className: "react-shift-fast-link", 
                    href: "#", 
                    onClick: self.setPage.bind(null, fastLinks[i])}, 
                      Object.keys(fastLinks)[v]
                  )
                })
              )
          } else {
            var fastLinksList
          }
      return (
        React.createElement("div", {
          key: "react-shift", 
          id: "react-shift-wrapper", 
          onWheelCapture: this.handleWheel, 
          onTouchMove: this.handleTouch}, 
          React.createElement("div", {id: "react-shift-page"}, 
            this.props.transitions ?
              React.createElement(ReactCSSTransitionGroup, {transitionName: "react-shift-page"}, 
                this.props.children[this.state.page]
              )
            : this.props.children[this.state.page]
          ), 
          React.createElement("nav", {id: "react-shift-navigation"}, 
            fastLinksList, 
            leftArrow, pagination, rightArrow
          )
        )
      )
    }
  })

module.exports = Shift