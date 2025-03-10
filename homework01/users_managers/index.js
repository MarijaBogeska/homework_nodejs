import { greetUser } from "./greetingService.js";
import {
  deleteAllUsers,
  editUser,
  deleteUser,
  addUser,
} from "./usersService.js";

let user = {
  name: "Jill",
  username: "jill_123",
  email: "Nathan@yesenia.net",
};

// greetUser(user.name);
addUser(user);
// editUser(4, "marija", "marijaBogeska");
// deleteUser(2);
// deleteAllUsers()
