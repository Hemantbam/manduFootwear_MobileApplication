import {
  addNewShoes,
  deleteShoesByID,
  getShoeDetailsById,
  updateShoeDetailsByShoeId
} from "../Services/shoeService.js";

export const addShoes = async (req, res) => {
  const { shoeDetails } = req.body;
  const result = await addNewShoes(shoeDetails);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const getShoeById = async (req, res) => {
  const { id } = req.params;
  const result = await getShoeDetailsById(id);
  if (result.success) {
    return res.status(result.status).json({
      message: result.message,
      status: result.status,
      shoeDetails: result.shoeDetails,
    });
  }
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const deleteShoeById = async (req, res) => {
  const { id } = req.params;
  const result = await deleteShoesByID(id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};


export const updateShoeById=async(req,res)=>{
  const { id } = req.params;
  const { shoeDetails } = req.body;
  const result = await updateShoeDetailsByShoeId(shoeDetails, id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
}