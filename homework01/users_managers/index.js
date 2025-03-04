import { greetUser } from "./greetingService.js";
import {
  deleteAllUsers,
  editUser,
  deleteUser,
  addUser
} from "./usersService.js";

let user = {
  firstName: "Jill",
  lastName: "Wayne",
};

// greetUser(user.firstName);
addUser(user)
editUser(4, "marija", "marijaBogeska");
deleteUser(2);
// deleteAllUsers()

