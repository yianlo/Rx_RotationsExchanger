var React = require('react'),
    BookingDateFields = require('./bookingDates'),
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
      price: null
    }
  },

  componentDidMount: function(){
    // var $reqForm = $('.price-display'),
    // elTop = $reqForm.offset().top;
    //
    // $(window).scroll(function() {
    //   $('.req-form-container').toggleClass('sticky', $(this).scrollTop() > (elTop + 50));
    // });
  },

  linkValState: function(state, value){
    var stateObj = {};

    stateObj[state] = value;
    this.setState( stateObj );
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
      var nightCount = this.getNightCount();
      this.totalPrice = this.props.room.price * nightCount

      return(
        <div className="req-form-price">
          <p>{"$" + this.props.room.price + " x " + nightCount + " nights"}</p>
          <p>{"Total: $" + this.totalPrice}</p>
        </div>
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
    request["price"] = this.totalPrice;

    apiUtil.createRequest(request, this.redirectOnSuccess)
  },

  render: function(){
    return(
      <div className="req-form-container">
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
          <button onClick={this.handleRequest}>Confirm Booking</button>
        </form>
      </div>
    )
  }
});


module.exports = BookingForm;
