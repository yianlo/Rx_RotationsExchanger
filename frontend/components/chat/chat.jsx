var React = require('react'),
    WelcomeView = require('./welcomeView'),
    SessionStore = require('../../stores/session'),
    apiUtil = require('../../util/apiUtil'),
    MainView = require('./mainView');

var Chat = React.createClass({

  getInitialState: function() {
    return {
      user: SessionStore.getUser()
    };
  },

  _onChange: function(){
    this.setState( { user:  SessionStore.getUser() } )
  },

  componentWillMount: function(){
    apiUtil.checkSessionStatus();
  },

  componentDidMount: function(){
    this.setState({user:  SessionStore.getUser()})
    this.listenerToker = SessionStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
  },

  componentWillReceiveProps: function(){
    this.setState({user: SessionStore.getUser()})
  },

  _onName: function(e){
    if (e.nativeEvent.keyCode != 13) return;
    var user = e.target.value;
    this.setState({user: user});
  },

  render: function() {
    return (
      <div className="chat">
        <WelcomeView user={this.state.user} _onName={this._onName} />
        <MainView user={this.state.user} />
      </div>
    );
  }
});


module.exports = Chat;
