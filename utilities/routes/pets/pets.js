const usersPets = require("express").Router();
const {getPets, getPetByUser } = require("../../queries/pets");

usersPets.get("/", getPets);
usersPets.get("/:id", getPetByUser);

module.exports = usersPets;