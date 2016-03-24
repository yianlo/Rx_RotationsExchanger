var React = require('react'),
    BookingItem = require('./bookingItem');


var BookingsIndex = React.createClass({
  sortByUpdatedTime: function(){
    var sortedBookings = [];

    this.props.bookings.each(function(booking){

    }.bind(this))

    return sortedBookings
  },

  renderItems: function(){
    return this.props.bookings.map(function(booking){
      return <BookingItem group={this.props.group} booking={booking}/>
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
