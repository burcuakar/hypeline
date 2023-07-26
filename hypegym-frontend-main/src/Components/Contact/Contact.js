import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/logo.svg";
import { contactUs } from "../API";
import "./style.css";

const Contact = () => {
  const [contact, setContact] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    contactUs(contact);
    alert("Your request has been delivered. We will contact you");
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <>
              <img src={contactImg} alt="Contact Us" />
            </>
          </Col>
          <Col size={12} md={6}>
            <>
              <div>
                <h2 style={{ color: 'white' }}>Get In Touch</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input
                        type="tel"
                        placeholder="Phone No."
                        name="phone_number"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea
                        rows="6"
                        placeholder="Message"
                        name="message"
                        onChange={handleChange}
                      ></textarea>
                      <button type="submit">
                        <span>Send</span>
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
