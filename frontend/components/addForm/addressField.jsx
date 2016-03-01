var React = require('react'),
    SearchButtonsOnLanding = require('../landing/landingButtons');

var AutoAddressField = React.createClass({

  componentDidMount: function(){
    this.input = document.getElementById("autocomplete-add");
    var options = ['address'];

    this.autocomplete = new google.maps.places.Autocomplete(
      this.input, {types: options}
    );

    this.addListener()
  },

  addListener: function(e){
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  },

  onPlaceChanged: function(){
    this.props.linkValState("address", this.autocomplete.getPlace().formatted_address);
    this.props.linkValState("lat", this.autocomplete.getPlace().geometry.location.lat());
    this.props.linkValState("lng", this.autocomplete.getPlace().geometry.location.lng());
  },

  preventButton: function(e){
    if (e.key === 'Enter'){
      e.preventDefault();
      e.stopPropagation();
    }
  },

  handleOnChange: function(e){
    this.props.linkValState("address", e.target.value);
  },

  render: function(){

    return (
      <div className="add-form-item-container">
        <label className="add-form-label">Address</label>
        <input id={"autocomplete-add"}
          placeholder="Enter your address"
          type="text"
          className="add-form-input long-input"
          onChange={this.handleOnChange}
          onKeyDown= {this.preventButton}/>
      </div>
    )
  }
})

module.exports = AutoAddressField;
