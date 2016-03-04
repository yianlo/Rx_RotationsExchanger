var React = require('react'),
    AddFormChoice = require('./addFormChoice');

var AddFormChoices = React.createClass({

  getInitialState: function(){
    return { selectedChoice: null }
  },

  makeChoices: function(){
    return this.props.choices.map( function(choice){
      return(
        <AddFormChoice
          key={choice}
          setChoice={this.setChoice}
          selectedChoice={this.state.selectedChoice}
          choice={choice}/>
      )
    }.bind(this))
  },

  setChoice: function(choice){
    this.setState( { selectedChoice: choice } );
    this.props.linkValState(this.props.label, choice);
  },
  //
  render: function(){
    return(
      <div className="add-form-item-container">
        <label className="add-form-label">{this.props.label}</label>
        <div className="add-form-choices">
          {this.makeChoices()}
        </div>

        <input value={this.state.selectedChoice}
          type="hidden"/>
      </div>
    )
  }
})

module.exports = AddFormChoices;
