const signUpModel = require("../../model/sign-up");

exports.add = async(request,response)=>{
 try {
  let requestBody = request['body'] || {};
  let result = signUpModel.add(requestBody);
  response.status(SUCCESS_CODE).json(result)
 } catch (error) {
  response.status(SERVER_ERROR_CODE).json(error);
 }
}