var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _rooms = {};

var RoomStore = new Store(AppDispatcher);

RoomStore.all = function () {
  return Object.keys(_rooms).map(function(roomId){
    return _rooms[roomId]
  })
  // return _rooms.slice();
};

var _resetRooms = function(rooms){
  _rooms = {};
  if (rooms.rooms){
    rooms.rooms.forEach( function(room){
      _rooms[room.id] = room;
    });
  }
};

var _addRoom = function(room){
  _rooms[room.id] = room;
};

var _deleteRoom = function(roomId){
  delete _rooms[roomId];
};

RoomStore.find = function(roomId){
  return _rooms[roomId];
};

RoomStore.findByHostId = function(hostId){
  var _userRooms = [];

  Object.keys(_rooms).map( function(roomId){
    if (_rooms[roomId].host_id === hostId) {
      _userRooms.push(_rooms[roomId])
    }
  })

  return _userRooms;
};

RoomStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "ROOMS_RECEIVED":
      _resetRooms(payload.rooms);
      RoomStore.__emitChange();
      break;
    case "SINGLE_ROOM_RECEIVED":
      _addRoom(payload.room);
      RoomStore.__emitChange();
      break;
    case "DELETE_ROOM":
      _deleteRoom(payload.roomId);
      RoomStore.__emitChange();
      break;
  }
}

module.exports = RoomStore;

window.RoomStore = RoomStore;
