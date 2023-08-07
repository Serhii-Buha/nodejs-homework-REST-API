const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendGridEmail = async (data) => {
  try {
    const email = { ...data, from: "sendgrid.serhii@gmail.com" };
    await sgMail.send(email);

    return true;
  } catch (error) {
    console.log(error);
  }
};
