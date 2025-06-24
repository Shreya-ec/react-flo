import React, { useEffect, useState } from "react";
import { ArrowNarrowLeftIcon, LockClosedIcon, MailIcon, ExclamationCircleIcon, XCircleIcon, CheckIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useCheckUserDetailsMutation, useUserLoginMutation, useVerifyOtpMutation } from "../../Services/services";

import { Routes } from "routes";
import { FacebookIcon, GithubIcon, TwitterIcon } from "components/BrandIcons";
import OTPInput from "react-otp-input";
import Countdown from "react-countdown";
import logo from "../../assets/img/Telkosh.png";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerification, setOtpVerification] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [notregError, setNotregError] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  const [userLogin] = useUserLoginMutation();
  const [verifiedOtp] = useVerifyOtpMutation();
  const [isChecked, setIsChecked] = useState(true);
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const loginData = {
    login: isChecked ? email : phone,
    password: password
  };
  const [isPhoneValid, setIsPhoneValid] = useState(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPhone = localStorage.getItem("rememberedPhone");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    const savedChecked = localStorage.getItem("rememberChecked") === "true";
    if (savedRememberMe) {
      setIsChecked(savedChecked);
      if (savedChecked) {
        if (savedEmail) {
          setEmail(savedEmail);
          setPhone("+91")
        }
      }
      else {
        if (savedPhone) {
          setPhone(savedPhone);
          setEmail("");
        }
      }
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    if (!isChecked) {
      const regex = /^(\+|00)?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

      if (phone && phone.length >= 6 && phone.length <= 13 && regex.test(phone)) {
        setisVerifiedPhone(true);
        setIsPhoneValid(true); // Mark phone as valid
      } else {
        setisVerifiedPhone(false);
        setIsPhoneValid(false); // Mark phone as invalid
        return; // Stop further execution if validation fails
      }
    }


    if (rememberMe) {
      if (isChecked) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.setItem("rememberedPhone", phone);
      }
      localStorage.setItem("rememberMe", true);
      localStorage.setItem("rememberChecked", isChecked)
    } else {
      // Clear saved data if Remember Me is unchecked
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPhone");
      localStorage.setItem("rememberMe", false);
    }

    // Proceed with login logic if phone number is valid
    userLogin(loginData)
      .then((success) => {
        if (success?.data?.statusCode === 200) {
          localStorage.setItem("user", JSON.stringify(success.data.data));
          setOtpVerification(true);
        } else if (success?.data?.statusCode === 402) {
          setPasswordError(true);
        } else if (success?.data?.statusCode === 401) {
          setNotregError(true);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
        setPasswordError(true); // Set password error state to true on error
      });
  };


  const otpData = {
    login: isChecked ? email : phone,
    otp: otp
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    verifiedOtp(otpData)
      .then((success) => {
        if (success?.data?.statusCode === 200) {
          localStorage.setItem("TOKEN", JSON.stringify(success.data.data));
          if (success.data.data.user_type === 'enterprise') {
            localStorage.setItem("bsp", JSON.stringify(success.data.data.bsp) || 'RML');
          }
          history.push(Routes.DashboardOverview.path);
        }
        else if (success?.data?.statusCode > 300) {
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
        setError(true);
      });
  };

  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '***' + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  }

  const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length < 4) {
      return phoneNumber; // If the number is too short to mask, return it as is
    }
    const visibleStart = phoneNumber.slice(0, 2);
    const visibleEnd = phoneNumber.slice(-2);
    const maskedSection = '*'.repeat(phoneNumber.length - 4);
    return `${visibleStart}${maskedSection}${visibleEnd}`;
  };

  const maskedEmail = maskEmail(email);
  const maskedPhone = maskPhoneNumber(phone);


  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [key, setKey] = useState(Date.now()); // Key to reset the countdown

  const handleResendOtp = (e) => {
    console.log('e', e);
    setIsResendDisabled(true); // Disable resend link
    setKey(Date.now()); // Update key to restart countdown
    handleSubmit(e);
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



  // Handle change of the switch state
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  const [isVerifiedPhone, setisVerifiedPhone] = useState();

  const verifyPhone = (phone) => {
    setPhone(phone)
    const regex = /^(\+|00)?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (phone.length >= 6 && phone.length <= 13 && regex.test(phone)) {
      setisVerifiedPhone(true);

    } else {
      setisVerifiedPhone(false);
    }
  }

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <main>
      <section className="d-flex align-items-center vh-lg-100 mt-5 mt-lg-0 bg-soft">
        <Container>

          {otpVerification === false &&
            (
              <>

                <Row className="justify-content-center form-bg-image" /* style={{ backgroundImage: `url(${BgImage})` }} */>
                  <Col xs={12} className="d-flex flex-column align-items-center justify-content-center">
                    <p className="fmxw-500 w-100">
                      <Card.Link as={Link} to="/" className="d-flex align-items-center justify-content-end">
                        <ArrowNarrowLeftIcon className="icon icon-xs me-2" /> Back to homepage
                      </Card.Link>
                    </p>
                    <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                      <div className="mb-5 mt-md-0 w-75 m-auto">
                        <Image src={logo} alt="logo-telkosh" />
                      </div>
                      <div className="switch-container">
                        <input
                          type="checkbox"
                          id="username"
                          hidden="hidden"
                          checked={isChecked}
                          onChange={handleSwitchChange}
                        />
                        <label className="switch" htmlFor="username">
                          {/* Phone icon for the grey area (visible when switch is off) */}
                          <FaPhoneAlt
                            className={`phone-logo ${isChecked ? "hidden" : ""}`}
                            size={15}
                          />
                          {/* Email icon for the green area (visible when switch is on) */}
                          <FaEnvelope
                            className={`email-logo ${isChecked ? "" : "hidden"}`}
                            size={15}
                          />
                        </label>
                      </div>

                      <Form className="mt-3" onSubmit={handleSubmit}>
                        {!isChecked &&
                          <Form.Group id="phone" className="mb-4">
                            <Form.Label>Your Phone Number</Form.Label>
                            <InputGroup className="phone-input-group">
                              <PhoneInput
                                country={"in"}
                                value={phone}
                                onChange={verifyPhone}
                                placeholder="+91 99999-99999"
                                className={`phone-input ${isPhoneValid === false ? "is-invalid" : ""}`}
                                autoComplete="new-phone"
                              />
                              {isVerifiedPhone && (
                                <InputGroup.Text className="phone-input-icon">
                                  <CheckIcon width={20} className="text-success" />
                                </InputGroup.Text>
                              )}
                              {isVerifiedPhone === false && (
                                <InputGroup.Text className="phone-input-icon">
                                  <XCircleIcon width={20} className="text-danger" />
                                </InputGroup.Text>
                              )}
                            </InputGroup>
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid phone number in the format '+91 XXXXX-XXXXX'.
                            </Form.Control.Feedback>
                          </Form.Group>

                        }
                        {isChecked &&
                          <Form.Group id="email" className="mb-4">
                            <Form.Label>Your Email</Form.Label>
                            <InputGroup>
                              <InputGroup.Text>
                                <MailIcon className="icon icon-xs text-gray-600" />
                              </InputGroup.Text>
                              <Form.Control
                                autoFocus
                                required
                                type="email"
                                placeholder="example@company.com"
                                onChange={(e) => {
                                  setEmail(e.target.value)
                                  setError(false);
                                }
                                }
                                value={email}
                              />
                              {error && (
                                <InputGroup.Text className="end-0">
                                  <ExclamationCircleIcon className="icon icon-xs text-danger" />
                                </InputGroup.Text>
                              )}
                            </InputGroup>
                            {error && (
                              <Form.Text className="text-danger mt-2 d-block">
                                Check your credentials again.
                              </Form.Text>
                            )}
                          </Form.Group>
                        }

                        <Form.Group id="password" className="mb-4 position-relative">
                          <Form.Label>Your Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <LockClosedIcon className="icon icon-xs text-gray-600" />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="password"
                              placeholder="Password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(false); // Clear the error when the user types
                              }}
                            />
                            {(passwordError || error) && (
                              <InputGroup.Text className="end-0">
                                <ExclamationCircleIcon className="icon icon-xs text-danger" />
                              </InputGroup.Text>
                            )}
                          </InputGroup>
                          {(passwordError || error) && (
                            <Form.Text className="text-danger mt-2 d-block">
                              Check your password
                            </Form.Text>
                          )}
                        </Form.Group>
                        {notregError && <div className="d-flex text-center my-2"><span className="text-danger">Your login information is not registered!</span></div>}

                        <div className="d-flex justify-content-between align-items-top mb-4">
                          <Form.Group className="mb-4">
                            <Form.Check
                              type="checkbox"
                              id="rememberMe"
                              label="Remember me"
                              checked={rememberMe}
                              onChange={handleRememberMeChange}
                            />
                          </Form.Group>
                          <Card.Link as={Link} to={Routes.ForgotPassword.path} className="small text-end">Lost password?</Card.Link>
                        </div>
                        <div className="d-grid mb-2">
                          <Button variant="gray-800" type="submit">
                            Sign in
                          </Button>
                        </div>
                      </Form>

                      {/* <div className="mt-3 mb-4 text-center">
                        <span className="fw-normal">or login with</span>
                      </div>
                      <div className="d-flex justify-content-center my-4">
                        <Button variant="outline-gray-500" className="btn-icon-only btn-pill me-2">
                          <FacebookIcon size="xs" color="currentColor" />
                        </Button>
                        <Button variant="outline-gray-500" className="btn-icon-only btn-pill me-2">
                          <TwitterIcon size="xs" color="currentColor" />
                        </Button>
                        <Button variant="outline-gray-500" className="btn-icon-only btn-pill">
                          <GithubIcon size="xs" color="currentColor" />
                        </Button>
                      </div>
                      <div className="d-flex justify-content-center align-items-center mt-4">
                        <span className={notregError ? "fw-bold text-danger" : "fw-normal"}>
                          Not registered?
                          <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                            {` Create account `}
                          </Card.Link>
                        </span>
                      </div> */}
                    </div>
                  </Col>
                </Row>
              </>
            )}


          {otpVerification === true && (

            <>
              <Row>
                <Col xs={12} className="d-flex flex-column align-items-center justify-content-center">
                  <p className="fmxw-500 w-100">
                    <Card.Link as={Link} to="/" className="d-flex align-items-center justify-content-end">
                      <ArrowNarrowLeftIcon className="icon icon-xs me-2" /> Back to homepage
                    </Card.Link>
                  </p>
                  <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="mb-5 mt-md-0 w-75 m-auto">
                      <Image src={logo} alt="logo-telkosh" />
                    </div>

                    <Form className="text-center">
                      <Form.Group id="email" className="mb-4">
                        <div className=" mb-4">
                          {isChecked ?
                            <h6>Please enter the 6 digit OTP sent to your email {maskedEmail}.</h6> :
                            <h6>Please enter the 6 digit OTP sent to your phone {maskedPhone}.</h6>
                          }

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
                          <Button variant="gray-800" type="submit" onClick={verifyOtp}>
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
                    </Form>

                  </div>
                </Col>
              </Row>
            </>
          )}

        </Container>
      </section>
    </main>
  );
};

export default Signin;
