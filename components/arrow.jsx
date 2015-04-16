var React = require('react/addons');

var Arrow = React.createClass({
    render: function() {
      return (
        <div key="react-shift-previous-page" className="react-shift-nav-arrow">
          <a id="react-shift-previous-page" href="#" onClick={this.props.on_click}>
            {this.props.label}
          </a>
        </div>
      );
    }
  });

module.exports = Arrow;