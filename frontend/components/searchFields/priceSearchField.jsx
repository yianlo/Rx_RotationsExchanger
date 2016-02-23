var React = require('react');
var PriceSlider = require('./PriceSlider');

var PriceSearchField = React.createClass({
  render: function(){
    return (
      <div className="search-field-container price-search-field">
        <label className="search-field-label">Price Range</label>
        <PriceSlider />
      </div>
    )
  }
});

module.exports = PriceSearchField;
