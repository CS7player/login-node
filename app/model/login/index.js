const mongoQuery = require("@cs7player/login-lib").mongoQuery;
const pbkdf = require("@cs7player/login-lib").pbkdf;
const jwt = require("@cs7player/login-lib").jwt;
const otpJson = require("../../utils/otp.json");

exports.login = async (requestBody) => {
  try {
    let password =  requestBody["password"];
    let pipeline = [{ $match :{
     username: requestBody["username"],
    }  
    }];
    let result = await mongoQuery.getDetails(USERS, pipeline);
    if(result.length==0){
     return {status:false,msg:"No account exists for the provided credentials"}
    }
    let passwordCheck = await pbkdf.checkPassword(password,result[0]['password']);
    if(!passwordCheck){
     return {status:false,msg:"Password misMatched!!!"};
    }
    let token = await jwt.generateToken(result[0]);
    return {status:true,token:token};
  } catch (error) {
    return { status: false, data: error };
  }
};

exports.forgetPassword = async (requestBody)=>{
 try {
  let otp = requestBody["otp"];
  let mail = requestBody["mail"];
    if(otp != otpJson[mail]){
     return {status:false,msg:"Invalid otp!!!"};
    }
    delete otpJson[mail];
    let password =  await pbkdf.hashPassword(requestBody["password"]);
    let filter = {mail:mail};
    let update = {password:password};
    let result = await mongoQuery.updateOne(USERS, filter,update);
    return {status:true,token:result};
  } catch (error) {
    return { status: false, data: error };
  }
}