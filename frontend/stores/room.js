var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _rooms = [];
var _priceRange = [];
var _mapBounds = {};

var RoomStore = new Store(AppDispatcher);

RoomStore.all = function () {
  return _rooms.slice();
};

var _resetBenches = function(benches){
  _rooms = benches;
}

var _updateHighlightedMarker = function(coords){
  _highlightedMarker = coords;
}

RoomStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "ROOMS_RECEIVED":
      _resetBenches(payload.rooms);
      RoomStore.__emitChange();
      break;
  }
}

module.exports = RoomStore
