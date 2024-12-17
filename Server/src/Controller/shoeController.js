import {
  addNewShoes,
  deleteShoesByID,
  getAllShoesDetails,
  getShoeDetailsById,
  updateShoeDetailsByShoeId,
} from "../Services/shoeService.js";

export const addShoes = async (req, res) => {
  const { shoeDetails,sizesWithStock } = req.body;
  console.log(shoeDetails);
  const result = await addNewShoes(shoeDetails,sizesWithStock);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const getAllShoes = async (req, res) => {
  const result = await getAllShoesDetails();
  return res
    .status(result.status)
    .json({ message: result.message, shoesDetails: result.details , status:result.status});
};

export const getShoeById = async (req, res) => {
  const { id } = req.params;
  const result = await getShoeDetailsById(id);
  console.log(result)
  return res.status(result.status).json({
    message: result.message,
    status: result.status,
    shoeDetails: result.shoeDetails,
  });
};

export const deleteShoeById = async (req, res) => {
  const { id } = req.params;
  const result = await deleteShoesByID(id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const updateShoeById = async (req, res) => {
  const { id } = req.params;
  const { shoeDetails } = req.body;
  const result = await updateShoeDetailsByShoeId(shoeDetails, id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};
