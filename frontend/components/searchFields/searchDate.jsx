var React = require('react');

var SeachDate = React.createClass({
  makeGuestNumOptions: function(){
    var guestNumOptions = [<option value={i}>{"1 Guest"}</option>];
    var i = 2;

    while (i < 16) {
      guestNumOptions.push(<option key={i} value={i}>{i + " Guests"}</option>)
      i++;
    }

    guestNumOptions.push(<option value={i}>{"16+ Guests"}</option>)
    return guestNumOptions;
  },

  render: function() {
    return(
      <div className="search-field-container">
        <label className="search-field-label">Dates</label>
        <div className="search-field">
          <input className="search-date-field search-item" type="date" placeholder="Check In"/>
          <input className="search-date-field search-item" type="date" placeholder="Check Out"/>
          <select className="search-item">
            { this.makeGuestNumOptions() }
          </select>
        </div>
      </div>
    )
  }

})

module.exports = SeachDate;
