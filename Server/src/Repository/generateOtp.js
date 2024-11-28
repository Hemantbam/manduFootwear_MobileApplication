import dbConn from "../../config/db/dbConn.js";

export const addOtp = async (otp, email, status) => {
  const query =
    "Insert into generatedOtp (otp,email,status,created_at) values(?,?,?,Now())";
  const [result] = await dbConn.query(query, [otp, email, status]);
  if (result.affectedRows > 0) {
    return true;
  }
  return false;
};

export const getValidOtp = async (email) => {
  const query =
    "select * from generatedOtp where email=? and status='valid'";
  const [result] = await dbConn.query(query, [email]);
  if (result.length > 0) {
    return result;
  }
  return false;
};

export const updateOtpStatus = async (email) => {
  const query = "update generatedOtp set status='invalid' where email=?";
  const [result] = await dbConn.query(query, [email]);
  if (result.affectedRows > 0) {
    return true;
  }
  return false;
};


export const getUserInOtpTable=async(email)=>{
    const query="select * from generatedOtp where email=?"
    const [result]=await dbConn.query(query,[email])
    if(result.length>0){
        return result
    }
    return false
}