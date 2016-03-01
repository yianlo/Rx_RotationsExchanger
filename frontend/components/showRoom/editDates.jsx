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

    if (this.state.endDate && this.state.endDate < date){
      this.setState( {endDate: date} );
    }
  },

  handleCheckOut: function(date) {
    this.setState( {endDate: date} );

    if (this.state.startDate instanceof moment && date instanceof moment){
      var dateRange = this.makeDateRange(date);
      FilterActions.sendParamsToFilter({date_range: dateRange})
    }
  },

  makeDateRange: function(endDate){
    var dateRange = {
      from_date: [
        this.state.startDate.year(),
        this.state.startDate.month() + 1,
        this.state.startDate.date()],
      to_date: [
        endDate.year(),
        endDate.month() + 1,
        endDate.date()],
    };

    if (this.props.linkValState) {
      this.props.linkValState("fromDate", JSON.stringify(dateRange.from_date) );
      this.props.linkValState("toDate", JSON.stringify(dateRange.to_date) );
    }

    return dateRange;
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

  renderExtra: function(){
    if (this.props.inputClass === "search-field") {
      return <select className="search-item">
        {
          // { this.makeGuestNumOptions() }
        }
      </select>
    }
  },

  render: function() {
    return(
      <div className="edit-calendar-container">
        <label className="add-form-label">Availability</label>
        <div className="edit-calendar">
          <label></label>
          <DatePicker
            selected={this.state.startDate || moment(this.props.startDate)}
            dateFormat="MM/DD/YYYY"
            minDate={moment()}
            onChange={this.handleCheckIn}
            placeholderText="From date" />
          <label></label>
          <DatePicker
            selected={this.state.endDate || moment(this.props.endDate)}
            dateFormat="MM/DD/YYYY"
            minDate={this.state.startDate || moment()}
            onChange={this.handleCheckOut}
            placeholderText="To date" />
          {this.renderExtra()}
        </div>
      </div>
    )
  }

})

module.exports = EditDateFields;
