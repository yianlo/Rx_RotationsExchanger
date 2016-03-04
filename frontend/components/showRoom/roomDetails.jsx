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

  componentDidMount: function(){
    this.roomId = parseInt(this.props.params.roomId);
  },

  componentWillReceiveProps: function(newProp){
    this.roomId = parseInt(newProp.params.roomId);
  },

  handleEdit: function(){
    this.context.router.replace('/main/' + this.roomId +'/edit')
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
