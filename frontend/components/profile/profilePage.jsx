var React = require('react'),
    HostingsIndex = require('./hostingsIndex'),
    // TripsIndex = require('./tripsIndex'),
    // ListingsIndex = require('./listingsIndex'),
    HostingsStore = require('../../stores/hostings'),
    apiUtil = require('../../util/apiUtil');
    //
    // <TripsIndex/>
    // <ListingsIndex/>
var ProfilePage = React.createClass({

  componentWillMount: function(){
    this.userId = parseInt(this.props.params.userId)
  },

  render: function(){
    return (
      <div className="profile">
        <HostingsIndex userId={this.userId}/>
      </div>
    )
  }
})

module.exports = ProfilePage;
