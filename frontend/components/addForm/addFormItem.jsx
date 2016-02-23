var React = require('react');

var AddForm = React.createClass({
  makeChoices: function(){
    return this.props.choices.map( function(choice){
      return(
        <button className="btn btn-large add-form-choice">{choice}</button>
      )
    })
  },
  
  render: function(){
    return(
      <div className="add-form-item">
        <label className="add-form-label">{this.props.label}</label>
        {this.makeChoices()}
      </div>
    )
  }
})

module.exports = AddForm;
