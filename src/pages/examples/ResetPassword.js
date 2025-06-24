
import React, { useEffect, useState } from "react";
import { ArrowNarrowLeftIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Button, Container, InputGroup, Image, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "routes";
import logo from "../../assets/img/Telkosh.png";
import { useHistory } from "react-router-dom";


export default () => {
  const [mailid, setMailid] = useState("");
  useEffect(() => {
    const storedMailid = localStorage.getItem("mailid");
    if (storedMailid) {
      setMailid(storedMailid);
      localStorage.removeItem("mailid");
    }
  }, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState(false);
  const toggle1 = () => {
    setShowPassword1((prev) => !prev);
  };
  const toggle2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [variant, setVariant] = useState('primary');
  const submitNewPass = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setError(true);
      return;
    } else {
      setError(false);

      // api
      setShowModal(true);

    }



    // verifiedOtp(otpData)
    //   .then((success) => {
    //     if (success?.data?.statusCode === 200) {

    //       setTimeout(() => {
    //         history.push(Routes.Signin.path);
    //       }, 2000);
    //     }
    //     else if (success?.data?.statusCode > 300) {
    //       setError(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Login failed', error);
    //     setError(true);
    //   });
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setReason('');
    setVariant('primary');
  };
  // This will reset the form inputs
  const handleRefresh = () => {

    setShowModal(false);

    history.push(Routes.Signin.path);
    setReason('');
    setVariant('primary');
  };


  return (
    <main>
      <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="fmxw-500 w-100">
              <Card.Link as={Link} to={Routes.ForgotPassword.path} className="d-flex align-items-center justify-content-end">
                <ArrowNarrowLeftIcon className="icon icon-xs me-2" /> Back
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-500">
                <div className="mb-5 mt-md-0 w-75 m-auto">
                  <Image src={logo} alt="logo-telkosh" />
                </div>
                <h3 className="mb-4">Reset password</h3>
                <Form onSubmit={submitNewPass}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <Form.Control disabled type="email" placeholder={mailid || "user@example.com"} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text onClick={toggle1}>
                        {showPassword1 ? <LockOpenIcon className="icon icon-xs text-gray-600" /> : <LockClosedIcon className="icon icon-xs text-gray-600" />}
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type={showPassword1 ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        minLength={6}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text onClick={toggle2}>
                        {showPassword2 ? <LockOpenIcon className="icon icon-xs text-gray-600" /> : <LockClosedIcon className="icon icon-xs text-gray-600" />}
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isInvalid={error}
                      />
                    </InputGroup>
                    {error && <p className="m-0 text-danger fs-6">Passwords do not match!</p>}
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Reset password
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>


        <Modal
          size="sm"
          centered
          show={showModal}
          // onHide={handleCloseModal}
          className={`modal-${variant}`}
          backdrop="static"
          keyboard={false}
        >
          {/* <Modal.Header className="mx-auto">
            <p className="lead mb-0 text-white">Setting New Password</p>
          </Modal.Header> */}
          <Modal.Body className="pt-0">
            <div className="py-3 px-5 text-center">
              <Modal.Title className="text-white mb-3">
                {variant === 'tertiary' ? <h3>Password Reset Successfully</h3> : <h3>Something Went Wrong</h3>}
              </Modal.Title>
              {variant !== 'tertiary' ?
                <p className="mb-4 text-danger">
                  {reason}
                </p> : ''}
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center pt-0 pb-3">
            <Button variant="white" size="sm" className="text-primary fw-bold" onClick={handleRefresh}>
              Sign In
            </Button>
            {variant !== 'tertiary' && <Button variant="white" size="sm" className="text-primary fw-bold" onClick={handleCloseModal}>
              Retry
            </Button>}
          </Modal.Footer>
        </Modal>
      </section>
    </main>
  );
};
