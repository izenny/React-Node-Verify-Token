const router = require("express").Router();

const  UserController= require('../Controller/Usercontroller');
const { VerifyToken, verifyTokenandathorization } = require("../Verifytoken");

router.post("/",UserController.createUser)
router.post("/login",UserController.LoginandToken)
router.get("/data/:id",VerifyToken,verifyTokenandathorization,UserController.getdatata)
module.exports = router;