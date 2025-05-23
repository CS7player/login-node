const loginModel = require("../../model/login");

exports.login = async (request, response) => {
 try {
  let requestBody = request["body"] || {};
  let result = await loginModel.login(requestBody);
  response.status(SUCCESS_CODE).json(result);
 } catch (error) {
  response.status(SERVER_ERROR_CODE).json(error);
 }
};

exports.forgetPassword = async (request, response) => {
 try {
  let requestBody = request["body"] || {};
  let result = await loginModel.forgetPassword(requestBody);
  response.status(SUCCESS_CODE).json(result);
 } catch (error) {
  response.status(SERVER_ERROR_CODE).json(error);
 }
};
