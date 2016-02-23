var React = require('react');

var SearchBar = React.createClass({
  render: function(){
    return(
      <form>
        <input type="search"
                className="search"
                placeholder="Where are you going?">
        </input>
      </form>
    )
  }

})

module.exports = SearchBar;
