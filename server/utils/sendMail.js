require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const ErrorResponse = require("./errorResponse");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const sendMail = async (options) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USERNAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.text,
    };
    //console.log("transporter: ", JSON.stringify(transporter));
    console.log("mailOptions: ", JSON.stringify(mailOptions));
    const result = await transporter.sendMail(mailOptions);
    console.log("Result : ", JSON.stringify(result));
    return result;
  } catch (error) {
    console.log(error);
  }
};
sendMail()
  .then((result) => {
    if (result) {
      console.log("result after promise: ", JSON.stringify(result));
      console.log("email is sent: ", result);
    } else {
      console.log("no result email :default process starting call ");
    }
  })
  .catch((error) => {
    console.log(error.message);
    return new ErrorResponse(error.message, 500);
  });

module.exports = sendMail;
