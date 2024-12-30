import { useState } from "react";
import {
  FaEnvelope,
  FaLocationDot,
  FaPaperPlane,
  FaPhone,
} from "react-icons/fa6";

import { client } from "../../client";
import List from "../../graphics/List";
import "./Chat.scss";

export const Chat = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, phone, message } = formData;

  const handleChangeInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="chat" id="chat">
      <div className="container">
        <div className="contact-form-box w-half">
          <div className="section-header">
            <h2 className="section-title">Let’s work together!</h2>
          </div>
          <p className="contact-desc">
            Feel free to reach out for projects, collaborations, or web
            development inquiries via the form or e-mail.
          </p>
          {!isFormSubmitted ? (
            <div className="contact-form">
              <form id="contact-form">
                <div className="spotlight"></div>
                <div className="contact-input">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={name}
                    required
                    autoComplete="on"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <div className="contact-input">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                      value={email}
                      required
                      autoComplete="on"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="contact-input">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      value={phone}
                      required
                      autoComplete="on"
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="contact-input">
                  <textarea
                    placeholder="Message"
                    value={message}
                    name="message"
                    id="message"
                    required
                    onChange={handleChangeInput}
                  ></textarea>
                </div>
                <div className="form_btn">
                  <button
                    type="submit"
                    className="btn-primary"
                    onClick={handleSubmit}
                  >
                    {!loading ? "Send Message" : "Sending..."}
                    <FaPaperPlane className="button-icon" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h3>Thank you for reaching out!</h3>
            </div>
          )}
        </div>
        <div className="contact-info-list w-half">
          <div className="box">
            <div className="cluster">
              <h2 className="contact-subtitle">
                We'll create something amazing!
              </h2>
              <p className="contact-desc">
                Whether working on a simple landing page or something more
                complex, I bring precision, creativity, and a commitment to
                excellence to every endeavor.
              </p>
            </div>
            <List />
          </div>
          <div className="box">
            <ul className="cluster">
              <li className="flex option">
                <div className="icon-box flex">
                  <FaPhone />
                </div>
                <div className="text-box">
                  <h3>Phone:</h3>
                  <a href="tel:+1 (423) 603-6466">(423) 603-6466</a>
                </div>
              </li>
              <li className="flex option">
                <div className="icon-box flex">
                  <FaEnvelope />
                </div>
                <div className="text-box">
                  <h3>E-mail:</h3>
                  <a href="mailto:dq.heard@yahoo.com">dq.heard@yahoo.com</a>
                </div>
              </li>
              <li className="flex option">
                <div className="icon-box flex">
                  <FaLocationDot />
                </div>
                <div className="text-box">
                  <h3>Location:</h3>
                  <a href="#!">Nashville, TN</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
