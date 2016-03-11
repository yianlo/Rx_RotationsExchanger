var React = require('react'),
    SessionStore = require('../../stores/session'),
    RoomStore = require('../../stores/room'),
    apiUtil = require('../../util/apiUtil');

var RoomDetails = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    room: React.PropTypes.object,
    roomId: React.PropTypes.number,
  },

  getInitialState: function(){
    return {address: ""}
  },

  handleEdit: function(){
    this.context.router.replace('/main/' + this.context.roomId +'/edit')
  },

  handleDelete: function(){
    var redirectCb = function(){
      this.context.router.replace('/main/search')
    }.bind(this)

    apiUtil.deleteRoom(this.roomId, redirectCb)
  },

  getButtons: function(){
    var currentUser = SessionStore.getUser();

    if (currentUser && currentUser.id === this.context.room.host_id) {
      return (
        <div className="show-buttons-container">
          <button className="edit-button"
            onClick={this.handleEdit}>
            Edit Posting
          </button>,
          <button className="delete-button"
            onClick={this.handleDelete}>
            Delete Posting
          </button>
        </div>
      )
    }
  },

  componentDidMount: function(){
    this.getAddress(this.context.room.lat, this.context.room.lng)
  },

  getAddress: function(lat, lng){
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat, lng};

    geocoder.geocode({'location': latlng}, function(result, status){
      if (status === google.maps.GeocoderStatus.OK) {
        this.setState({address: result[0].formatted_address})
      }
    }.bind(this));
  },

  render: function(){
    if (this.context.room) {
      return(
        <section className="text-content">
          <section className="header">
            <h2>{this.context.room.title}</h2>
            <span className="vert-bar">|</span>
            <p>{this.context.room.room_type + " in " + this.context.room.home_type}  </p>
          </section>
          <section className="description">
            <h3>About this listing</h3>
            <p className="address">{this.state.address}</p>
            <p>{this.context.room.description}</p>
          </section>
          {this.getButtons()}
        </section>
      )
    } else {
      return <div></div>
    }
  }
})

module.exports = RoomDetails;
