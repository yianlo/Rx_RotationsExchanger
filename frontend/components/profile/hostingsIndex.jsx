var React = require('react'),
    HostingsStore = require('../../stores/hostings'),
    HostingItem = require('./hostingItem')
    apiUtil = require('../../util/apiUtil');


var HostingsIndex = React.createClass({

    renderHostings: function(){
      return this.props.hostingReqs.map(function(hosting){
        return <HostingItem hosting={hosting}/>
      })
    },

    render: function(){
      return (
        <div className="bookings-index">
          {this.renderHostings()}
        </div>
      )
    }
})

module.exports = HostingsIndex;
