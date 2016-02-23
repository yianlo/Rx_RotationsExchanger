var React = require('react');
var FilterParamsStore = require('../../stores/filterParams');

var FilterParams = React.createClass({
  getInitialState: function(){
    return { params: FilterParamsStore.all() }
  },

  _onChange: function(){
    var params = FilterParamsStore.all();
    this.setState( { params: params } )
    apiUtil.fetchRoomsWithinParams(params);
  },

  componentDidMount: function(){
    this.listenerToker = FilterParamsStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
  },

  render: function(){
    return (
      <div className="search-field-container price-search-field">
        <label className="search-field-label">Price Range</label>
        <PriceSlider />
      </div>
    )
  }
});

module.exports = FilterParams;
