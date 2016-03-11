var React = require('react'),
    HostingsStore = require('../../stores/hostings'),
    HostingItem = require('./hostingItem')
    apiUtil = require('../../util/apiUtil');


var HostingsIndex = React.createClass({

    getInitialState: function(){
      return { hostings: HostingsStore.getHostings() }
    },

    componentWillMount: function(){
      apiUtil.fetchHostingRequests(this.props.userId);
    },

    onHostingsChange: function(){
      this.setState({ hostings: HostingsStore.getHostings() });
    },

    componentDidMount: function(){
      this.setState({ hostings: HostingsStore.getHostings() });
      hostingsListenerToken = HostingsStore.addListener(this.onHostingsChange);
    },

    componentWillUnmount: function(){
      hostingsListenerToken.remove();
    },

    renderHostings: function(){
      return this.state.hostings.map(function(hosting){
        return <HostingItem hosting={hosting}/>
      })
    },

    render: function(){
      return (
        <div className="hostings-index">
          <h2>Your Hosting Requests</h2>
          <div>
            {this.renderHostings()}
          </div>
        </div>
      )
    }
})

module.exports = HostingsIndex;
