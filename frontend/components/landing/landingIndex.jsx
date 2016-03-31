var React = require('react');
    RoomStore = require('../../stores/room'),
    IndexItem = require('../searchContent/searchResults/indexItem');
    // Items = require('../bookingReqs/bookingItem');

var LandingIndex = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function(){
  },

  getInitialState: function(){
    return {rooms: RoomStore.all()};
  },

  _onRoomChange: function(){
    this.setState({ rooms: RoomStore.all() });
  },

  componentWillMount: function(){
    apiUtil.fetchFirstRooms();
  },

  componentDidMount: function(){
    this.setState({rooms: RoomStore.all()});
    this.listenerToker = RoomStore.addListener( this._onRoomChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
  },

  handleHover: function(e){
    e.preventDefault();

    topPush = this.refs.landingIndex.offsetTop;
    $("body").animate({ scrollTop: topPush}, "300");
  },

  handleClick: function(){
    this.context.router.replace('main/search');
  },

  renderItems: function(){
    return this.state.rooms.slice(0, 3).map( function(room, idx){
      return(
        <IndexItem key={room.id} room={room} />
      )
    }.bind(this) );
  },

  render: function() {
    return (
      <div className="landing-index" ref="landingIndex" onMouseEnter={this.handleHover}>
        <div className="scroll-down">
          <h1>Explore</h1>
          <div className="index-items-container">
            {this.renderItems()}
          </div>
          <button onClick={this.handleClick}>See More Destinations</button>

          <hr></hr>
          <div className="my-info">
            <div className="github-logo my-link">
              <p>GitHub</p>
            </div>
            <div className="my-link">
              <p>LinkedIn</p>
            </div>
            <div className="my-link">
              <p>Resume</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
})

module.exports = LandingIndex;
