const router = require("express").Router();
const signUpController = require("../../controller/sign-up");
const { check, validationResult } = require("express-validator");
const { isValid } = require("../../utils/common");

router.post(
 "/",
 [
  check("username").isLength({ min: 7 }).withMessage("Username must be exactly 7 characters"),
  check("mail").isEmail().withMessage("Invalid email address"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
 ],
 (request, response) => {
  try {
   const errors = validationResult(request);
   const isError = isValid(errors, response);
   if (isError) return;
   signUpController.add(request, response);
  } catch (error) {
   response.status(SERVER_ERROR_CODE).json(error);
  }
 }
);

router.post("/otp", [check("mail").isEmail().withMessage("Invalid email address")], (request, response) => {
 try {
  const errors = validationResult(request);
  const isError = isValid(errors, response);
  if (isError) return;
  signUpController.otp(request, response);
 } catch (error) {
  response.status(SERVER_ERROR_CODE).json(error);
 }
});

router.post("/verify", [check("mail").isEmail().withMessage("Invalid email address")], (request, response) => {
 try {
  const errors = validationResult(request);
  const isError = isValid(errors, response);
  if (isError) return;
  signUpController.verify(request, response);
 } catch (error) {
  response.status(SERVER_ERROR_CODE).json(error);
 }
});

module.exports = router;
