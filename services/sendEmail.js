const sgMail = require("@sendgrid/mail");
const { generateActivationToken } = require("../services/generateToken");
require("dotenv").config();
sgMail.setApiKey(process.env.SG_KEY2);

exports.sendActivationEmail = (user) => {
  return new Promise((resolve, reject) => {
    let url = `${process.env.REGISTER_LINK}/${generateActivationToken(
      { id: user.id },
      10
    )}`;

    const msg = {
      to: user.email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Email Verification",
      html: `<h2>Hello user!</h2>
      <p>
        Please verify your email by clicking the link below (valid for 10
        minutes).
      </p>
      <p>If you did ask for this email, then you can ignore it:</p>
      <a href="${url}" target="_blank">Complete registration!</a>      
      <br />
      <p>
        If you cannot click, copy and paste the link to your browser:
      </p>
      <br />
      <p>
      ${url}  
      </p>`,
    };

    sgMail.send(msg).then(
      () => {
        resolve(
          "Email sent. Please check your email inbox to activate your account."
        );
      },
      (error) => {
        if (error.response) {
          reject(error.response.body);
        }
      }
    );
  });
};
