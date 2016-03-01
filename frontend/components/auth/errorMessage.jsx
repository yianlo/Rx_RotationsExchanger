var React = require('react');


var ErrorMessage = React.createClass({
  makeErrorsList: function(){
    return this.props.errors.map( function(error){
      return <li className="error-message">{error}</li>
    } )
  },

  makeTitle: function(){
    if (this.props.classname === "add-form-errors") {
      return <h2 className="error-message errors-title">Oops! Please try again</h2>
    }
  },

  render: function(){
    return(
      <section className={this.props.classname + "-container"}>
        <p className="alert-symbol">{"\u26A0"}</p>
        <div className="error-messages">
          {this.makeTitle()}
          {this.makeErrorsList()}
        </div>
      </section>
    )
  }
})

module.exports = ErrorMessage;
