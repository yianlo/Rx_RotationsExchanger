var React = require('react'),
    PriceSlider = require('./PriceSlider');

var PriceSearch = React.createClass({
  render: function(){
    return (
      <div className="search-field-container price-search-field">
        <label className="search-field-label">Price Range</label>
        <PriceSlider />
      </div>
    )
  }
});

module.exports = PriceSearch;
