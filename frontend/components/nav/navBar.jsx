var React = require('react'),
    NavBarItem = require('./navBarItem'),
    Listings = require('./listings'),
    // Trips = require('./requests'),
    AutocompleteSearch = require('../apis/autocomplete'),
    Logo = require('./logo'),
    apiUtil = require('../../util/apiUtil'),
    SessionStore = require('../../stores/session');


var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    isLanding: React.PropTypes.bool,
    toggleLogInPage: React.PropTypes.func,
    toggleSignUpPage: React.PropTypes.func,
    handleLogOut: React.PropTypes.func,
    loggedIn: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
  },

  redirectToTrips: function(){
    this.context.router.replace('/main/' + this.context.currentUser.id + '/trips');
  },

  redirectToHostings: function(){
    this.context.router.replace('/main/' + this.context.currentUser.id + '/hostings');
  },

  renderAuthLinks: function(){
    if (this.context.loggedIn && this.context.currentUser) {
      return (
        <div>
          <Listings />
          <NavBarItem text="Trips"
            onClickFun={this.redirectToTrips}/>
          <NavBarItem text="Requests"
            onClickFun={this.redirectToHostings}/>
          <NavBarItem text="Log out"
            onClickFun={apiUtil.deleteSession.bind(null, this.context.handleLogOut)}/>
        </div>
      )
    } else {
      return (
        <div>
          <NavBarItem text="Sign Up"
            onClickFun={this.context.toggleSignUpPage}/>
          <NavBarItem text="Log In"
            onClickFun={this.context.toggleLogInPage}/>
        </div>
      )
    }
  },

  getSearchSymbol: function(){
    return <img className="search-symbol"
      src="https://res.cloudinary.com/dcnac6iuq/image/fetch/http://www2.psd100.com/ppp/2013/11/2701/search-1127191700.png">
    </img>
  },

  renderAutocompleteSearch: function(){
    if (!this.props.isLanding) {
      return(
        <AutocompleteSearch
          id={"autocomplete-nav"}
          placeholder="Which medical school or city are you going to?"
          classname="search-bar"
          container="search-bar-container"
          label={this.getSearchSymbol()}
        />
      )
    }
  },

  render: function() {
    var landingClass = this.props.isLanding ? "nav-on-landing" : "nav-bar";

    return (
      <div className={landingClass}>
        <div className="logo-search-container">
          <Logo />

          {this.renderAutocompleteSearch()}

        </div>

        <div>
          <NavBarItem text="Host A Room"
            newClass="host-room-button"
            onClickFun={this.context.router.replace.bind(null, 'main/new')}/>
          {this.renderAuthLinks()}
        </div>
      </div>
    );
  }
})

module.exports = NavBar;
