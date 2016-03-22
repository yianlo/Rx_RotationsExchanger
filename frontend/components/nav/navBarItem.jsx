var React = require('react'),
    Link = require('react-router').Link;


var NavBarItem = React.createClass({
  getInitialState: function(){
    return { submenuDisplay: {display: "none"} }
  },
  
  generateSubmenu: function(){
    return (
      <div className="submenu-item" style={this.state.submenuDisplay}>
        {this.props.submenu}
      </div>
    )
  },

  generateContent: function(){
    if(this.props.submenu){
      var content = [ <a>{this.props.text}</a> ];
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
      } else {
        this.setState({submenuDisplay: {display: "none"}})
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
