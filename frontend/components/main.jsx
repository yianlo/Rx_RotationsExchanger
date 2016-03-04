var React = require('react'),
    NavBar = require('./nav/navBar');


var Main = React.createClass({
  render: function(){
    return(
      <div id="main">
        <NavBar isLanding={false}/>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Main;
