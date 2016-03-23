var React = require('react'),
    RequestStore = require('../../stores/request'),
    TripsIndex = require('./tripsIndex');

var TripsPage = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      pastTrips: RequestStore.getPastTrips(),
      currentTrips: RequestStore.getCurrentTrips(),
      upcomingTrips: RequestStore.getUpcomingTrips()
    };
  },

  _onChange: function(){
    this.setState({
      pastTrips: RequestStore.getPastTrips(),
      currentTrips: RequestStore.getCurrentTrips(),
      upcomingTrips: RequestStore.getUpcomingTrips()
    });
  },

  componentWillMount: function(){
    this.userId = parseInt(this.props.params.userId);

    apiUtil.fetchRequestsByUser(this.userId);
    this.setState({
      pastTrips: RequestStore.getPastTrips(),
      currentTrips: RequestStore.getCurrentTrips(),
      upcomingTrips: RequestStore.getUpcomingTrips()
    });
  },

  componentWillReceiveProps: function(newProp){
    debugger
  },

  componentDidMount: function(){
    this.setState({
      pastTrips: RequestStore.getPastTrips(),
      currentTrips: RequestStore.getCurrentTrips(),
      upcomingTrips: RequestStore.getUpcomingTrips()
    });

    this.requestsListener = RequestStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.requestsListener.remove();
  },

  handleExplore: function(){
    this.context.router.replace("/main/search")
  },

  renderTrips: function(trips){
    if (trips.length > 0) {
      return <TripsIndex trips={trips}/>
    } else {
      return <p className="no-trip-message">
        No trips scheduled. Start&nbsp;
        <span className="explore" onClick={this.handleExplore}>exploring</span>&nbsp;now!
      </p>
    }
  },

  render: function(){
    return(
      <div className="trips-page">
        <h1>Current Trips</h1>
        {this.renderTrips(this.state.currentTrips)}

        <h1>Upcoming Trips</h1>
        {this.renderTrips(this.state.upcomingTrips)}

        <h1>Past Trips</h1>
        {this.renderTrips(this.state.pastTrips)}
      </div>
    )
  }
})

module.exports = TripsPage;
