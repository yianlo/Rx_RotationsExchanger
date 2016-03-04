var React = require('react'),
    DatePicker = require('react-datepicker'),
    moment = require('moment'),
    FilterActions = require('../../actions/filterActions');

var EditDateFields = React.createClass({
  getInitialState: function() {
    return {
      startDate: null,
      endDate: null
    };
  },

  handleCheckIn: function(date) {
    this.setState( {startDate: date} );
    this.makeDateRange(date, this.state.endDate);

    if (this.state.endDate && this.state.endDate < date){
      this.setState( {endDate: date} );
    }
  },

  handleCheckOut: function(date) {
    this.setState( {endDate: date} );
    this.makeDateRange(this.state.startDate, date);
  },

  makeDateRange: function(startDate, endDate){
    if (startDate) {
      this.props.linkValState("from_date", Math.floor(startDate.unix()));
    } else if (endDate){
      this.props.linkValState("to_date", Math.floor(endDate.unix()));
    }
  },

  makeGuestNumOptions: function(){
    var i = 2,
        guestNumOptions = [<option value={i}>{"1 Guest"}</option>];


    while (i < 16) {
      guestNumOptions.push(<option key={i} value={i}>{i + " Guests"}</option>)
      i++;
    }

    guestNumOptions.push(<option value={i}>{"16+ Guests"}</option>)
    return guestNumOptions;
  },

  render: function() {
    return(
      <div className="edit-calendar-container">
        <label className="add-form-label">Availability</label>
        <div className="edit-calendar">
          <label></label>
          <DatePicker
            selected={this.state.startDate || moment(this.props.startDate*1000)}
            dateFormat="MM/DD/YYYY"
            minDate={moment()}
            onChange={this.handleCheckIn}
            placeholderText="From date" />
          <label></label>
          <DatePicker
            selected={this.state.endDate || moment(this.props.endDate*1000)}
            dateFormat="MM/DD/YYYY"
            minDate={this.state.startDate || moment()}
            onChange={this.handleCheckOut}
            placeholderText="To date" />
        </div>
      </div>
    )
  }

})

module.exports = EditDateFields;
