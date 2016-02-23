var React = require('react'),
    SearchTypeCheckbox = require('./searchTypeCheckbox');

var SearchHouseType = React.createClass({

  render: function() {
    return(
      <div className="search-field-container">
        <label className="search-field-label">House Types</label>
        <div className="search-field" >
          <SearchTypeCheckbox label="House" />
          <SearchTypeCheckbox label="Apt/ Condo" />
          <SearchTypeCheckbox label="Studio" />
        </div>
      </div>
    )
  }

})

module.exports = SearchHouseType;
