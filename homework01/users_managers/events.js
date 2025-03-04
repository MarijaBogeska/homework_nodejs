import {EventEmitter} from "node:events";
import EventTypes from "./eventTypes.js";
import {
    deleteAllUsers,
    editUser,
    deleteUser,
    addUser
  } from "./usersService.js";

const emitter= new EventEmitter();

//addUser event
emitter.on(EventTypes.add,addUser)