var React = require('react'),
    AddFormChoices = require('./addFormChoices'),
    AddFormInput = require('./addFormInput'),
    DateFields = require('../searchContent/searchFields/dateFields'),
    Cloudinary = require('../apis/cloudinary/Cloud'),
    apiUtil = require('../../util/apiUtil'),
    ErrorStore = require('../../stores/error'),
    ErrorMessage = require('../auth/errorMessage'),
    AddressField = require('./addressField'),
    AutocompleteSearch = require('../apis/autocomplete'),
    ROOM_PARAMS = require('../../constants/roomParams');

var NavBar = require('../nav/navBar');

var AddForm = React.createClass({
  getInitialState: function(){
    return ({
      title: null,
      description: null,
      address: "",
      lat: null,
      lng: null,
      price: null,
      from_date: [],
      to_date: [],
      home_type: null,
      room_type: null,
      img_urls: null,

      errors: ErrorStore.getRoomErrors()
    })
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    requireAuth: React.PropTypes.func
  },

  redirectOnSuccess: function(id){
    this.context.router.replace('/main/' + id)
  },

  _onChange: function(){
    this.setState({ errors: ErrorStore.getRoomErrors() })
  },

  componentDidMount: function(){
    this.listenerToker = ErrorStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.listenerToker.remove();
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

  getImgUrls: function(imgs){
    var img_urls = imgs.map( function(img){
      return img.url
    })

    this.setState( {img_urls: img_urls} )
  },

  handleDescriptionChange: function(e){
    this.linkValState("Description", e.target.value);
  },

  geocodeAddress: function(callback){
    var geocoder = new google.maps.Geocoder();
    var sendApiRequest = callback;

    geocoder.geocode({address: this.state.address }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        sendApiRequest(results[0].geometry.location);
      } else {
        this.setState({ errors: ["Invalid address."] })
      }
    }.bind(this));
  },

  sendApiRequest: function(location){
    var roomParams = {}
    Object.keys(this.state).forEach(function(key){
      roomParams[key] = this.state[key];
    }.bind(this))

    roomParams.from_date = JSON.stringify(roomParams.from_date);
    roomParams.to_date = JSON.stringify(roomParams.to_date);

    if (!this.state.lat) { roomParams.lat = location.lat() }
    if (!this.state.lng) { roomParams.lng = location.lng() }

    apiUtil.createNewRoom(roomParams, this.redirectOnSuccess);
  },

  handleSubmit: function(e){
    e.preventDefault();

    if (this.context.requireAuth()){
      this.geocodeAddress(this.sendApiRequest);
    }

    document.body.scrollTop = document.documentElement.scrollTop = 40;
  },

  renderError: function(){
    if (this.state.errors.length > 0){
      return <ErrorMessage errors={this.state.errors} classname="add-form-errors"/>
    }
  },

  getSearchLabel: function(){
    return (<label className="add-form-label">Address</label>)
  },

  render: function(){
    var detailsPlaceholder =
      "Tell other students what you love about the space. " +
      "You can include details about the decor, " +
      "the ameities it includes, the neighborhood and the school you go to."

    var priceLabel =
        <div className="price-label">
          <p>"Price"</p>
          <div className="dollar-sign">$</div>
        </div>

    return(
      <div className="add-form-container">
        { this.renderError() }

        <form className="add-form">

          <div className="add-form-items-container">
            <AddFormInput label="Title"
              linkValState={this.linkValState}/>
            <Cloudinary getImgUrls={this.getImgUrls}/>
          </div>

          <div className="add-form-items-container">
            <AddFormChoices
              label="Home Type"
              linkValState={this.linkValState}
              choices={ROOM_PARAMS.HOME_TYPES}
              selected={this.state.home_type}/>
            <AddFormChoices label="Room Type"
              label="Room Type"
              linkValState={this.linkValState}
              choices={ROOM_PARAMS.ROOM_TYPES}
              selected={this.state.room_type}/>
          </div>

          <AddressField linkValState={this.linkValState}/>

          <div className="add-form-items-container">
            <DateFields
              label="Availability"
              names={["From date", "To date"]}
              containerClass="add-form-item-container"
              labelClass="add-form-label"
              inputClass="add-form-date"
              linkValState={this.linkValState}/>
            <AddFormInput label="Price"
              linkValState={this.linkValState}
              addClass="short-input"/>
          </div>

          <div className="add-form-item-container">
            <label className="add-form-label">Description</label>
            <textarea rows="6" cols="108"
              className="add-form-textarea"
              onChange={this.handleDescriptionChange}
              placeholder={detailsPlaceholder}></textarea>
          </div>

          <div className="add-form-item-container add-form-button-container">
            <button className="add-form-button"
              type="submit"
              onClick={this.handleSubmit}>List Space</button>
          </div>

        </form>
      </div>
    )
  }
});

module.exports = AddForm;
