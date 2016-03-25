var React = require('react'),
    BookingItem = require('./bookingItem');


var BookingsIndex = React.createClass({
  // sortByUpdatedTime: function(){
  //   var sortedBookings = [];
  //
  //   this.props.bookings.each(function(booking){
  //
  //   }.bind(this))
  //
  //   return sortedBookings
  // },

  renderItems: function(){
    return this.props.bookings.map(function(booking){
      return <BookingItem booking={booking}
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
