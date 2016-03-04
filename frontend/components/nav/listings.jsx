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

  arrayUnique: function(array){
    var a = array.concat();
    for( var i = 0; i < a.length; i++) {
      for( var j = (i+1); j < a.length; j++) {
        if(a[i].id === a[j].id){ a.splice(j--, 1);}
      }
    }

    return a;
  },

  renderListings: function(){
    if (this.context.currentUser && this.state.rooms) {
      return this.state.rooms.map( function(room){
        return <NavBarItem className="submenu-items" text={room.title}
          onClickFun={this.context.router.replace.bind(null, 'main/' + room.id)}/>
      }.bind(this))
    } else {
      return <NavBarItem text="No Listings"/>
    }
  },

  render: function(){
    if (this.state.rooms.length > 0){
      return(
        <NavBarItem text="My Listings" submenu={this.renderListings()} newClass="submenu nav-items"/>
      )
    } else {
      return <NavBarItem text="No Listings"/>
    }

  }
})

module.exports = Listings;
