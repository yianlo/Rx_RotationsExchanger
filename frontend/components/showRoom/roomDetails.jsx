var React = require('react'),
    SessionStore = require('../../stores/session'),
    RoomStore = require('../../stores/room'),
    apiUtil = require('../../util/apiUtil');

var RoomDetails = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return ({room: RoomStore.find(this.roomId)})
  },

  _onChange: function(){
    this.setState( {room: RoomStore.find(this.roomId)} );
  },

  componentDidMount: function(){
    this.roomId = parseInt(this.props.params.roomId);
    apiUtil.fetchSingleRoom(this.roomId);

    this.listenerToken = RoomStore.addListener(this._onChange);
  },

  componentWillUnmount: function(){
    this.listenerToken.remove();
  },

  componentWillReceiveProps: function(newProp){
    this.roomId = parseInt(newProp.params.roomId);
    apiUtil.fetchSingleRoom(this.roomId);
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

    if (currentUser && currentUser.id === this.state.room.host_id) {
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
    if (this.state.room) {
      return(
        <section className="text-content">
          <section className="header">
            <h2>{this.state.room.title}</h2>
            <span className="vert-bar">|</span>
            <p>{this.state.room.room_type + " in " + this.state.room.home_type}  </p>
          </section>
          <section className="description">
            <h3>About this listing</h3>
            <p>{this.state.room.description}</p>
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
