var React = require('react');


var AuthInput = React.createClass({
  render: function(){
    return(
      <div className="auth-input">
        <label for={this.props.label}></label>
        <input className="search-item"
          ref={this.props.label==="Password" ? "pass" : "email"}
          type={this.props.label}
          placeholder={this.props.label}/>
      </div>
    )
  }


})

module.exports = AuthInput;
