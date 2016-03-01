var React = require('react'),
    RoomStore = require('../../../stores/room'),
    IndexItem = require('./indexItem'),

    FilterParamsStore = require('../../../stores/filterParams'),
    FilterActions = require('../../../actions/filterActions'),
    apiUtil = require('../../../util/apiUtil');

var Index = React.createClass({
  getInitialState: function(){
    return {
      rooms: RoomStore.all(),
      filterParams: {}
    };
  },

  _onRoomChange: function(){
    this.setState({
      rooms: RoomStore.all()
    });
  },

  _onFilterChange: function(){
    this.setState({ filterParams: FilterParamsStore.getParams()});
  },

  componentDidMount: function(){
    filterParams = FilterParamsStore.getParams();
    apiUtil.fetchRoomsWithinParams(filterParams);

    this.setState({
      rooms: RoomStore.all(),
      filterParams: filterParams
    });
    this.listenerToker = RoomStore.addListener( this._onRoomChange );
  },

  componentWillReceiveProps: function(newProp){
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