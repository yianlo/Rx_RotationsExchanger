var AppDispatcher = require('../dispatcher');

ApiActions = {
  receiveAll: function(rooms){
    AppDispatcher.dispatch({
      actionType: "ROOMS_RECEIVED",
      rooms: rooms
    });
  },


  receiveUserRooms: function(rooms){
    AppDispatcher.dispatch({
      actionType: "USER_ROOMS_RECEIVED",
      rooms: rooms
    });
  },

  receivedUser: function(user){
    AppDispatcher.dispatch({
      actionType: "LOG_IN_USER",
      user: user
    });
  },

  deletedSession: function(){
    AppDispatcher.dispatch({
      actionType: "DELETE_SESSION"
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
  },

  receivedAuthError: function(errorMessage){
    AppDispatcher.dispatch({
      actionType: "RENDER_AUTH_ERROR",
      error: errorMessage
    });
  },

  receivedRoomError: function(errorMessage){
    AppDispatcher.dispatch({
      actionType: "RENDER_ROOM_ERROR",
      error: errorMessage
    });
  },

  receivedNewRoom: function(room){
    AppDispatcher.dispatch({
      actionType: "NEW_ROOM_RECEIVED",
      room: room
    });
  },

  fetchedRoom: function(room){
    AppDispatcher.dispatch({
      actionType: "SINGLE_ROOM_RECEIVED",
      room: room
    });
  },

  deleteRoom: function(fetchedRoomId){
    AppDispatcher.dispatch({
      actionType: "DELETE_ROOM",
      roomId: fetchedRoomId
    });
  }

}

module.exports = ApiActions;
