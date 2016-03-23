var React = require('react');

var TripItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function*(){
    return {city: ""}
  },

  componentWillMount: function(){
    this.getCity(this.props.trip.room.lat, this.props.trip.room.lng)
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

  getCity: function(lat, lng){
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat, lng};

    geocoder.geocode({'location': latlng}, function(result, status){
      if (status === google.maps.GeocoderStatus.OK) {
        this.setState({city: result[0].address_components[3].long_name})
      }
    }.bind(this));
  },

  render: function(){
    return(
      <div onClick={this.handleClick} className="trip-item">
        <div className="wrapper">
          <img className="trip-room-img"
            src= {this.props.trip.images[0].url}></img>
        </div>

        <h2>{this.state.city}</h2>
        <p>{this.props.trip.room.title}</p>
        <p>{this.displayDate(this.props.trip.checkin_date, this.props.trip.checkout_date)}</p>
      </div>
    )
  }
})

module.exports = TripItem;
