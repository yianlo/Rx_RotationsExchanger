var React = require('react');


var MessageList = React.createClass({

  getList: function(){
    // <img src={"https://twitter.com/"+message.username+"/profile_image?size=original"}/>
    return this.props.messages.map(function(message){
      return  (
        <li>
          <b>{message.username} - {message.time}</b>
          <p>{message.text}</p>
        </li>
      )
    });
  },
  render: function() {
      return (
        <ul>
          {this.getList()}
        </ul>
      );
    }
});


module.exports = MessageList;
