import React, { Component } from "react";
import emailjs from "emailjs-com";

function sendEmail(e) {
  console.log(typeof e.target);
  e.preventDefault();

  // emailjs.send("service_ox102ix", "template_4rpwqtk", {
  //   subject: "test",
  //   email_to: "aakashchaddha@gmail.com",
  // });
  emailjs
    .send(
      "service_ox102ix",
      "template_4rpwqtk",
      {
        subject: "test",
        email_to: "aakashchaddha@gmail.com",
      },
      "user_7JXo7f1ITVxMeY6j6E2OZ"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  e.target.reset();
}

class ContactUs extends Component {
  render() {
    return (
      <div style={{ margin: "194px" }}>
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="hidden" name="contact_number" />
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default ContactUs;
