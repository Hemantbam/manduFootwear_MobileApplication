import dbConn from "../../config/db/dbConn.js";

export const addNewUser = async (userDetails, password) => {
  const query =
    "Insert into users (userName,email,mobileNumber,gender,occupation,address,password) values(?,?,?,?,?,?,?)";
  const result = await dbConn.query(query, [
    userDetails.username,
    userDetails.email,
    userDetails.mobileNumber,
    userDetails.gender,
    userDetails.occupation,
    userDetails.address,
    password,
  ]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const getUserById = async (userId) => {
  const query = "select * from users where id=?";
  const result = await dbConn.query(query, [userId]);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const deleteUserById = async (userId) => {
  const query = "delete from users where id=?";
  const result = dbConn.query(query, [userId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const editUserDetails = async (userDetails, userId) => {
  const query =
    "update users set userName=?,mobileNumber=?,occupation=?,address=? where userId=?";
  const result = dbConn.query(query, [
    userDetails.userName,
    userDetails.mobileNumber,
    userDetails.occupation,
    userDetails.address,
    userId,
  ]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const getUserByEmail = async (email) => {
  const query = "select * from users where email=?";
  const [result] = await dbConn.query(query, [email]);
  if (result.length > 0) {
    return result[0];
  }
  return false;
};

export const resetPassword = async (email, password) => {
  const query = "update users set password=? where email=?";
  const result = await dbConn.query(query, [password, email]);
  console.log(result)
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};
