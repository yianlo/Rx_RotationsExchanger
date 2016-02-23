var React = require('react'),
    SearchFields = require('./searchFields/SearchField'),
    Map = require('./map');


var Search = React.createClass({
  render: function(){
    return (
      <div className="search-results-container">
        <SearchFields />
        <Map />
      </div>
    )
  }
})

module.exports = Search;
