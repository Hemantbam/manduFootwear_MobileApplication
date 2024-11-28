import dbConn from "../../config/db/dbConn.js";

export const userRegister = async (userDetails, password) => {
  const query =
    "Insert into users (username, email, mobileNumber,gender,occupation,address,password,created_at) values(?,?,?,?,?,?,?,Now())";
  const [result] = await dbConn.query(query, [
    userDetails.username,
    userDetails.email,
    userDetails.mobileNumber,
    userDetails.gender,
    userDetails.occupation,
    userDetails.address,
    password,
  ]);
  if (result.affectedRows > 0) {
    return true;
  }
  return false;
};

export const getUser = async (email) => {
  const query = "select * from users where email=?";
  const [result] = await dbConn.query(query, [email]);
  if (result.length > 0) {
    return result[0];
  }
  return false;
};
