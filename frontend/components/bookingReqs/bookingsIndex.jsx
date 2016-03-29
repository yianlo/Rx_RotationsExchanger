var React = require('react'),
    BookingItem = require('./bookingItem');


var BookingsIndex = React.createClass({
  renderItems: function(){
    return this.props.bookings.map(function(booking, i){
      return <BookingItem booking={booking}
        key={booking + i}
        group={this.props.group}
        page={this.props.page}/>
    }.bind(this))
  },

  render: function(){
    return(
      <div className="bookings-index">
        {this.renderItems()}
      </div>
    )
  }
})

module.exports = BookingsIndex;
