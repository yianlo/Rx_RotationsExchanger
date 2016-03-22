var React = require('react');

var TripItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  handleClick: function(){
    this.context.router.replace('/main/' + this.props.trip.room.id)
  },

  displayDate: function(checkin, checkout){
    var monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    checkinStr = monthNames[checkin.getMonth()] + " "
               + checkin.getDate();
    checkoutStr = monthNames[checkout.getMonth()] + " "
                + checkout.getDate() + ", "
                + checkout.getFullYear();

    return checkinStr + " - " + checkoutStr
  },

  render: function(){
    return(
      <div onClick={this.handleClick} className="trip-item">
        <div className="wrapper">
          <img className="trip-room-img"
            src= {this.props.trip.images[0].url}></img>
        </div>

        <div>{this.props.trip.room.title}</div>
        <div>{this.displayDate(this.props.trip.checkin_date, this.props.trip.checkout_date)}</div>
      </div>
    )
  }
})

module.exports = TripItem;
