var React = require('react'),
    RequestStore = require('../../stores/request'),
    TripsIndex = require('./tripsIndex');

var PastTrips = React.createClass({
  getInitialState: function(){
    return {pastTrips: RequestStore.getPastTrips()};
  },

  _onChange: function(){
    this.setState({pastTrips: RequestStore.getPastTrips()});
  },

  componentWillMount: function(){
    this.userId = parseInt(this.props.params.userId);

    apiUtil.fetchPastRequestsByUser(this.userId);
    this.setState({pastTrips: RequestStore.getPastTrips()});
  },

  componentWillReceiveProps: function(newProp){
    debugger
  },

  componentDidMount: function(){
    this.setState({pastTrips: RequestStore.getPastTrips()});
    this.requestsListener = RequestStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.requestsListener.remove();
  },

  renderPastTrips: function(){
    if (this.state.pastTrips.length > 0) {
      return <TripsIndex trips={this.state.pastTrips}/>
    }
  },

  render: function(){
    return(
      <div className="past-trips">
        <h1>Past Trips</h1>
        {this.renderPastTrips()}
      </div>
    )
  }
})

module.exports = PastTrips;
