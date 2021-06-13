const express = require("express");
const user = require("./user");

const router = express.Router();

router.get("/users", user.getUsers);
router.post("/create-user", user.add);

module.exports = router;
