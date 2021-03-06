var ApiActions = require('../actions/apiActions');

ApiUtil = {
  fetchFirstRooms: function(){
    $.get("/api/rooms/first_three", function(fetchedRooms){
      ApiActions.receiveFirstRooms(fetchedRooms);
    })
  },

  fetchRoomsWithinParams: function(params){
    $.get("/api/rooms/filter", {filter: params}, function(fetchedRooms){
      ApiActions.receiveAll(fetchedRooms);
    })
  },

  fetchNewSession: function(userParams, togglePgCb){
    $.post("/api/session", {user: userParams}, function(fetchedUser){
      if (Object.getOwnPropertyNames(fetchedUser).length > 0) {
        ApiActions.receivedUser(fetchedUser);
        togglePgCb();
      } else {
        ApiActions.receivedAuthError("Invalid email/ password.");
      }
    })
  },

  checkSessionStatus: function(){
    $.get("/api/session/check", function(fetchedUser){
      if(Object.getOwnPropertyNames(fetchedUser).length > 0){
        ApiActions.receivedUser(fetchedUser);
      }
    })
  },

  createNewUser: function(userParams, redirectCb){
    $.post("/api/users", {user: userParams}, function(fetchedUser){
      if (Object.getOwnPropertyNames(fetchedUser.errors).length === 0) {
        redirectCb();
        ApiActions.receivedUser(fetchedUser);
      } else {
        ApiActions.receivedAuthError(fetchedUser.errors);
      }
    })
  },

  deleteSession: function(toggleLogInPage){
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      success: function(){
        ApiActions.deletedSession();
        toggleLogInPage();
      }
    })
  },

  createImages: function(img_urls, room, redirectCb){
    $.post("/api/images", {images: JSON.stringify({img_urls: img_urls, room_id: room.id})}, function(){
      ApiActions.receivedNewRoom(room);
      redirectCb(room.id);
    })
  },

  addImages: function(){

  },

  deleteImage: function(imageId, redirectCb){
    $.ajax({
      url: '/api/images/' + imageId,
      type: 'DELETE',
      data: {image: {id: imageId}},
      success: function(originalRoom){
        redirectCb();
        ApiActions.fetchedRoom(originalRoom)
      }
    })
  },

  updateRoom: function(params, roomId, redirectCb){
    params["id"] = roomId;

    $.ajax({
      url: '/api/rooms/' + roomId,
      type: 'PATCH',
      data: {room: params},
      success: function(fetchedNewRoom){
        redirectCb(fetchedNewRoom.id);
        ApiActions.fetchedRoom(fetchedNewRoom)
      }
    })
  },

  createNewRoom: function(params, redirectCb){
    $.post("/api/rooms", {room: params}, function(fetchedNewRoom){
      if (Object.getOwnPropertyNames(fetchedNewRoom.errors).length === 0) {
        if (params.img_urls) {
          ApiUtil.createImages(params.img_urls, fetchedNewRoom, redirectCb)
        } else {
          ApiActions.receivedNewRoom(fetchedNewRoom);
          redirectCb(fetchedNewRoom.id);
        }
      } else {
        ApiActions.receivedRoomError(fetchedNewRoom.errors)
      }
    })
  },

  fetchRoomsByUser: function(userId){
    $.get("/api/users/" + userId + "/rooms", function(fetchedRooms){
      if (Object.getOwnPropertyNames(fetchedRooms).length > 0) {
        ApiActions.receiveUserRooms(fetchedRooms);
      }
    })
  },

  fetchSingleRoom: function(roomId){
    $.get("/api/rooms/" + roomId, {room: {id: roomId}}, function(fetchedRoom){
      ApiActions.fetchedRoom(fetchedRoom);
    })
  },

  deleteRoom: function(roomId, redirectCb){
    $.ajax({
      url: '/api/rooms/' + roomId,
      type: 'DELETE',
      data: {room: {id: roomId}},
      success: function(fetchedRoomId){
        redirectCb();
        ApiActions.deleteRoom(fetchedRoomId.id)
      }
    })
  },

  createRequest: function(bookingDetails, redirectCb){
    $.post("/api/bookings", {booking: bookingDetails}, function(fetchedRequest){
      ApiActions.receivedRequest(fetchedRequest)
      redirectCb();
    })
  },

  fetchRequestsByUser: function(userId){
    $.get("/api/users/" + userId + "/bookings", function(fetchedRequests){
      if (Object.getOwnPropertyNames(fetchedRequests).length > 0) {
        ApiActions.receiveUserRequests(fetchedRequests);
      }
    })
  },

  fetchPastRequestsByUser: function(userId){
    $.get("/api/users/" + userId + "/past_trips", function(fetchedTrips){
      if (Object.getOwnPropertyNames(fetchedTrips).length > 0) {
        ApiActions.receiveUserPastTrips(fetchedTrips);
      }
    })
  },

  approveBooking: function(bookingId){
    $.post("/api/bookings/approve", {booking: {id: bookingId}}, function(updatedBooking){
      if (Object.getOwnPropertyNames(updatedBooking).length > 0) {
        ApiActions.receiveSingleHostingRequest(updatedBooking);
      }
    })
  },

  denyBooking: function(bookingId){
    $.post("/api/bookings/deny", {booking: {id: bookingId}}, function(updatedBooking){
      if (Object.getOwnPropertyNames(updatedBooking).length > 0) {
        ApiActions.receiveSingleHostingRequest(updatedBooking);
      }
    })
  },

  deleteBooking: function(bookingId){
    $.ajax({
      url: '/api/bookings/' + bookingId,
      type: 'DELETE',
      data: {booking: {id: bookingId}},
      success: function(deletedBooking){
        ApiActions.deletedBooking(deletedBooking.id);
      }
    })
  },

  fetchHostingRequests: function(userId){
    $.get("/api/users/" + userId + "/hostings", function(fetchedHostings){
      if (Object.getOwnPropertyNames(fetchedHostings).length > 0) {
        ApiActions.receiveUserHostings(fetchedHostings);
      }
    })
  }
}

module.exports = ApiUtil;
