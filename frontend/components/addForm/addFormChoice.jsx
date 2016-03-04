var React = require('react');

var AddFormChoice = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.setChoice(this.props.choice);
  },

  getClassName: function(){
    if (this.props.selectedChoice === this.props.choice) {
      return "add-form-choice selected-choice";
    } else {
      return "add-form-choice unselected-choice";
    }
  },

  render: function(){
    return(
      <button
        className={this.getClassName()}
        onClick={this.handleClick}>
        {this.props.choice}
      </button>
    )
  }
})

module.exports = AddFormChoice;
