var React = require('react'),
    apiUtil = require('../../util/apiUtil'),
    ErrorStore = require('../../stores/error'),
    ErrorMessage = require('./errorMessage'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
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
  mixins: [LinkedStateMixin],

  contextTypes: {
    handleSignUp: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      errors: "",
      email: "",
      password: ""
    }
  },

  _onChange: function(){
    this.setState({ errors: ErrorStore.getAuthErrors() })
  },

  componentDidMount: function(){
    this.listenerToker = ErrorStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
  },

  handleSubmit: function(e){
    e.preventDefault();

    if (this.props.action === "logIn"){
      apiUtil.fetchNewSession(this.state, this.props.toggleAuthPage);
    } else if (this.props.action === "signUp") {
      apiUtil.createNewUser(this.state, this.context.handleSignUp);
    }
  },

  renderError: function(){
    if (this.state.errors.length > 0){
      this.className = "moving-auth-form"
      return <ErrorMessage errors={this.state.errors} classname="auth-errors"/>
    }
  },

  togglePages: function(){
    this.props.toggleAuthPage();
    setTimeout(this.props.toggleOtherAuth, 15);
  },

  getAdditionalText: function(){
    if (this.props.action === "logIn"){
      this.buttonText = "Log In"
      this.toggleText =
      <p className="auth-additional">
        Don't have an account?&nbsp;
        <a className="toggle-link" onClick={this.togglePages}>Sign Up</a>
      </p>
    } else {
      this.buttonText = "Sign Up"
      this.toggleText =
      <p className="auth-additional">
        Already have an account?&nbsp;
        <a className="toggle-link" onClick={this.togglePages}>Log In</a>
      </p>
    }
  },

  logInGuest: function(e){
    e.preventDefault();
    apiUtil.fetchNewSession({email: "test@gmail.com", password: "password"}, this.props.toggleAuthPage);
  },

  render: function(){
    this.getAdditionalText()

    return(
      <section className="auth-container" >
        { this.renderError() }
        <div className="modal" onClick={this.props.toggleAuthPage}></div>

        <form className={"auth-form " + (this.className || "")} >
          <img className="auth-img"
            src="http://res.cloudinary.com/dcnac6iuq/image/fetch/http://cdn.photoaffections.com/images/icon-profile.png"></img>

          <input className="search-item"
            valueLink={this.linkState('email')}
            type="text"
            placeholder="Email address"/>

          <input className="search-item"
            valueLink={this.linkState('password')}
            type="password"
            placeholder="Password"/>

          <button type="submit" className="auth-button" onClick={this.handleSubmit}>{this.buttonText}</button>
          <button type="submit" className="auth-button" onClick={this.logInGuest}>Explore as Guest</button>

          <hr></hr>
          { this.toggleText }
        </form>
      </section>
    )
  }

})

module.exports = AuthPage;
