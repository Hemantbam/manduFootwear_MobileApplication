
import { shoeDetailsValidationSchema } from "../../validation/shoeDetailValidation.js";
import {
  addShoeDetails,
  allShoesDetails,
  deleteShoeById,
  getShoeById,
  getShoeDetails,
  updateShoeDetailsById,
} from "../Repository/shoeRepository.js";

export const addNewShoes = async (shoeDetails, sizesWithStock) => {
  try {
    await shoeDetailsValidationSchema.validateAsync(shoeDetails);

    const checkShoeDetailsDb = await getShoeDetails(
      shoeDetails.brandName,
      shoeDetails.shoeName
    );
    if (checkShoeDetailsDb) {
      return {
        success: false,
        status: 409,
        message: "Shoes already exist with the same name in a same brand",
      };
    }

    const addShoes = await addShoeDetails(shoeDetails, sizesWithStock);
    if (!addShoes) {
      return {
        success: false,
        status: 400,
        message: "Unable to add the new shoes to database",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Shoes added successfully!!",
    };
  } catch (error) {
    console.log(error)
    if (error.isJoi) {
      return {
        success: false,
        status: 400,
        message: error.details.map((detail) => detail.message).join(", "),
      };
    }
    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const getShoeDetailsById = async (shoeId) => {
  console.log(shoeId)
  if (isNaN(shoeId)) {
    return {
      success: false,
      status: 400,
      message: "Invalid shoe Id",
    };
  }
  try {
    const result = await getShoeById(shoeId);
    if (!result) {
      return {
        success: false,
        status: 404,
        message: "Shoe not found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Shoe data fetched successfully",
      shoeDetails: result,
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};


export const getAllShoesDetails=async()=>{
const result=await allShoesDetails();
console.log(result)
if(!result){
  return {
    success:false,
    status:404,
    message:"No shoes found in database"
  }
}
return {
  success:true,
  status:200,
  message:"Shoes data fetched successfully",
  details:result
}
}

export const deleteShoesByID = async (shoeId) => {
  try {
    if (isNaN(shoeId)) {
      return {
        success: false,
        status: 400,
        message: "Invalid Id. Shoe id should a number",
      };
    }
    const checkShoesInDb = await getShoeById(shoeId);
    if (!checkShoesInDb) {
      return {
        success: false,
        status: 404,
        message: "Shoes with the given id not found",
      };
    }
    const result = await deleteShoeById(shoeId);
    if (result) {
      return {
        success: true,
        status: 200,
        message: "Shoe has been deleted from the database",
      };
    }
    return {
      success: false,
      status: 400,
      message: "Unable to delete the shoes",
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};

export const updateShoeDetailsByShoeId = async (shoeDetails, shoeId) => {
  if (isNaN(shoeId)) {
    return {
      success: false,
      status: 400,
      message: "Invalid shoe Id",
    };
  }
  try {
    await shoeDetailsValidationSchema.validateAsync(shoeDetails);
    const result = await updateShoeDetailsById(shoeDetails, shoeId);
    if (result) {
      return {
        success: true,
        status: 200,
        message: "Shoe details updated successfully",
      };
    }
    return {
      success: false,
      status: 400,
      message: "Unable to update the shoe details",
    };
  } catch (error) {
    if (error.isJoi) {
      return {
        success: false,
        status: 400,
        message: error.details.map((detail) => detail.message).join(", "),
      };
    }
    return {
      success: false,
      status: 500,
      message: "Internal Server error",
    };
  }
};


