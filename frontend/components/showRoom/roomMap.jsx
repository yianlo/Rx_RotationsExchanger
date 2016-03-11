var React = require('react'),
    RoomStore = require('../../../stores/room');
    // FilterActions = require('../../../actions/filterActions');

var RoomMap = React.createClass({

  


  render: function(){
    return (
      <div className="map-container">
        <div id="roomMap" ref="roomMap" ></div>
      </div>
    )
  }
})

module.exports = RoomMap;
