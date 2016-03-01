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
  },

  getInitialState: function(){
    // add calendar and address
    return {
      title: "",
      lat: "",
      lng: "",
      address: "",
      room_type: "",
      home_type: "",
      description: "",
      to_date: "",
      from_date: "",
      price: ""
    }
  },

  getImgUrls: function(imgs){
    var img_urls = imgs.map( function(img){
      return img.url
    })

    this.setState( {img_urls: img_urls} )
  },

  _onChange: function(){
    this.room = RoomStore.find(this.roomId)

    this.setState({
      title: this.room.title,
      room_type: this.room.room_type,
      home_type: this.room.home_type,
      description: this.room.description,
      to_date: this.room.to_date,
      from_date: this.room.from_date,
      price: this.room.price
    });

    this.refs.titleInput.focus();
    this.listenerToken.remove();

    // document.body.scrollTop = document.documentElement.scrollTop = 100;
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
    apiUtil.fetchSingleRoom(this.roomId);

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

    if (newStr[0] === "_") { return newStr.slice(1).replace(/\s+/g, '') }
    return newStr.replace(/\s+/g, '');
  },

  linkValState: function(label, value){
    var stateObj = {},
        state = this._toUnderscore(label);

    stateObj[state] = value;
    this.setState( stateObj );
  },

  handleConfirm: function(){
    apiUtil.updateRoom(this.state, this.roomId, this.redirectOnSuccess)
  },

  redirectOnSuccess: function(){
    this.context.router.replace('/main/' + this.roomId)
  },

  render: function(){
    // <div className="add-form-items-container">
    //   <Cloudinary getImgUrls={this.getImgUrls}/>
    // </div>
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

          <AddressField linkValState={this.linkValState}/>
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
