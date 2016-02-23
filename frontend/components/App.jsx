var React = require('react'),
    SearchResult = require('./searchResult'),
    NavBar = require('./nav/navBar');


var App = React.createClass({
  render: function() {
    return (
      <section className="app-container">
        <NavBar />
        {this.props.children}
      </section>
    )
  }
})

module.exports = App;
