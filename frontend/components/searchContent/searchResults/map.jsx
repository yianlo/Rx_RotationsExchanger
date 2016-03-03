var React = require('react'),
    RoomStore = require('../../../stores/room'),
    MarkerStore = require('../../../stores/marker');
    // FilterActions = require('../../../actions/filterActions');

var Map = React.createClass({
  contextTypes: {
    map: React.PropTypes.object,
  },

  getInitialState: function(){
    return {
      rooms: RoomStore.all(),
      selectedMarker: MarkerStore.getMarker(),
      height: window.innerHeight - 61
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
      this.markers[i].setMap(this.context.map);
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

  componentWillMount: function(){
    this.markers = [];
  },

  componentDidMount: function(){
    this.roomListenerToken = RoomStore.addListener( this._onRoomChange );
    this.markerListenerToken = MarkerStore.addListener( this._onMarkerChange );
    window.addEventListener('resize', this.handleResize);

    this.props.initMap(this.refs.map);
  },

  componentWillReceiveProps: function(){

  },

  componentWillUnmount: function(){
    this.roomListenerToken.remove();
    this.markerListenerToken.remove();
  },

  roundNum: function(num){
    return (Math.ceil(num * 10000000) / 10000000).toFixed(6);
  },

  selectMarker: function(markerToSelect){
    this.markers.forEach( function(marker, i){
      if (this.roundNum(marker.position.lat()) === this.roundNum(markerToSelect.lat) &&
        this.roundNum(marker.position.lng()) === this.roundNum(markerToSelect.lng)) {

        this.markers.splice(i, 1);
        marker.setMap(null);


        var newMarker = this.makeSingleMarker("5facb5", markerToSelect.lat, markerToSelect.lng)
        this.markers.push(newMarker);
        newMarker.setMap(this.context.map);
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
        newMarker.setMap(this.context.map);
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
      map: this.context.map,
      icon: pinImage
    });

    return marker
  },

  handleResize: function(){
    this.setState({ height: window.innerHeight - 61 })
  },

  render: function(){
    var mapStyle = {
      visibility: this.props.mapVisibility,
      height: this.state.height
    };

    return (
      <div className="map-container" style={mapStyle}>
        <div id="map" ref="map" ></div>
      </div>
    )
  }
})

module.exports = Map;
