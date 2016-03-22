var React = require('react'),
    TripItem = require('./tripItem');


var TripsIndex = React.createClass({
  renderItems: function(){
    return this.props.trips.map(function(trip){
      return <TripItem trip={trip}/>
    })
  },

  render: function(){
    return(
      <div className="trips-index">
        {this.renderItems()}
      </div>
    )
  }
})

module.exports = TripsIndex;
