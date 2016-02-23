var React = require('react'),
    RoomStore = require('../stores/room'),
    MarkerStore = require('../stores/marker'),
    apiUtil = require('../util/apiUtil');

var Map = React.createClass({
  getInitialState: function(){
    return {
      rooms: RoomStore.all(),
      selectedMarker: MarkerStore.getMarker()
    }
  },

  _onRoomChange: function(){
    this.setState( { rooms: RoomStore.all() } )

    this.clearMarkers();
    this.makeMarkers();
  },

  clearMarkers: function() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  },

  makeMarkers: function(room){
    this.markers = [];

    for (var i = 0; i < this.state.rooms.length; i++) {
      var newMarker = this.makeSingleMarker("f76565", this.state.rooms[i].lat, this.state.rooms[i].lng)
      this.markers.push(newMarker)

      this.placeMarkers();
    }
  },

  placeMarkers: function(){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(this.map);
    }
  },

  _onMarkerChange: function(){
    var markerToSelect = MarkerStore.getMarker()
    this.setState( { selectedMarker: markerToSelect } )

    if (markerToSelect) {
      this.selectMarker(markerToSelect);
    } else {
      this.unselectMarker(this.state.selectedMarker)
    }
  },

  initMap: function(){
    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: 37.7433, lng: -122.4347},
      zoom: 12
    });

    this.setMapListener();
  },

  setMapListener(){
    google.maps.event.addListener(this.map, 'idle', function() {
      var northEast = this.map.getBounds().getNorthEast();
      var southWest = this.map.getBounds().getSouthWest();

      var bounds = {
        "northEast": {
          "lat": northEast.lat(),
          "lng": northEast.lng()
        },
        "southWest": {
          "lat": southWest.lat(),
          "lng": southWest.lng()
        }
      };

      apiUtil.fetchRoomsInBounds(bounds);
    }.bind(this));
  },

  componentWillMount: function(){
    this.markers = [];
  },

  componentDidMount: function(){
    this.roomListenerToken = RoomStore.addListener( this._onRoomChange );
    this.markerListenerToken = MarkerStore.addListener( this._onMarkerChange );

    this.initMap();
  },

  componentWillUnmount: function(){
    this.roomListenerToken.remove();
    this.markerListenerToken.remove();
  },

  roundNum: function(num){
    return Math.ceil(num * 10000000) / 10000000;
  },

  selectMarker: function(markerToSelect){
    this.markers.forEach( function(marker, i){
      if (this.roundNum(marker.position.lat()) === this.roundNum(markerToSelect.lat) &&
        this.roundNum(marker.position.lng()) === this.roundNum(markerToSelect.lng)) {

        this.markers.splice(i, 1);
        marker.setMap(null);

        var newMarker = this.makeSingleMarker("5facb5", markerToSelect.lat, markerToSelect.lng)
        this.markers.push(newMarker);
        newMarker.setMap(this.map);
        return;
      }
    }.bind(this))
  },

  unselectMarker: function(markerToUnselect){
    this.markers.forEach( function(marker, i){
      if (this.roundNum(marker.position.lat()) === this.roundNum(markerToUnselect.lat) &&
        this.roundNum(marker.position.lng()) === this.roundNum(markerToUnselect.lng)) {

        this.markers.splice(i, 1);
        marker.setMap(null);

        var newMarker = this.makeSingleMarker("f76565", markerToUnselect.lat, markerToUnselect.lng)
        this.markers.push(newMarker);
        newMarker.setMap(this.map);
        return;
      }
    }.bind(this))
  },

  makeSingleMarker: function(pinColor, lat, lng){
    var pinImage = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34)
    );

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map,
      icon: pinImage
    });

    return marker
  },

  render: function(){
    return (
      <div className="map-container">
        <div id="map" ref="map"></div>
      </div>
    )
  }
})


module.exports = Map;
