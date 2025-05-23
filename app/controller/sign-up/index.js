const signUpModel = require("../../model/sign-up");

exports.add = async (request, response) => {
  try {
    let requestBody = request["body"] || {};
    let result = await signUpModel.add(requestBody);
    response.status(SUCCESS_CODE).json(result);
  } catch (error) {
    response.status(SERVER_ERROR_CODE).json(error);
  }
};

exports.otp = async (request, response) => {
  try {
    let requestBody = request["body"] || {};
    let result = await signUpModel.otp(requestBody);
    response.status(SUCCESS_CODE).json(result);
  } catch (error) {
    response.status(SERVER_ERROR_CODE).json(error);
  }
};

exports.verify = async (request, response) => {
  try {
    let requestBody = request["body"] || {};
    let result = await signUpModel.verify(requestBody);
    response.status(SUCCESS_CODE).json(result);
  } catch (error) {
    response.status(SERVER_ERROR_CODE).json(error);
  }
};
