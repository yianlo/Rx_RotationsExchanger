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

    if (this.state.endDate instanceof moment && date instanceof moment){
      FilterActions.sendParamsToFilter(this.makeDateRange(date, this.state.endDate));
    }
  },

  handleCheckOut: function(date) {
    this.setState( {endDate: date} );

    if (this.state.startDate instanceof moment && date instanceof moment){
      FilterActions.sendParamsToFilter(this.makeDateRange(this.state.startDate, date))
    }
  },

  makeDateRange: function(startDate, endDate){

    var fromDate = Math.floor(this.state.startDate.unix());
    var toDate = Math.floor(endDate.unix());
    //
    // if (this.props.linkValState) {
    //   this.props.linkValState("fromDate", fromDate);
    //   this.props.linkValState("toDate", toDate);
    // }

    return {from_date: fromDate, to_date: toDate};
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
          <label></label>
          <DatePicker
            name={this.props.names[0]}
            selected={this.state.startDate}
            dateFormat="MM/DD/YYYY"
            minDate={moment()}
            onChange={this.handleCheckIn}
            placeholderText={this.props.names[0]} />
          <label></label>
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
