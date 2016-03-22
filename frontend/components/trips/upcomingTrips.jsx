var React = require('react'),
    RequestStore = require('../../stores/request'),
    TripsIndex = require('./tripsIndex');

var UpcomingTrips = React.createClass({
  getInitialState: function(){
    return {upcomingTrips: RequestStore.getUpcomingTrips()};
  },

  _onChange: function(){
    this.setState({upcomingTrips: RequestStore.getUpcomingTrips()});
  },

  componentWillMount: function(){
    this.userId = parseInt(this.props.params.userId);

    apiUtil.fetchPastRequestsByUser(this.userId);
    this.setState({upcomingTrips: RequestStore.getUpcomingTrips()});
  },

  componentWillReceiveProps: function(newProp){
    debugger
  },

  componentDidMount: function(){
    this.setState({upcomingTrips: RequestStore.getUpcomingTrips()});
    this.requestsListener = RequestStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.requestsListener.remove();
  },

  renderUpcomingTrips: function(){
    if (this.state.upcomingTrips.length > 0) {
      return <TripsIndex trips={this.state.upcomingTrips}/>
    }
  },

  render: function(){
    return(
      <div className="past-trips">
        <h1>Past Trips</h1>
        {this.renderUpcomingTrips()}
      </div>
    )
  }
})

module.exports = UpcomingTrips;
