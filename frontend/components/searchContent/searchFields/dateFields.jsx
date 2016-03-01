var React = require('react'),

    DatePicker = require('react-datepicker'),
    moment = require('moment'),
    FilterActions = require('../../../actions/filterActions');

var dateFields = React.createClass({
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
      this.props.linkValState("fromDate", dateRange.from_date);
      this.props.linkValState("toDate", dateRange.to_date);
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
      <div className={this.props.containerClass}>
        <label className={this.props.labelClass}>{this.props.label}</label>
        <div className={this.props.inputClass}>
          <label for={this.props.names[0]}></label>
          <DatePicker
            name={this.props.names[0]}
            selected={this.state.startDate}
            dateFormat="MM/DD/YYYY"
            minDate={moment()}
            onChange={this.handleCheckIn}
            placeholderText={this.props.names[0]} />
          <label for={this.props.names[1]}></label>
          <DatePicker
            name={this.props.names[1]}
            selected={this.state.endDate}
            dateFormat="MM/DD/YYYY"
            minDate={this.state.startDate || moment()}
            onChange={this.handleCheckOut}
            placeholderText={this.props.names[1]} />
          {this.renderExtra()}
        </div>
      </div>
    )
  }

})

module.exports = dateFields;
