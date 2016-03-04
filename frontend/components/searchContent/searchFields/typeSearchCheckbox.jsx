var React = require('react'),
    FilterActions = require('../../../actions/filterActions');

var TypeSearchCheckbox = React.createClass({
  handleClick: function(e){
    FilterActions.sendTypeToFilter({
      typeCategory: this.props.category,
      typeValue: this.props.value,
      checked: e.target.checked
    })
  },

  render: function() {
    return(
      <div className="search-type-field  search-item">
        <label for="filled-in-box">{this.props.value}</label>
        <input className="filled-in"
          type="checkbox"
          id="filled-in-box"
          value={this.props.value}
          onChange={this.handleClick}/>
      </div>
    )
  }

})

module.exports = TypeSearchCheckbox;
