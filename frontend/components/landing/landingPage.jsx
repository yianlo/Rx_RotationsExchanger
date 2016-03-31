var React = require('react'),
    LandingTop = require('./landingTop');
    LandingIndex = require('./landingIndex');


var LandingPage = React.createClass({
  render: function() {

    return (
      <div className="landing-container">
        <LandingTop />
        <LandingIndex />
      </div>

    )
  }
})

module.exports = LandingPage;
