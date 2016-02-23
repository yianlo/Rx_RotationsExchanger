var React = require('react'),
    SearchTypeCheckbox = require('./searchTypeCheckbox');

var SearchRoomType = React.createClass({
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

  render: function() {
    return(
      <div className="search-field-container">
        <label className="search-field-label">Room Types</label>
        <div className="search-field" >
          <SearchTypeCheckbox label="Private room" />
          <SearchTypeCheckbox label="Shared Room" />
          <select className="search-item">
            { this.makeRoommateNumOptions() }
          </select>
        </div>
      </div>
    )
  }

})

module.exports = SearchRoomType;
