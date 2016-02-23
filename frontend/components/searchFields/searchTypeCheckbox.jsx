var React = require('react');

var SearchTypeCheckbox = React.createClass({

  render: function() {
    return(
      <div className="search-type-field  search-item">
        <label>{this.props.label}</label>
        <input className="search-type-checkbox" type="checkbox"/>
      </div>
    )
  }

})

module.exports = SearchTypeCheckbox;
