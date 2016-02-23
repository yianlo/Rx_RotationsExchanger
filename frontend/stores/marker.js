var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _highlightedMarker = [];
var MarkerStore = new Store(AppDispatcher);

var _updateHighlightedMarker = function(coords){
  _highlightedMarker.unshift(coords);
}

var _clearHighlightedMarker = function(coords){
  _highlightedMarker = [];
}

MarkerStore.getMarker = function () {
  return _highlightedMarker[0];
};

MarkerStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "HIGHLIGHT_MARKER":
      _updateHighlightedMarker(payload.coords);
      MarkerStore.__emitChange();
      break;
    case "UNHIGHLIGHT_MARKER":
      _clearHighlightedMarker();
      MarkerStore.__emitChange();
      break;
  }
}

module.exports = MarkerStore
