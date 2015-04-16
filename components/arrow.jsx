var React = require('react/addons');

var Arrow = React.createClass({
    render: function() {
      return (
        <div className="react-shift-nav-arrow">
          <a href="#" onClick={this.props.on_click}>
            {this.props.label}
          </a>
        </div>
      );
    }
  });

module.exports = Arrow;