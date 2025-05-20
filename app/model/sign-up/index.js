const mongoQuery = require("@cs7player/login-lib").mongoQuery;
const mongoConnection = require("@cs7player/login-lib").mongoConnection;

exports.add = async(requestBody)=>{
 try {
  let data = {
   "username":requestBody["username"],
   "mail":requestBody["mail"],
   "role":requestBody["role"]
  }
  let db = await mongoConnection();
  let result = await mongoQuery.insertOne(USERS,data);
  return {status:true,data:result};
 } catch (error) {
  return {status:false,data:error};
 }
}