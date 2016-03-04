var React = require('react'),
    NavBar = require('./nav/navBar');


var Submenu = React.createClass({
  render: function(){
    return(
      <div id="main">
        <NavBar isLanding={false}/>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Submenu;
