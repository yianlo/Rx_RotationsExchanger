var React = require('react'),
    SessionStore = require('../../stores/session'),
    RoomStore = require('../../stores/room'),
    apiUtil = require('../../util/apiUtil'),
    NavBarItem = require('./navBarItem');

var Listings = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object
  },

  getInitialState: function(){
    return {rooms: {}};
  },

  _onRoomChange: function(){
    if (this.context.currentUser) {
      this.setState( {rooms: RoomStore.getUserRooms()} );
    }
  },

  componentWillMount: function(){
    if (this.context.currentUser) {
      apiUtil.fetchRoomsByUser(this.context.currentUser.id)
      this.setState( {rooms: RoomStore.getUserRooms()} );
    }
  },

  componentDidMount: function(){
    if (this.context.currentUser) {
      this.setState( {rooms: RoomStore.getUserRooms()} );
    }

    this.roomListener = RoomStore.addListener( this._onRoomChange );
  },

  componentWillUnmount: function(){
    this.roomListener.remove();
  },

  renderListings: function(){
    if (this.context.currentUser && this.state.rooms) {
      return this.state.rooms.map( function(room, i){
        return <NavBarItem key={"room" + i} className="submenu-items" text={room.title}
          onClickFun={this.context.router.replace.bind(null, 'main/' + room.id)}/>
      }.bind(this))
    } else {
      return <NavBarItem text="No Listings"/>
    }
  },

  render: function(){
    if (this.state.rooms.length > 0){
      return(
        <NavBarItem text="Listings" submenu={this.renderListings()} newClass="submenu-title nav-items"/>
      )
    } else {
      return <NavBarItem text="No Listings"/>
    }

  }
})

module.exports = Listings;
