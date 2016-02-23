var React = require('react'),
    RoomStore = require('../stores/room'),
    apiUtil = require('../util/apiUtil'),
    IndexItem = require('./indexItem');


var Index = React.createClass({
  getInitialState: function(){
    return { rooms: RoomStore.all() }
  },

  _onChange: function(){
    this.setState( { rooms: RoomStore.all() } )
  },

  componentDidMount: function(){
    this.listenerToker = RoomStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
  },

  getIndexItems: function(){
      return this.state.rooms.map( function(room, idx){
        return(
          <IndexItem key={room.id} room={room} />
        )
      }.bind(this) );
  },

  render: function(){
    return(
      <section className="search-results">
        {this.getIndexItems()}
      </section>
    )
  }

})


module.exports = Index;
