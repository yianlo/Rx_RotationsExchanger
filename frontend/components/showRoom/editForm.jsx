var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    apiUtil = require('../../util/apiUtil'),
    RoomStore = require('../../stores/room'),
    AddressField = require('../addForm/addressField'),
    DateFields = require('../searchContent/searchFields/dateFields'),
    EditDateFields = require('./editDates'),
    ROOM_PARAMS = require('../../constants/roomParams'),
    Cloudinary = require('../apis/cloudinary/Cloud'),
    AddFormInput = require('../addForm/addFormInput');

var EditForm = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    room: React.PropTypes.object,
    roomId: React.PropTypes.number,
  },

  getInitialState: function(){
    return {
      address: "",
      title: this.context.room.title,
      room_type: this.context.room.room_type,
      home_type: this.context.room.home_type,
      description: this.context.room.description,
      lat: this.context.room.lat,
      lng: this.context.room.lng,
      to_date: this.context.room.to_date,
      from_date: this.context.room.from_date,
      price: this.context.room.price
    };

    this.getAddress(this.context.room.lat, this.context.room.lng);
  },



  getImgUrls: function(imgs){
    var img_urls = imgs.map( function(img){
      return img.url;
    })

    this.setState( {img_urls: img_urls} );
  },

  getAddress: function(lat, lng){
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat, lng};

    geocoder.geocode({'location': latlng}, function(result, status){
      if (status === google.maps.GeocoderStatus.OK) {
        this.setState({address: result[0].formatted_address})
      }
    }.bind(this));
  },

  componentDidMount: function(){
    this.roomId = parseInt(this.props.params.roomId);
    this.refs.titleInput.focus();
  },

  componentWillReceiveProps: function(newProp){
    this.roomId = parseInt(newProp.params.roomId);
  },

  getHomeTypes: function(){
    return ROOM_PARAMS.HOME_TYPES.map(function(type){
      return <option>{type}</option>
    })
  },

  getRoomTypes: function(){
    return ROOM_PARAMS.ROOM_TYPES.map(function(type){
      return <option>{type}</option>
    })
  },

  _toUnderscore: function(str){
    var newStr = str.replace(/([A-Z])/g, function($1){
      return "_"+$1.toLowerCase();
    });

    if (newStr[0] === "_") { return newStr.slice(1).replace(/\s+/g, ''); }
    return newStr.replace(/\s+/g, '');
  },

  linkValState: function(label, value){
    var stateObj = {},
        state = this._toUnderscore(label);

    stateObj[state] = value;
    this.setState( stateObj );
  },

  handleConfirm: function(){
    apiUtil.updateRoom(this.state, this.roomId, this.redirectOnSuccess);
  },

  redirectOnSuccess: function(){
    this.context.router.replace('/main/' + this.roomId);
  },

  render: function(){
    return(
      <section className="text-content edit-form-container">
        <section className="header">
          <input className="edit-title"
            ref="titleInput"
            valueLink={this.linkState('title')}/>

          <div className="select-style room-type">
            <select className="edit-type" valueLink={this.linkState('room_type')}>
              {this.getRoomTypes()}
            </select>
          </div>

          <span> IN </span>

          <div className="select-style home-type">
            <select className="edit-type" valueLink={this.linkState('home_type')}>
              {this.getHomeTypes()}
            </select>
          </div>
        </section>

        <section className="edit-details">
          <h3>About this listing</h3>

          <AddressField address={this.state.address}
            linkValState={this.linkValState}/>
          <div className="items-container">
            <EditDateFields
              startDate={this.state.from_date}
              endDate={this.state.to_date}
              linkValState={this.linkValState}/>
            <div>
            <label className="add-form-label">Price</label>
            <input className="add-form-input short-input"
              valueLink={this.linkState('price')}></input>
            </div>
          </div>


          <div className="items-container">
            <label className="add-form-label">Description</label>
            <textarea rows="6"
              className="description-box"
              valueLink={this.linkState('description')}/>
          </div>
        </section>

        <div className="show-buttons-container">
          <button className="delete-button"
            onClick={this.handleConfirm}>
            Confirm Edit
          </button>
        </div>
      </section>
    )
  }
})

module.exports = EditForm;
