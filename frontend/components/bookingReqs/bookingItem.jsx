var React = require('react'),
    ToolTip = require('react-portal-tooltip'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var BookingItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function*(){
    return {
      city: "",
      isTooltipActive: false
    }
  },

  componentWillMount: function(){
    this.getCity(this.props.booking.room.lat, this.props.booking.room.lng)
  },

  handleClick: function(){
    this.context.router.replace('/main/' + this.props.booking.room.id)
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
    switch (this.props.booking.status){
      case "pending":
        return "#f2cd00"
      case "approved":
        return "#47B656"
      case "denied":
        return "#444"
    };
  },

  handleDelete: function(e){
    e.preventDefault();
    e.stopPropagation();

    apiUtil.deleteBooking(this.props.booking.id)
  },

  getDeleteButton: function(){
    if (this.props.group === "upcoming") {
      return <i className="delete-button fa fa-trash-o"
        onClick={this.handleDelete}></i>
    }
  },

  handleApprove: function(e){
    e.preventDefault();
    e.stopPropagation();

    apiUtil.approveBooking(this.props.booking.id)
  },

  handleDeny: function(e){
    e.preventDefault();
    e.stopPropagation();

    apiUtil.denyBooking(this.props.booking.id)
  },

  getApproveDenyButtons: function(){
    return(
      <div  className="buttons-container">
        <button onClick={this.handleApprove}>Approve</button>
        <button onClick={this.handleDeny}>Deny</button>
      </div>
    )
  },

  getStatus: function(){
    if(this.props.group !== "current"){
      statusColor = this.getStatusColor()
      return(
        <div className="status"
          style={{color: statusColor}}>
          {this.props.booking.status}
        </div>
      )
    }
  },

  displayGuestMessage: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isTooltipActive: true })
  },

  hideGuestMessage: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isTooltipActive: false })
  },

  getGuestMessage: function(){
    var style = {
      style: {
        width: 350,
        background: 'rgba(0,0,0,.8)',
        padding: 20,
        boxShadow: '4px 4px 3px rgba(0,0,0,.5)'
      },
      arrowStyle: {
        color: 'rgba(0,0,0,.7)',
        borderColor: false,
      }
    };

    return(
      <ToolTip active={this.state.isTooltipActive}
          position="top" arrow="left" style={style}
          parent={"#message" + this.props.booking.id}>
        <div className="guest-message-container">
          <p className="message">{this.props.booking.message}</p>
        </div>
      </ToolTip>
    )
  },

  getHostingReqInfo: function(){
    if (this.state.isTooltipActive){
      var messageLinkVerb = "Hide";
      var handleMessageLinkClick = this.hideGuestMessage;
    } else {
      var messageLinkVerb = "View";
      var handleMessageLinkClick = this.displayGuestMessage;
    }

    return(
      <div className="booking-info">
        <hr></hr>
        <p>{"Total $" + this.props.booking.total_price}
          <span className="vert-bar">|</span>
          <span className="view-message link"
            onClick={handleMessageLinkClick}
            id={"message" + this.props.booking.id}>{messageLinkVerb+" Guest Message"}
          </span>
        </p>

        {this.getGuestMessage()}
      </div>
    )
  },

  getTripsInfo: function(){
    return(
      <div className="booking-info">
        <hr></hr>
        <p>{"Total $" + this.props.booking.total_price}</p>
      </div>
    )
  },

  render: function(){
    return(
      <div onClick={this.handleClick} className="booking-item">
        <h2>{this.state.city}</h2>
        {this.getDeleteButton()}

        <div className="image-wrapper"
          style={{backgroundImage: 'url(' + this.props.booking.images[0].url + ')'}}>
        </div>

        <hr></hr>
        <p>{this.props.booking.room.title}</p>
        <p>{this.displayDate(this.props.booking.checkin_date, this.props.booking.checkout_date)}</p>

        {this.props.page === "hostingReqs" ? this.getHostingReqInfo() : this.getTripsInfo()}
        {this.props.page === "trips" ? this.getStatus() : null}
        {this.props.group === "pending" ? this.getApproveDenyButtons() : null}
      </div>
    )
  }
})

module.exports = BookingItem;
