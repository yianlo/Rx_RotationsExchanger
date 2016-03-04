var React = require('react'),
    DatePicker = require('react-datepicker'),
    moment = require('moment'),
    FilterActions = require('../../actions/filterActions');

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
    }

    if (this.state.endDate instanceof moment && date instanceof moment){
      this.makeDateRange(date, this.state.endDate);
    }
  },

  handleCheckOut: function(date) {
    this.setState( {endDate: date} );

    if (this.state.startDate instanceof moment && date instanceof moment){
      var dateRange = this.makeDateRange(this.state.startDate, date);
      FilterActions.sendParamsToFilter({date_range: dateRange})
    }
  },

  makeDateRange: function(startDate, endDate){
    if (this.props.linkValState) {
      this.props.linkValState("checkin_date", Math.floor(startDate.unix()));
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
            maxDate={this.state.endDate || moment(this.props.maxDate*1000)}
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
