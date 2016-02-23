var ApiActions = require('../actions/apiActions');

ApiUtil = {
  fetchRoomsInBounds: function(bounds){
    $.get("/api/rooms", {"bounds": bounds}, function(fetchedRooms){
      ApiActions.receiveAll(fetchedRooms);
    })
  },

  fetchRoomsInPriceRange: function(priceRange){
    $.get("/api/rooms", {"price_range": priceRange}, function(fetchedRooms){
      ApiActions.receiveAll(fetchedRooms);
    })
  },

  fetchRoomsWithinParams: function(params){
    $.get("/api/rooms", {params: params}, function(fetchedRooms){
      ApiActions.receiveAll(fetchedRooms);
    })
  }
}

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
