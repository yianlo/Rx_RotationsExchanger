var React = require('react');

var TripItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  handleTitleClick: function(){
    this.context.router.replace('/main/' + this.props.trip.room.id)
  },

  render: function(){
    debugger
    return(
      <div className="trip-item">
        <div className="wrapper">
          <img className="trip-room-img"
            src= {this.props.trip.images[0].url}></img>
        </div>

        <div onClick={this.handleTitleClick}>{this.props.trip.room.title}</div>
        <div>{this.props.trip.checkin_date}</div>
        <div>{this.props.trip.checkout_date}</div>
      </div>
    )
  }
})

module.exports = TripItem;
