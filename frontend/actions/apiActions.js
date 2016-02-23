var AppDispatcher = require('../dispatcher');

ApiActions = {
  receiveAll: function(rooms){
    AppDispatcher.dispatch({
      actionType: "ROOMS_RECEIVED",
      rooms: rooms
    });
  },

  sendMarkerToHighlight: function(coords){
    AppDispatcher.dispatch({
      actionType: "HIGHLIGHT_MARKER",
      coords: coords
    });
  },

  sendMarkerToUnhighlight: function(){
    AppDispatcher.dispatch({
      actionType: "UNHIGHLIGHT_MARKER",
    });
  }

}

module.exports = ApiActions;
