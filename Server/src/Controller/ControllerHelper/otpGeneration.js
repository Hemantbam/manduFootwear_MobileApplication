export const generateOtp = () => {
  let otp = "";
  while (otp.length < 6) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
