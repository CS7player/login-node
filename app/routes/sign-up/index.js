const router = require("express").Router();
const signUpController = require("../../controller/sign-up");

router.post("/",(request,response)=>{
 try {
  signUpController.add(request,response);
 } catch (error) {
  response.status(SERVER_ERROR_CODE).json(error);
 }
})


module.exports = router;