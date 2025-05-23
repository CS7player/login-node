const router = require("express").Router();
const loginController = require("../../controller/login");
const { check, validationResult } = require("express-validator");
const {isValid} = require("../../utils/common");

router.post("/",[
  check("username").isLength({ min: 7 }).withMessage("Username must be exactly 7 characters"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
 ],
 (request, response) => {
  try {
   const errors = validationResult(request);
   const isError = isValid(errors, response);
   if (isError) return;
   loginController.login(request, response);
  } catch (error) {
   response.status(SERVER_ERROR_CODE).json(error);
  }
 }
);

router.post("/forget-password",[
 check("mail").isEmail().withMessage("Invalid email address"),
 check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], (request, response) => {
 try {
   const errors = validationResult(request);
   const isError = isValid(errors, response);
   if (isError) return;
   loginController.forgetPassword(request, response);
  } catch (error) {
   response.status(SERVER_ERROR_CODE).json(error);
  }
})

module.exports = router;
