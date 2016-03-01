var React = require('react'),

    DatePicker = require('react-datepicker'),
    moment = require('moment');


    // BookingDates = require('./dateRangeFields'),

var BookingForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    requireAuth: React.PropTypes.func
  },

  getInitialState: function(){
    return {reqSentMessage: null}
  },

  sendRequest: function(){
    this.setState({reqSentMessage:
      "Your booking was successfully sent! " +
      "Check your messages for when the host responds."
    })
  },

  handleSubmit: function(e){
    e.preventDefault();

    if (this.context.requireAuth()){
      this.sendRequest()
    }
  },

  renderReqMessage: function(){
    if (this.state.reqSentMessage) {
      return(
        <div className="req-sent-message-container">
          <p>{this.state.reqSentMessage}</p>
        </div>
      )
    }
  },

  render: function(){
    return(
      <div className="req-form-container">
        <div className="req-form-price">
          {this.props.room.price}
        </div>
        {this.renderReqMessage()}
        <form className="req-form">
          <textarea
            className="reqBookMessage"
            placeholder="Tell the host a bit about yourself">
          </textarea>
          <button>Request to Book</button>
        </form>
      </div>
    )
  }
});

// <div className="req-form-container">
//   {this.renderReqMessage()}
//
//   <form className="add-form">
//
//     <div className="add-form-items-container">
//
//     </div>
//
//     <div className="add-form-item-container">
//       <label className="add-form-label"></label>
//       <textarea rows="6" cols="96.5"
//         className="add-form-textarea"
//         placeholder="Tell the host a bit about yourself"></textarea>
//     </div>
//
//     <div className="add-form-item-container add-form-button-container">
//       <button>Request to Book</button>
//     </div>
//   </form>
// </div>


module.exports = BookingForm;
