var React = require('react');


var AuthInput = React.createClass({
  render: function(){
    return(
      <div className="auth-input">
        <label></label>
        <input className="search-item"
          type={this.props.label}
          placeholder={this.props.label}/>
      </div>
    )
  }


})

module.exports = AuthInput;
