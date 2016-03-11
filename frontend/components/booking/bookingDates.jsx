var React = require('react'),
    DatePicker = require('react-datepicker'),
    moment = require('moment');

var BookingDateFields = React.createClass({
  getInitialState: function() {
    return {
      startDate: null,
      endDate: null
    };
  },

  handleCheckIn: function(date) {
    this.setState( {startDate: date} );

    if (this.state.endDate && this.state.endDate < date){
      this.setState( {endDate: date} );
      this.updateDates(date, date);
    } else {
      this.updateDates(date, this.state.endDate);
    }
  },

  handleCheckOut: function(date) {
    this.setState( {endDate: date} );

    if (this.state.startDate instanceof moment && date instanceof moment){
      var dateRange = this.updateDates(this.state.startDate, date);
    }
  },

  updateDates: function(startDate, endDate){
    if (startDate) {
      this.props.linkValState("checkin_date", Math.floor(startDate.unix()));
    }

    if (endDate){
      this.props.linkValState("checkout_date", Math.floor(endDate.unix()));
    }
  },

  render: function() {
    return(
      <div className="edit-calendar-container">
        <div className="edit-calendar">
          <label></label>
          <DatePicker
            selected={this.state.startDate}
            dateFormat="MM/DD/YYYY"
            minDate={moment()}
            maxDate={moment(this.props.maxDate*1000)}
            onChange={this.handleCheckIn}
            placeholderText="Check in" />
          <label></label>
          <DatePicker
            selected={this.state.endDate}
            dateFormat="MM/DD/YYYY"
            minDate={this.state.startDate}
            maxDate={moment(this.props.maxDate*1000)}
            onChange={this.handleCheckOut}
            placeholderText="Check out" />
        </div>
      </div>
    )
  }

})

module.exports = BookingDateFields;
