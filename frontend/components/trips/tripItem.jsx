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

  getStatusColor: function(){
    switch (this.props.trip.status){
      case "pending":
        return "#FDEBCF"
      case "approved":
        return "#47B656"
      case "denied":
        return "#ddd"
    };
  },

  renderStatus: function(){
    if(this.props.group !== "current"){
      statusColor = this.getStatusColor()
      return(
        <div className="status"
          style={{backgroundColor: statusColor}}>
          {this.props.trip.status}
        </div>
      )
    }
  },

  redirectOnSuccess: function(){

  },

  handleDelete: function(e){
    e.preventDefault();
    e.stopPropagation();
    debugger
    apiUtil.deleteBooking(this.props.trip.id)
  },

  getDeleteButton: function(){
    // if (this.props.group === "current") {
      return <i className="delete-button fa fa-trash-o"
        onClick={this.handleDelete}></i>
    // }
  },

  render: function(){
    return(
      <div onClick={this.handleClick} className="trip-item">
        <h2>{this.state.city}</h2>
        {this.getDeleteButton()}

        <div className="wrapper"
          style={{backgroundImage: 'url(' + this.props.trip.images[0].url + ')'}}>

        </div>

        <hr></hr>
        <p>{this.props.trip.room.title}</p>
        <p>{this.displayDate(this.props.trip.checkin_date, this.props.trip.checkout_date)}</p>

        {this.renderStatus()}
      </div>
    )
  }
})

// <img className="trip-room-img"
//   src= {this.props.trip.images[0].url}></img>

module.exports = TripItem;
