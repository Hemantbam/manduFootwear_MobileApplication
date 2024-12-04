import dbConn from "../../config/db/dbConn.js";

export const addShoeDetails = async (shoeDetails) => {
  const query =
    "Insert into shoedetails(brandName,shoeName,gender,price, description, category,material) values(?,?,?,?,?,?,?)";
  const result = await dbConn.query(query, [
    shoeDetails.brandName,
    shoeDetails.shoeName,
    shoeDetails.gender,
    shoeDetails.price,
    shoeDetails.description,
    shoeDetails.category,
    shoeDetails.material,
  ]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const getShoeDetails = async (brandName, shoeName) => {
  const query = "select * from shoedetails where brandName=? and shoeName=?";
  const result = await dbConn.query(query, [brandName, shoeName]);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const getShoeById = async (shoeId) => {
  const query = "select * from shoedetails where id=?";
  const result = await dbConn.query(query, [shoeId]);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const deleteShoeById = async (shoeId) => {
  const query = "delete from shoedetails where id=?";
  const result = dbConn.query(query, [shoeId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const updateShoeDetailsById = async (shoeDetails, shoeId) => {
  const query =
    "UPDATE shoedetails SET brandName = ?, shoeName = ?, gender = ?, price = ?, description = ?, category = ?, material = ? WHERE id = ?";
  const result = await dbConn.query(query, [
    shoeDetails.brandName,
    shoeDetails.shoeName,
    shoeDetails.gender,
    shoeDetails.price,
    shoeDetails.description,
    shoeDetails.category,
    shoeDetails.material,
    shoeId,
  ]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};
