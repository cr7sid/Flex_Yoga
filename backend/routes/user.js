var express = require("express");
const { createUser, loginUser, makePayment, loadUser } = require("../controller/user");
var router = express.Router();
router.post("/cr_user", createUser);
router.post("/login", loginUser)
router.get("/payment", makePayment)

router.get("/load", loadUser);
module.exports = router;