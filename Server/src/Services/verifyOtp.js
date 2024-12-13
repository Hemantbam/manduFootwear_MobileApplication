import { getValidOtp } from "../Repository/generateOtp.js";
import { updateOtpStatus } from "../Repository/generateOtp.js";
export const verifyValidOtp = async (email, otp) => {
  const userOtpNumber = parseInt(otp);
  const [userValidOtp] = await getValidOtp(email);
  const dbValidOtpNumber = parseInt(userValidOtp.otp);
  if (userValidOtp) {
    const dateAndTime = userValidOtp.created_at;
    const otpCreatedTime = new Date(dateAndTime);
    const fiveMinuteLaterTime = otpCreatedTime.getTime() + 5 * 60 * 1000;
    const currentTime = new Date().getTime();
    if (
      dbValidOtpNumber === userOtpNumber &&
      currentTime <= fiveMinuteLaterTime
    ) {
      return true;
    }
  }
  return false;
};
