import { registerUser, userLogin } from "../Services/authServices.js";

export const createUser = async (req, res) => {
  const { userDetails } = req.body;
  console.log(userDetails.username);
  const result = await registerUser(userDetails);
  return res.status(result.status).json({ message: result.message });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  console.log(password)
  const result = await userLogin(email, password);
  return res.status(result.status).json({ message: result.message , token:result.token, status:result.status});
};
