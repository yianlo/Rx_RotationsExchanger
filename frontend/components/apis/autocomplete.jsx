var React = require('react'),
    SearchButtonsOnLanding = require('../landing/landingButtons');

var AutoSearchBox = React.createClass({
  contextTypes: {
    map: React.PropTypes.object,
    router: React.PropTypes.object,
    clearSearch: React.PropTypes.bool
  },

  componentDidMount: function(){
    this.input = document.getElementById(this.props.id);
    var options = ['(cities)'];

    this.searchBox = new google.maps.places.SearchBox(
      this.input, {types: options}
    );

    this.updateMap()
  },

  updateMap: function(){
    if (this.props.id === "autocomplete-nav"){
      this.searchBox.addListener('places_changed', this.onPlaceChanged);
    }
  },

  componentWillUnmount: function(){
    if (this.props.id !== "autocomplete-add") {
      google.maps.event.clearInstanceListeners(this.searchBox);
    }
  },

  waitForMap: function(){
    if (this.context.map) {
      if (this.first) {
        this.context.map.addListener('bounds_changed', this.onBoundsChanged);
        this.first = false;
      }
    } else {
      this.first = true;
    }
  },

  onBoundsChanged: function() {
    this.searchBox.setBounds(this.context.map.getBounds());
  },

  onPlaceChanged: function() {
    var map = this.context.map;
    var bounds = new google.maps.LatLngBounds();
    var places = this.searchBox.getPlaces();

    places.forEach(function(place) {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    this.context.router.replace('main/search')

    // this.context.router.replace('main/search?location=' + JSON.stringify(bounds))
    map.fitBounds(bounds);
  },

  resetSearch: function(){
    if (this.props.id === "autocomplete-nav" && this.context.clearSearch && this.input) {
      this.input.value = "";
    }
  },

  preventButton: function(e){
    if (e.key === 'Enter'){
      e.stopPropagation();
    }
  },

  addButtons(){
    if (this.props.id === "landing-search") {
      return <SearchButtonsOnLanding updateMap={this.onPlaceChanged}/>
    }
  },

  render: function(){

    this.waitForMap();
    this.resetSearch();

    return (
      <div className={this.props.container}>
        {this.props.label}
        <input id={this.props.id}
          placeholder={this.props.placeholder}
          type="text"
          className={this.props.classname}
          onChange= {this.props.handleChange}
          onKeyDown= {this.preventButton}/>

        {this.addButtons()}
      </div>
    )
  }
})

module.exports = AutoSearchBox;
