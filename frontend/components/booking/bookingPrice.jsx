var React = require('react');


var BookingPrice = React.createClass({
  getNightsCount: function(){


  },

  render: function(){
    return(
      <div className="req-form-price">
        <p>{"$" + this.props.price + " x " + this.props.nightCount + " nights"}</p>
        <p>{"Total: $" + this.props.price*this.props.nightCount}</p>
      </div>
    )
  }
})

module.exports = BookingPrice;
