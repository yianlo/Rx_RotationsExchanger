var React = require('react'),
    ReactSlider = require('react-slider'),
    ApiUtil = require('../../util/apiUtil');

//
var PriceSlider = React.createClass({
  getInitialState: function(){
    return { value: [0, 501]};
  },

  _onChange: function(value){
    ApiUtil.fetchRoomsInPriceRange(value)
    this.setState({value: value});
  },

  render: function(){
    return(
      <div className="price-slider-container">
        <ReactSlider withBars
          min={10}
          max={501}
          value= {this.state.value}
          onChange = {this._onChange}>

          <div className="my-handle"></div>
          <div className="my-handle"></div>
        </ReactSlider>
        <div className="price-display">
          <p>{"$" + this.state.value[0]}</p>
          <p>${this.state.value[1] > 500 ? "500+" : this.state.value[1]}</p>
        </div>
      </div>
    )
  }

});


module.exports = PriceSlider;
