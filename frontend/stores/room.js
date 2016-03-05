var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _rooms = {};
var _userRooms = {};

var RoomStore = new Store(AppDispatcher);

RoomStore.all = function () {
  return Object.keys(_rooms).map(function(roomId){
    return _rooms[roomId]
  })
  // return _rooms.slice();
};

var _resetRooms = function(rooms){
  _rooms = {};

  if (rooms instanceof Array){
    rooms.forEach( function(room){
      _rooms[room.id] = room;
    });
  }
};

var _resetUserRooms = function(rooms){
  if (rooms instanceof Array){
    rooms.forEach( function(room){
      _userRooms[room.id] = room;
    });
  } else if (!rooms){
    _userRooms = {};
  }
};

var _addNewRoom = function(room){
  _rooms[room.id] = room;
  _userRooms[room.id] = room;
};

var _addRoom = function(room){
  _rooms[room.id] = room;

  if (_userRooms[room.id]){
    _userRooms[room.id] = room;
  }
};

var _deleteRoom = function(roomId){
  delete _rooms[roomId];

  if (_userRooms[roomId]){
    delete _userRooms[roomId];
  }
};


RoomStore.find = function(roomId){
  return _rooms[roomId];
};

RoomStore.getUserRooms = function(){
  return Object.keys(_userRooms).map(function(roomId){
    return _userRooms[roomId]
  })
};

RoomStore.findByHostId = function(hostId){
  _userRooms = [];

  Object.keys(_rooms).map( function(roomId){
    if (_rooms[roomId].host_id === hostId) {
      _userRooms.push(_rooms[roomId])
    }
  })

  return _userRooms;
};

RoomStore.__onDispatch = function (payload) {
  // debugger
  switch(payload.actionType) {
    case "ROOMS_RECEIVED":
      _resetRooms(payload.rooms);
      RoomStore.__emitChange();
      break;
    case "USER_ROOMS_RECEIVED":
      _resetUserRooms(payload.rooms);
      RoomStore.__emitChange();
      break;
    case "NEW_ROOM_RECEIVED":
      _addNewRoom(payload.room);
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
