var React = require('react');

var NavBarItem = React.createClass({
  generateSubmenu: function(){
  //We generate a simple Navbar (the parent).
  //Spoilers: it takes items as its argument.
    return <NavBar items={this.props.submenu} />
  },

  generateContent: function(){
    var content = [ <a href={this.props.url}>{this.props.text}</a> ];
    if(this.props.submenu){
      content.push(this.generateSubmenu());
    }
    return content;
  },

  render: function() {
    var content = this.generateContent();
    var className = this.props.newClass || "nav-items"
    return (
      <div className={className}>
        {content}
      </div>
    );
  }
})

module.exports = NavBarItem;
