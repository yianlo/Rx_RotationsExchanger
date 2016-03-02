var React = require('react'),
    SessionStore = require('../../stores/session'),
    RoomStore = require('../../stores/room'),
    NavBarItem = require('./navBarItem');

var Listings = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {room: {}};
  },

  _onRoomChange: function(){
    this.currentUser = SessionStore.getUser();
    if (this.currentUser) {
      var userRooms = RoomStore.findByHostId(this.currentUser.id)
      this.setState( {rooms: userRooms} );
    }
  },

  componentDidMount: function(){
    this.currentUser = SessionStore.getUser();

    if (this.currentUser) {
      this.setState({rooms: this.currentUser.rooms})
    }

    this.listenerToken = RoomStore.addListener( this._onRoomChange );
  },

  componentWillUnmount: function(){
    this.listenerToken.remove();
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
      var updatedListings = this.arrayUnique(this.currentUser.rooms.concat(this.state.rooms));

      return updatedListings.map( function(room){
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
