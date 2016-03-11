var React = require('react'),
    BookingDateFields = require('./bookingDates'),
    BookingPrice = require('./bookingPrice'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');
    apiUtil = require('../../util/apiUtil');

    // BookingDates = require('./dateRangeFields'),

var BookingForm = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    requireAuth: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      checkout_date: null,
      checkin_date: null,
      message: ""
    }
  },
  //
  // sendRequest: function(){
  //   this.setState({reqSentMessage:
  //     "Your booking was successfully sent! " +
  //     "Check your messages for when the host responds."
  //   })
  // },

  // handleSubmit: function(e){
  //   e.preventDefault();
  //
  //   if (this.context.requireAuth()){
  //     this.sendRequest()
  //   }
  // },

  linkValState: function(state, value){
    var stateObj = {};

    stateObj[state] = value;
    this.setState( stateObj );
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

  getNightCount: function(){
    if (this.state.checkout_date === this.state.checkin_date){
      return 1
    }

    var millisecondCounts = this.state.checkout_date - this.state.checkin_date;
    return Math.ceil(millisecondCounts/86400);
  },

  renderPrice: function(){
    if (this.state.checkin_date && this.state.checkout_date) {
      return (
        <BookingPrice price={this.props.room.price} nightCount={this.getNightCount()}/>
      )
    }
  },

  redirectOnSuccess: function(){
    this.context.router.replace('/main/' + this.props.room.id);
  },

  handleRequest: function(e){
    e.preventDefault();
    var request = {};

    Object.keys(this.state).forEach(function(key){
      request[key] = this.state[key];
    }.bind(this))

    request["room_id"] = this.props.room.id;

    apiUtil.createRequest(request, this.redirectOnSuccess)
  },

  render: function(){
    return(
      <div className="req-form-container">
        {this.renderReqMessage()}
        <div className="price-display">
          <p className="room-price">{"$" + this.props.room.price}</p>
          <p>Per Night</p>
        </div>

        <form className="req-form">

          <BookingDateFields
            minDate={this.props.room.from_date}
            maxDate={this.props.room.to_date}
            checkinDate={this.state.checkinDate}
            checkoutDate={this.state.checkoutDate}
            linkValState={this.linkValState}/>

          {this.renderPrice()}

          <textarea
            className="reqBookMessage"
            placeholder="Tell the host a bit about yourself"
            valueLink={this.linkState('message')}>
          </textarea>
          <button onClick={this.handleRequest}>Request to Book</button>
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
