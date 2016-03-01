var React = require('react'),
    NavBar = require('./nav/navBar');


var ProfilePage = React.createClass({
  render: function(){
    return(
      <div id="main">
        <NavBar isLanding={false}/>
        {this.props.children}
      </div>
    )
  }
})

module.exports = ProfilePage;
