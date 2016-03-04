var React = require('react');


var WelcomeView = React.createClass({

  render: function() {
    var view;

    if (this.props.user) {
      view = <h1>{"Welcome " + this.props.user.email}</h1>
    } else {
      view = <input onKeyPress={this.props._onName} placeholder="Please enter your Twitter username" />
    }

    return view;
  }

});


module.exports = WelcomeView;
