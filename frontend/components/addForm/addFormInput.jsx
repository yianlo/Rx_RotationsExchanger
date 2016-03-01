var React = require('react');

var AddFormInput = React.createClass({
  handleOnChange: function(e){
    this.props.linkValState(this.props.label, e.target.value)
  },

  render: function(){
    return(
      <div className="add-form-item-container">
        <label className="add-form-label">{this.props.label}</label>

        <input className={"add-form-input " + (this.props.addClass || "")}
          onChange={this.handleOnChange}
          type="text"></input>
      </div>
    )
  }
})

module.exports = AddFormInput;
