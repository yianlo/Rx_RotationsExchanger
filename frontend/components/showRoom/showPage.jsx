var React = require('react'),
    apiUtil = require('../../util/apiUtil'),
    RoomStore = require('../../stores/room'),
    BookingForm = require('../booking/bookingForm'),
    PhotoView = require('./photoView'),
    EditPhotos = require('./editPhotos')

    IMAGE_URLS = require('../../constants/imageUrls');

var ShowRoom = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object
  },

  childContextTypes: {
    imgUrls: React.PropTypes.array,
    imageUrls: React.PropTypes.array,
    room: React.PropTypes.object,
    roomId: React.PropTypes.number,
    hostId: React.PropTypes.number,
  },

  getChildContext: function() {
    return {
      imgUrls: this.getImgUrlsList(),
      imageUrls: this.getImageUrls(),
      roomId: this.roomId,
      hostId: this.getHostId(),
      room: this.state.room,
    };
  },

  getInitialState: function(){
    return ({
      room: RoomStore.find(this.roomId),
      bookingRequested: false
    })
  },

  _onChange: function(){
    this.setState( {room: RoomStore.find(this.roomId)} );
  },

  componentDidMount: function(){
    this.roomId = parseInt(this.props.params.roomId);
    apiUtil.fetchSingleRoom(this.roomId);

    this.listenerToken = RoomStore.addListener(this._onChange);
  },

  componentWillUnmount: function(){
    this.listenerToken.remove();
  },

  componentWillReceiveProps: function(newProp){
    this.roomId = parseInt(newProp.params.roomId);
    apiUtil.fetchSingleRoom(this.roomId);
  },

  getHostId: function(){
    if (this.state.room) {
      return this.state.room.host_id
    }
  },

  getImageUrls: function(){
    if (this.state.room && this.state.room.images) {
      return this.state.room.images
    }
  },

  getImgUrlsList: function(){
    if (this.state.room) {
      if (this.state.room.images){
        return this.state.room.images.map( function(img, i){
          return <img src={img.url}/>
        })
      } else {
        return [<img src={IMAGE_URLS.NO_IMG}/>]
      }
    }
  },

  getBookingForm: function(){
    if(this.context.currentUser &&
      this.context.currentUser.id !== this.getHostId()){
      return <BookingForm room={this.state.room} />
    } else {
      return <BookingForm room={this.state.room} />
    }
  },

  getDetails: function(){
    if (this.state.room) {
      return (
        <div className="show-page">
          {this.props.children}
          {this.getBookingForm()}
        </div>
      )
    }
  },

  getPhotoView: function(){
    var path = this.props.location.pathname.match(/\d+\/([a-z]+)/);
    if (path && path[1] === "edit"){
      return <EditPhotos imageUrls={this.getImageUrls()}
                room={this.state.room}/>
    } else {
      return <PhotoView imageUrls={this.getImageUrls()}/>
    }
  },

  render: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return (
      <div className="show-page-container">
        {this.getPhotoView()}
        {this.getDetails()}
      </div>
    )
  }
})


module.exports = ShowRoom;
