var React = require('react'),
    DateSearch = require('./dateFields'),
    HomeTypeSearch = require('./homeTypeSearch'),
    RoomTypeSearch = require('./roomTypeSearch'),
    PriceSearch = require('./priceSearch');

var SearchFields = React.createClass({
  render: function(){
    return (
      <section className="search-fields-container">
        <DateSearch
          label="Dates"
          names={["Check in", "Check out"]}
          containerClass="search-field-container"
          labelClass="search-field-label"
          inputClass="search-field"/>
        <hr className="search-hr"></hr>
        <HomeTypeSearch />
        <hr className="search-hr"></hr>
        <RoomTypeSearch />
        <hr className="search-hr"></hr>
        <PriceSearch />
      </section>
    )
  }
})

module.exports = SearchFields;
