var React = require('react'),
    SessionStore = require('../../stores/session'),
    RoomStore = require('../../stores/room'),
    apiUtil = require('../../util/apiUtil'),
    NavBarItem = require('./navBarItem');

var Listings = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {rooms: {}};
  },

  _onRoomChange: function(){
    debugger

    if (this.currentUser) {
      this.setState( {rooms: RoomStore.getUserRooms()} );
    }
  },

  _onSessionChange: function(){
    this.currentUser = SessionStore.getUser();
    if (this.currentUser){
      apiUtil.fetchRoomsByUser(this.currentUser.id);
    }
  },

  componentDidMount: function(){
    debugger
    this.currentUser = SessionStore.getUser();

    if (this.currentUser) {
      apiUtil.fetchRoomsByUser(this.currentUser.id)
      debugger

      this.setState( {rooms: RoomStore.getUserRooms()} );
    }

    this.roomListener = RoomStore.addListener( this._onRoomChange );
    this.sessionListener = SessionStore.addListener( this._onSessionChange );
  },

  componentWillUnmount: function(){
    this.roomListener.remove();
    this.sessionListener.remove();
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
    if (this.currentUser) {
      return this.state.rooms.map( function(room){
        return <NavBarItem className="submenu-items" text={room.title}
          onClickFun={this.context.router.replace.bind(null, 'main/' + room.id)}/>
      }.bind(this))
    }
  },

  render: function(){
    return(
      <NavBarItem text="My Listings" submenu={this.renderListings()}/>
    )
  }
})

module.exports = Listings;
