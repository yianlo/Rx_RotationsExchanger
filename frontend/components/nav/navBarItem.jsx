var React = require('react'),
    Link = require('react-router').Link;



var NavBarItem = React.createClass({
  getInitialState: function(){
    return {
      submenuDisplay: {display: "none"},
      submenuPos: {position: "relative"}
    }
  },
  generateSubmenu: function(){
    return (
      <div className="nav-submenu" style={this.state.submenuDisplay}>
        {this.props.submenu}
      </div>
    )
    // return <NavBar items={this.props.submenu} />
  },

  generateContent: function(){


    if(this.props.submenu){
      var content = [ <a style={this.state.submenuPos}>{this.props.text}</a> ];
      content.push(this.generateSubmenu());
    } else {
      var content = [ <a>{this.props.text}</a> ];
    }
    return content;
  },

  toggleSubmenuDisplay: function(){
    if (this.props.submenu) {
      if (this.state.submenuDisplay.display === "none"){
        this.setState({submenuDisplay: {display: "flex"}})
        this.setState({submenuPos: {position: "absolute"}})
      } else {
        this.setState({submenuDisplay: {display: "none"}})
        this.setState({submenuPos: {position: "relative"}})
      }
    }
  },

  render: function() {
    // var content = this.generateContent();
    this.generateSubmenu()
    return (
      <div className={this.props.newClass||"nav-items"}
        onClick={this.props.onClickFun}
        onMouseOver={this.toggleSubmenuDisplay}
        onMouseOut={this.toggleSubmenuDisplay}>
        {this.generateContent()}
      </div>
    );
  }
})

module.exports = NavBarItem;
