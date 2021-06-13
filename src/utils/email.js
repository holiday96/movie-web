//email-js
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_FT7XMLT9CwnjPstip5Dke");

export const sendEmailActive = (user_email, to_name, link_verify) => {
  var templateParams = {
    user_email: user_email,
    to_name: to_name,
    subject: "Verification Account from WaMo",
    message:
      "We are honored that you choose our service. Please click on the link below to activate your account. ",
    link_verify: link_verify,
  };

  emailjs.send("service_3oegqxe", "template_4xht0cp", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
};

export const sendEmailReset = (user_email, to_name, link_verify) => {
  var templateParams = {
    user_email: user_email,
    to_name: to_name,
    subject: "Reset Password Account from WaMo",
    message:
      "We are honored that you choose our service. Please click on the link below to reset your password. ",
    link_verify: link_verify,
  };

  emailjs.send("service_3oegqxe", "template_lt6hxfi", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
};
