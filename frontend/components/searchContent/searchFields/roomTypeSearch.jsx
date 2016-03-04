var React = require('react'),
    TypeSearchCheckbox = require('./typeSearchCheckbox'),
    ROOM_PARAMS = require('../../../constants/roomParams');

var RoomTypeSearch = React.createClass({
  makeRoommateNumOptions: function(){
    var roommateNumOptions = [<option value={i}>{"1 Roommate"}</option>];
    var i = 2;

    while (i < 5) {
      roommateNumOptions.push(<option key={i} value={i}>{i + " Roommates"}</option>)
      i++;
    }

    roommateNumOptions.push(<option value={i}>{"5+ Roommates"}</option>)
    return roommateNumOptions;
  },

  makeCheckboxes: function(){
    return ROOM_PARAMS.ROOM_TYPES.map(function(type){
      return <TypeSearchCheckbox value={type} category="room_types"/>
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
