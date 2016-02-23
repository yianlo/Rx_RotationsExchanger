var React = require('react'),
    NavBarItem = require('./navBarItem'),
    SearchBar = require('./searchBar');

var NavBar = React.createClass({
  generateItem: function(item){
    return <NavBarItem text={item.text} url={item.url} submenu={item.submenu} />
  },

  render: function() {
    // var items = this.props.items.map(this.generateItem);
    return (
      <div className="nav-bar">

        <div>
          <div className="logo">
            <h1 className="logo-design">B</h1>
            <h2 className="logo-text">benchbnb</h2>
          </div>

          <img className="search-logo" src="http://www2.psd100.com/ppp/2013/11/2701/search-1127191700.png"></img>
          <SearchBar />
        </div>


        <div>
          <NavBarItem text="Host A Room" url={"/#"} newClass="host-room-button"/>
          <NavBarItem text="Help" url={"/#"}/>
          <NavBarItem text="Sign Up" url={"/#"}/>
          <NavBarItem text="Log In" url={"/#"}/>
        </div>
      </div>
    );
  }
})

module.exports = NavBar;
