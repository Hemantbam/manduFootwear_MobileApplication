import nodemailer from "nodemailer";

export const sendMail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mandufootwear@gmail.com",
        pass: "uovb ypfi fdak dzqw",
      },
    });
    const mailOptions = {
      from: "hemantbam9865@gmail.com",
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
