
import React, { useState } from "react";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Button, Container, InputGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "routes";
import logo from "../../assets/img/Telkosh.png";
import { useHistory } from "react-router-dom";
import OTPInput from "react-otp-input";
import Countdown from "react-countdown";


export default () => {
  const history = useHistory();

  const [mailid, setMailid] = useState('');
  const setEmail = (e) => {
    setMailid(e.target.value);
  }
  const proceedReset = (e) => {
    e.preventDefault();
    localStorage.setItem("mailid", mailid);
    setOtpField(true);

    // api to send OTP 
  }

  const [otp, setOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [key, setKey] = useState(Date.now()); // Key to reset the countdown
  const [error, setError] = useState('');

  const handleResendOtp = () => {
    setIsResendDisabled(true); // Disable resend link
    setKey(Date.now()); // Update key to restart countdown
    // handleSubmit();
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Timer has completed
      return (
        <Card.Link
          className="card-link-timer small"
          onClick={handleResendOtp}
          style={{ cursor: "pointer", color: "#F1A034" }}
        >
          Resend OTP?
        </Card.Link>
      );
    } else {
      // Display countdown timer
      return (
        <Card.Link
          className={`card-link-timer ${isResendDisabled ? "text-muted small" : ""}`}
          onClick={isResendDisabled ? null : handleResendOtp}
          style={{ cursor: "default" }}
        >
          {`TIMER: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </Card.Link>
      );
    }
  };

  const gotoReset = (event) => {
    // Prevent form submission default behavior :: when called by form, else when called for resend OTP
    if (event) {
      event.preventDefault();
    }
    //  api

    // route
    history.push(Routes.ResetPassword.path);

  };

  return (
    <main>
      <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="fmxw-500 w-100">
              <Card.Link as={Link} to={Routes.Signin.path} className="d-flex align-items-center justify-content-end">
                <ArrowNarrowLeftIcon className="icon icon-xs me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-500">
                <div className="mb-5 mt-md-0 w-75 m-auto">
                  <Image src={logo} alt="logo-telkosh" />
                </div>
                <h3>Forgot your password?</h3>
                <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                <Form onSubmit={proceedReset}>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control required autoFocus type="email" placeholder="john@company.com" onChange={setEmail} />
                    </InputGroup>
                  </div>
                  {otpField || <div className="d-grid">
                    <Button
                      variant="gray-800"
                      type="submit">
                      Recover password
                    </Button>
                  </div>}
                </Form>

                {otpField && <Form className="text-center" onSubmit={gotoReset}>
                  <Form.Group id="email" className="mb-4">
                    <div className=" mb-4">
                      <h6>Please enter the 6 digit OTP sent to the above email.</h6>
                    </div>
                    <InputGroup className="justify-content-center">
                      <div className="formInput">
                        <OTPInput
                          onChange={setOtp}
                          value={otp}
                          inputStyle="inputStyle"
                          numInputs={6}
                          renderSeparator={<span></span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </div>
                    </InputGroup>

                    {error && <div className="d-flex text-center my-2"><span className="text-danger">Your OTP is incorrect!</span></div>}

                    <div className="d-grid mt-3">
                      <Button variant="gray-800" type="submit">
                        Verify
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="d-flex flex-column align-items-start mb-4">
                    <Form.Label className="mb-0 small">Did not receive OTP code?</Form.Label>
                    <Form.Check type="checkbox" disabled={isResendDisabled}>
                      <Form.Check.Label htmlFor="defaultCheck5" className="mb-0">
                        <Countdown
                          key={key}
                          date={Date.now() + 10000}
                          renderer={renderer}
                        />
                      </Form.Check.Label>
                    </Form.Check>
                  </div>
                </Form>}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
