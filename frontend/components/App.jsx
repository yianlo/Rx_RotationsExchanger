var React = require('react'),
    NavBar = require('./nav/navBar'),
    SessionStore = require('../stores/session'),
    AuthPage = require('./auth/authPage'),
    Map = require('./searchContent/searchResults/map'),
    FilterActions = require('../actions/filterActions'),
    ApiActions = require('../actions/apiActions');

    apiUtil = require('../util/apiUtil'),
    MapStyle = require('../constants/mapStyle');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  childContextTypes: {
    showMap: React.PropTypes.func,
    hideMap: React.PropTypes.func,
    map: React.PropTypes.object,
    bounds: React.PropTypes.string,
    clearSearch: React.PropTypes.bool,

    toggleLogInPage: React.PropTypes.func,
    toggleSignUpPage: React.PropTypes.func,
    loggedIn: React.PropTypes.bool,
    requireAuth: React.PropTypes.func,
    handleLogOut: React.PropTypes.func,
    handleSignUp: React.PropTypes.func,
    currentUser: React.PropTypes.object,

    onNewForm: React.PropTypes.bool
  },

  getChildContext: function() {
    return {
      showMap: this.showMap,
      hideMap: this.hideMap,
      map: this.map,
      bounds: this.state.bounds,
      clearSearch: this.state.clearSearch,

      toggleLogInPage: this.toggleLogInPage,
      toggleSignUpPage: this.toggleSignUpPage,
      loggedIn: this.state.loggedIn,
      requireAuth: this.requireAuth,
      handleLogOut: this.handleLogOut,
      handleSignUp: this.handleSignUp,
      currentUser: this.state.currentUser,

      onNewForm: false
    };
  },

  getInitialState: function(){
    return {
      loggedIn: SessionStore.getLoggedInStatus(),
      currentUser: SessionStore.getUser(),
      LogInClicked: false,
      SignUpClicked: false,

      bounds: "",
      mapVisibility: "hidden",
      clearSearch: false
    }
  },

  componentWillMount:function(){
    window.addEventListener("keydown", this._listenForEsc, true);
  },

  componentDidMount: function(){
    apiUtil.checkSessionStatus();
    this.setState({
      loggedIn: SessionStore.getLoggedInStatus(),
      currentUser: SessionStore.getUser()
    })
    this.listenerToker = SessionStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
  },

  initMap: function(refMap){
    var styledMap = new google.maps.StyledMapType(MapStyle.styles,
      {name: "Styled Map"}
    );

    var mapOptions = {
        zoom: 12,
        // center: new google.maps.LatLng(37.7833, -122.4167),
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };

    this.map = new google.maps.Map(refMap, mapOptions);
    this.map.mapTypes.set('map_style', styledMap);
    this.map.setMapTypeId('map_style');

    this.setMapListener();
  },

  setMapListener(){
    google.maps.event.addListener(this.map, 'idle', function() {
      if (this.map.getBounds()) {
        var northEast = this.map.getBounds().getNorthEast();
        var southWest = this.map.getBounds().getSouthWest();

        var bounds = {
          "northEast": {
            "lat": northEast.lat(),
            "lng": northEast.lng()
          },
          "southWest": {
            "lat": southWest.lat(),
            "lng": southWest.lng()
          }
        };

        // if (this.state.bounds !== bounds){
        this.setState({bounds: JSON.stringify(bounds)})
        FilterActions.sendParamsToFilter({bounds: bounds});
        // }
      }
    }.bind(this));
  },

  showMap: function(){
    this.setState({
      mapVisibility: "visible",
      clearSearch: false
    })
  },

  hideMap: function(){
    this.setState( {
      mapVisibility: "hidden",
      clearSearch: true
    })
  },

  requireAuth: function(){
    if (!this.state.loggedIn) {
      this.toggleSignUpPage();
      return false
    }

    return true
  },

  toggleLogInPage: function(){
    if (this.state.LogInClicked) {
      this.setState( {LogInClicked: false});
    } else {
      this.setState( {LogInClicked: true});
    }
  },

  toggleSignUpPage: function(){
    if (this.state.SignUpClicked) {
      this.setState( {SignUpClicked: false});
    } else {
      this.setState( {SignUpClicked: true});
    }
  },

  handleLogOut: function(){
    this.setState({
      LogInClicked: false,
      loggedIn: false,
      currentUser: null
    });

    this.context.router.replace('/');
    ApiActions.receiveUserRooms(null);
  },

  handleSignUp: function(){
    this.setState({ loggedIn: true });
    this.setState( {SignUpClicked: false});
  },

  _onChange: function(){
    this.setState({
      loggedIn: SessionStore.getLoggedInStatus(),
      currentUser: SessionStore.getUser()
     })
  },

  getDefaultProps: function() {
    return {
        className: "",
        keyboard: true,
        backdrop: true
    };
  },

  onClose: function(){
    this.setState( {
      LogInClicked: false,
      SignUpClicked: false
    });
  },

  _listenForEsc: function(e){
    if (this.props.keyboard &&
      (event.key === "Escape" ||
       event.keyCode === 27)) {
      e.preventDefault()
      this.onClose();
    }
  },

  renderAuthPage: function(){
    if (!this.state.loggedIn && this.state.LogInClicked) {
      return <AuthPage action="logIn"
                toggleAuthPage={this.toggleLogInPage}
                toggleOtherAuth={this.toggleSignUpPage}/>
    } else if (!this.state.loggedIn && this.state.SignUpClicked) {
      return <AuthPage action="signUp"
                toggleAuthPage={this.toggleSignUpPage}
                toggleOtherAuth={this.toggleLogInPage}/>
    }
  },

  getDateTime: function(){

  },

  renderChildren: function(){
    if (this.map) {
      return this.props.children
    }
  },

  render: function() {
    return (
      <section className="app-container">
        <Map mapVisibility={this.state.mapVisibility}
            initMap={this.initMap}/>
        {this.renderAuthPage()}
        {this.renderChildren()}
      </section>
    )
  }
})

module.exports = App;
