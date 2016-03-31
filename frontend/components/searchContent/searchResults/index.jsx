var React = require('react'),
    RoomStore = require('../../../stores/room'),
    IndexItem = require('./indexItem'),

    FilterParamsStore = require('../../../stores/filterParams'),
    FilterActions = require('../../../actions/filterActions'),
    apiUtil = require('../../../util/apiUtil');

var Index = React.createClass({
  contextTypes: {
    bounds:  React.PropTypes.string
  },

  getInitialState: function(){
    return {
      rooms: RoomStore.all(),
      filterParams: {}
    };
  },

  _onRoomChange: function(){
    this.setState({ rooms: RoomStore.all() });
  },

  componentWillMount: function(){
    FilterActions.resetParams();

    var filterParams = FilterParamsStore.getParams();
    filterParams.bounds = JSON.parse(this.context.bounds);

    apiUtil.fetchRoomsWithinParams(filterParams);
  },

  componentDidMount: function(){
    this.setState({rooms: RoomStore.all()});
    this.listenerToker = RoomStore.addListener( this._onRoomChange );
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
