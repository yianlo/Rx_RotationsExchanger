var React = require('react'),
    DatePicker = require('react-datepicker'),
    moment = require('moment');

var BookingDates = React.createClass({
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
  },

  handleCheckOut: function(date) {
    this.setState( {endDate: date} );
  },

  render: function() {
    return(
      <div className="booking-dates-labels">
        <div>
          <label for="Check in"></label>
          <label for="Check out"></label>
        </div>

        <div className="booking-dates-fields">
          <DatePicker
            name="Check in"
            selected={this.props.minDate}
            dateFormat="MM/DD/YYYY"
            minDate={this.props.minDate}
            maxDate={this.props.maxDate} />

          <DatePicker
            name="Check out"
            selected={this.props.maxDate}
            dateFormat="MM/DD/YYYY"

            minDate={this.state.startDate || this.props.minDate}
            maxDate={this.props.maxDate} />
        </div>
      </div>
    )
  }

})

module.exports = BookingDates;
