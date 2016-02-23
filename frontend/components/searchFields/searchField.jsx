var React = require('react'),
    Index = require('../index'),
    SearchDate = require('./searchDate'),
    SearchHouseType = require('./searchHouseType'),
    SearchRoomType = require('./searchRoomType'),
    PriceSearchField = require('./priceSearchField');

var SearchField = React.createClass({

  render: function(){
    return (
      <section className="search-container">
        <SearchDate />
        <hr className="search-hr"></hr>
        <SearchHouseType />
        <hr className="search-hr"></hr>
        <SearchRoomType />
        <hr className="search-hr"></hr>
        <PriceSearchField />
        <Index />
      </section>
    )
  }
})

module.exports = SearchField;
