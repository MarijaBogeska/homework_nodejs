import fs from "fs";

//functions to read existing users from users.json file
try {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  // console.log(parsedUsers);
} catch (error) {
  console.log("error reading file", error);
}

const getUserById = (userId) => {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  const foundUser = parsedUsers.find((user) => user.id === userId); //razlika megju find i filter: filter vrakja niza od elementi(dokolku ima pokje) a find vrakja samo eden element(prvio sho ke go najdi)
  if (foundUser) {
    return foundUser;
  }
  return null;
  // return foundUser ?? {} //nullish coalising operator
  // return foundUser ? foundUser : {} //ternary operator
};
const foundUser = getUserById(1);
// console.log(foundUser);

export const addUser = (user) => {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  const newUserId = parsedUsers.length + 1;
  const newUser = {
    id: newUserId,
    name: user.name,
    username: user.username,
    email: user.email,
  };
  const userExists = parsedUsers.some(
    (existingUser) => existingUser.email === user.email
  );
  if (userExists) {
    console.log(`Error: User with email "${user.email}" already exists.`);
  } else {
    parsedUsers.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
    fs.appendFile(
      "logs.txt",
      `\n[${new Date()}] Action performed: Added User ${JSON.stringify(
        user,
        null,
        2
      )}`,
      (error) => {
        if (error) {
          console.log("error", error);
        } else {
          console.log("User is successfully created!");
        }
      }
    );
  }
};
const newUser = {
  name: "Bob",
  username: "bobbobsky",
  email: "bob@email.com",
};
// addUser(newUser);

//HOMEWORK
//edit User
export function editUser(id, newName, newUsername) {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  //take the index of the user
  const userIndex = parsedUsers.findIndex((user) => user.id === id);
  //update new properties
  if (userIndex !== -1) {
    //if user does not exists userIndex = -1
    parsedUsers[userIndex].name = newName;
    parsedUsers[userIndex].username = newUsername;
    fs.writeFileSync("users.json", JSON.stringify(parsedUsers, null, 2));
    fs.appendFile(
      "logs.txt",
      `\n[${new Date()}] Action performed: Edited User ${JSON.stringify(
        parsedUsers[userIndex],
        null,
        2
      )}`,
      (error) => {
        if (error) {
          console.log("error", error);
        } else {
          console.log("User is successfully editeted!");
        }
      }
    );

    console.log(parsedUsers[userIndex]);
  } else {
    console.log("There is not user with that id");
  }
}

//delete User
export function deleteUser(id) {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  //take the index of the user
  const userIndex = parsedUsers.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    parsedUsers.splice(userIndex, 1);
    fs.appendFile(
      "logs.txt",
      `\n[${new Date()}] Action performed: Deleted User ${
        parsedUsers[userIndex]
      }`,
      (error) => {
        if (error) {
          console.log("error", error);
        } else {
          console.log("User is successfully deleted!");
        }
      }
    );
    fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
  } else {
    console.log("There is not user with that id");
  }
}

export function deleteAllUsers() {
  fs.writeFileSync("users.json", JSON.stringify([], null, 2));
  fs.appendFile(
    "logs.txt",
    `\n[${new Date()}] Action performed: Delete All Users in "users.json"}`,
    (error) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("All users are successfully deleted!");
      }
    }
  );
}
