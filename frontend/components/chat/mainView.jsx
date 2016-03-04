var React = require('react'),
    apiUtil = require('../../util/apiUtil'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    MessageList = require('./messageList');

var MainView = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      messages: [],
      text: ""
    };
  },

  componentWillMount: function() {
    this.pusher = new Pusher('168f0f98f67a3b21c223');
    this.chatRoom = this.pusher.subscribe('messages');
    //
    // this.channel = pusher.subscribe('private-channel');
    // this.channel.bind('pusher:subscription_succeeded', function() {
    //   var triggered = this.channel.trigger('client-someeventname', { your: data });
    // });
  },

  componentDidMount: function() {
    this.chatRoom.bind('new_message', function(message){
      this.setState({messages: this.state.messages.concat(message)})
    }, this);
  },

  _onMessage: function(e){
    if (e.nativeEvent.keyCode != 13) return;

    // if the text is blank, do nothing
    if (this.state.text === "") return;

    var message = {
      username: this.props.user.email,
      text: this.state.text,
      time: new Date()
    }

    apiUtil.createMessage(message, this.resetInput);

    // $.post('/messages', message).success(function(){
    //   // reset the input
    //   input.value = ""
    // });

  },

  resetInput: function(){
    this.setState({text: ""})
  },

  render: function() {
    if (!this.props.user) var style = {display:'none'}

    return (
      <div style={style} className="main-view">
        <MessageList messages={this.state.messages}  />
        <input placeholder="Type your message"
          onKeyPress={this._onMessage}
          valueLink={this.linkState('text')} />
      </div>
    );
  }

});


module.exports = MainView;
