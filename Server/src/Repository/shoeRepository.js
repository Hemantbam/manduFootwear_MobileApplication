import dbConn from "../../config/db/dbConn.js";

export const addShoeDetails = async (shoeDetails, sizesWithStock) => {
  const connection = await dbConn.getConnection();
  try {
    await connection.beginTransaction();

    const query =
      "Insert into shoedetails(brandName,shoeName,gender,price, description, category,material,imageUrl) values(?,?,?,?,?,?,?,?)";
    const result = await connection.query(query, [
      shoeDetails.brandName,
      shoeDetails.shoeName,
      shoeDetails.gender,
      shoeDetails.price,
      shoeDetails.description,
      shoeDetails.category,
      shoeDetails.material,
      shoeDetails.image || "",
    ]);
    const shoeId = result[0].insertId;

    for (const { size, stock } of sizesWithStock) {
      const shoeSizeQuery =
        "INSERT INTO shoesizes (shoeId, shoeSizes) VALUES (?, ?)";
      const shoeSizeResult = await connection.query(shoeSizeQuery, [
        shoeId,
        size,
      ]);
      const shoeSizeId = shoeSizeResult[0].insertId;

      const stockQuery =
        "INSERT INTO shoesizestock (shoeId, shoeSizeId, stock) VALUES (?, ?, ?)";
      await connection.query(stockQuery, [shoeId, shoeSizeId, stock]);
    }
    await connection.commit();
    return true;
  } catch (error) {
    connection.rollback();
    throw new Error(`Failed to add a shoe ${error.message}`);
  } finally {
    connection.release();
  }
};

export const allShoesDetails = async () => {
  const query = "select * from shoedetails";
  const result = await dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
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

  const shoeStockQuery = `SELECT shoesizes.shoeSizes, shoesizestock.stock
                          FROM shoesizes
                          JOIN shoesizestock ON shoesizes.shoeSizeId = shoesizestock.shoeSizeId
                          WHERE shoesizes.shoeId = ?;
`;
  const shoeStockResult = await dbConn.query(shoeStockQuery, [shoeId]);

  console.log(result[0]);
  console.log(shoeStockResult);
  if (result[0].length > 0 && shoeStockResult[0].length > 0) {
    return {
      shoeDetails: result[0],
      shoeStockDetails: shoeStockResult[0],
    };
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
