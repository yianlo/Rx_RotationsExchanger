var React = require('react'),
    // HostingsIndex = require('./hostingsIndex'),
    // TripsIndex = require('./tripsIndex'),
    // ListingsIndex = require('./listingsIndex'),
    BookingsIndex = require('./bookingsIndex'),

    HostingsStore = require('../../stores/hostings'),
    apiUtil = require('../../util/apiUtil');
    //
    // <TripsIndex/>
    // <ListingsIndex/>
var HostingReqsPage = React.createClass({

  getInitialState: function(){
    return {
      approved: HostingsStore.getApproved(),
      denied: HostingsStore.getDenied(),
      pending: HostingsStore.getPending()
    };
  },

  _onChange: function(){
    this.setState({
      approved: HostingsStore.getApproved(),
      denied: HostingsStore.getDenied(),
      pending: HostingsStore.getPending()
    });
  },

  componentWillMount: function(){
    this.userId = parseInt(this.props.params.userId)

    apiUtil.fetchHostingRequests(this.userId);
    this.setState({
      approved: HostingsStore.getApproved(),
      denied: HostingsStore.getDenied(),
      pending: HostingsStore.getPending()
    });
  },

  componentDidMount: function(){
    this.setState({
      approved: HostingsStore.getApproved(),
      denied: HostingsStore.getDenied(),
      pending: HostingsStore.getPending()
    });

    this.hostingsListener = HostingsStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.hostingsListener.remove();
  },

  renderHostingReqs: function(hostingReqs, group){
    if (hostingReqs.length > 0) {
      return <BookingsIndex group={group} bookings={hostingReqs}/>
    } else if (group === "pending") {
      return <p className="none-message">You have no new guest requests at this time.</p>
    } else {
      return <p className="none-message">You have no&nbsp;{group}&nbsp;requests at this time.</p>
    }
  },

  render: function(){
    return (
      <div className="hosting-reqs-page">
        <h1>Pending Requests</h1>
        {this.renderHostingReqs(this.state.pending, "pending")}

        <h1>Approved Requests</h1>
        {this.renderHostingReqs(this.state.approved, "approved")}

        <h1>Denied Requests</h1>
        {this.renderHostingReqs(this.state.denied, "denied")}
      </div>
    )
  }
})

module.exports = HostingReqsPage;
