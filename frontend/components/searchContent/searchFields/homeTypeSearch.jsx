var React = require('react'),
    TypeSearchCheckbox = require('./typeSearchCheckbox'),
    ROOM_PARAMS = require('../../../constants/roomParams');

var HomeTypeSearch = React.createClass({
  makeCheckboxes: function(){
    return ROOM_PARAMS.HOME_TYPES.map( function(type){
      return <TypeSearchCheckbox value={type} category="home_types"/>
    })
  },

  render: function() {
    return(
      <div className="search-field-container">
        <label className="search-field-label">Home Types</label>
        <div className="search-field" >
          {this.makeCheckboxes()}
        </div>
      </div>
    )
  }

})

module.exports = HomeTypeSearch;
