const mongoQuery = require("@cs7player/login-lib").mongoQuery;
const otp = require("@cs7player/login-lib").otp;
const otpJson = require("../../utils/otp.json");
const pbkdf = require("@cs7player/login-lib").pbkdf;

exports.add = async (requestBody) => {
  try {
    let data = {
      username: requestBody["username"],
      mail: requestBody["mail"],
      role: requestBody["role"],
      password: requestBody["password"],
      created_at: new Date(),
    };
    data["password"] = await pbkdf.hashPassword(requestBody["password"]);
    let result = await mongoQuery.insertOne(USERS, data);
    return { status: true, data: result };
  } catch (error) {
    if (error.code === 11000) {
     if("username" in  error.keyValue){
      return { status: false, data: error, msg: "Username already exits!!!" };
     }else{
      return { status: false, data: error, msg: "Email already exits!!!" };
     }
    } else {
      return { status: false, data: error };
    }
  }
};

exports.otp = async (requestBody) => {
  try {
    let data = {
      username: requestBody["username"] || "",
      mail: requestBody["mail"],
    };
    let result = await otp.sendOTPEmail(data);
    otpJson[data["mail"]] = result["otp"];
    return { status: true, data: result };
  } catch (error) {
    return { status: false, data: error };
  }
};

exports.verify = async (requestBody) => {
  try {
    let otp = requestBody["otp"];
    let mail = requestBody["mail"];
    if (otp == otpJson[mail]) {
      delete otpJson[mail];
      return { status: true, msg: "Verification Successfully!!!" };
    } else {
      return { status: true, msg: "Verification Failed!!!" };
    }
  } catch (error) {
    return { status: false, data: error };
  }
};
