const users = require("express").Router();
const {getUsers, getUser, createUser, deleteUser} = require("../../queries/users.js")

users.get("/", getUsers); 
users.get("/:id", getUser);
users.post("/createUser", createUser)
users.delete("/deleteUser/:id",deleteUser)


module.exports = users;