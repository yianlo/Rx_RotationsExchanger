var React = require('react'),
    TypeSearchCheckbox = require('./typeSearchCheckbox'),
    ROOM_PARAMS = require('../../../constants/roomParams');

var RoomTypeSearch = React.createClass({
  makeCheckboxes: function(){
    return ROOM_PARAMS.ROOM_TYPES.map(function(type, i){
      return <TypeSearchCheckbox key={type + i} value={type} category="room_types"/>
    })
  },

  render: function() {
    return(
      <div className="search-field-container">
        <label className="search-field-label">Room Types</label>
        <div className="search-field" >
          {this.makeCheckboxes()}
          <select className="search-item">
            {
              // { this.makeRoommateNumOptions() }
            }
          </select>
        </div>
      </div>
    )
  }

})

module.exports = RoomTypeSearch;
