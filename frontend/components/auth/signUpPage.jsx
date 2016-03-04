var React = require('react'),
    apiUtil = require('../../util/apiUtil'),
    ErrorStore = require('../../stores/error'),
    ErrorMessage = require('./errorMessage'),
    AuthInput = require('./authInput');

// var rewire = require("rewire-webpack");
// var cloudinary = rewire('cloudinary');
// //
// cloudinary.config({
//   cloud_name: 'dcnac6iuq',
//   api_key: '362931458836922',
//   api_secret: 'zOqo-vtYTj8Ai0ioETs9cyQ-mnI'
// });


// var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthPage = React.createClass({

  getInitialState: function(){
    return { errors: ErrorStore.getErrors() }
  },

  _onChange: function(){
    this.setState({ errors: ErrorStore.getErrors() })
  },

  componentDidMount: function(){
    this.listenerToker = ErrorStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
  },

  handleSubmit: function(e){
    var userParams = {
      email: e.target[0].value,
      password: e.target[1].value
    };

    this.props.action === "signUp") {
      apiUtil.createNewUser(userParams, this.props.toggleAuthPage)
    }
  },

  renderError: function(){
    if (this.state.errors.length > 0){
      this.className = "moving-auth-form"
      return <ErrorMessage errors={this.state.errors}/>
    }
  },

  togglePages: function(){
    this.props.toggleAuthPage();
    setTimeout(this.props.toggleOtherAuth, 15);
  },

  getAdditionalText: function(){
    this.buttonText = "Sign Up"
    this.toggleText =
    <p className="auth-additional">
      Already have an account?&nbsp;
      <a className="toggle-link" onClick={this.togglePages}>Log In</a>
    </p>
  },

  render: function(){
    this.getAdditionalText()

    return(
      <section className="auth-container" >
        { this.renderError() }
        <div className="modal" onClick={this.props.toggleAuthPage}></div>

        <form className={"auth-form " + (this.className || "")} onSubmit={this.handleSubmit}>
          <img className="auth-img"
            src="http://res.cloudinary.com/dcnac6iuq/image/fetch/http://cdn.photoaffections.com/images/icon-profile.png"></img>

          <AuthInput label="Email Address"/>
          <AuthInput label="Password"/>
          <button type="submit" className="auth-button">{this.buttonText}</button>

          <hr></hr>
          { this.toggleText }
        </form>
      </section>
    )
  }

})

module.exports = AuthPage;
