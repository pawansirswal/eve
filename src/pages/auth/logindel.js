import React from "react";
import { message, notification } from "antd";
import API from "../../config/config";
import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  Container,
  Label,
  FormGroup,
} from "reactstrap";

import IMG from "../../assets/images/loginBack.jpeg";
// Redux
import { Link, useHistory } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions

// import images
import logodark from "../../assets/images/stocks.png";

export default function LoginDel() {
  let history = useHistory();
  const [username, setUsername] = React.useState("");
  const [userpassword, setUserpassword] = React.useState("");

  function handleSubmit() {
    // console.log(username, userpassword);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: userpassword,
      }),
    };
    fetch(API.api_route + "/auth/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          message.success("Logged in successfully !");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", username);
          updateLogs();
          history.push("dashboard");
        } else {
          notification.error({ message: data.msg });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const updateLogs = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
      }),
    };
    fetch(API.api_route + "/auth/updateLoginLog", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("logs updated");
          localStorage.setItem("loginId", data.loginId);
        } else {
          notification.error({ message: data.msg });
        }
      });
  };

  var handleUsername = (e) => {
    // console.log(e.target.id);
    setUsername(e.target.value);
  };

  var handlePassword = (e) => {
    // console.log(e.target.id);
    setUserpassword(e.target.value);
  };

  return (
    <div>
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/">
            <i className="mdi mdi-home-variant h2 text-white"></i>
          </Link>
        </div>

        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <Col lg={4}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                <img
                                  src={logodark}
                                  style={{ height: "100px", marginTop: "40px" }}
                                  alt="logo"
                                />
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">
                              Welcome Back !
                            </h4>
                            <p className="text-muted">
                              Sign in to continue to Delisted Stocks.
                            </p>
                          </div>

                          {/* {this.props.loginError && this.props.loginError ? (
                            <Alert color="danger">
                              {this.props.loginError}
                            </Alert>
                          ) : null} */}

                          <div className="p-2 mt-5">
                            <AvForm className="form-horizontal">
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">Username</Label>
                                <AvField
                                  name="username"
                                  //   value={this.state.username}
                                  type="text"
                                  onChange={handleUsername}
                                  className="form-control"
                                  id="username"
                                  //   validate={{ email: true, required: true }}
                                  placeholder="Enter username"
                                />
                              </FormGroup>

                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <AvField
                                  name="password"
                                  //   value={this.state.password}
                                  type="password"
                                  onChange={handlePassword}
                                  className="form-control"
                                  id="userpassword"
                                  placeholder="Enter password"
                                />
                              </FormGroup>

                              <div className="custom-control custom-checkbox">
                                <Input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customControlInline"
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </Label>
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  onClick={handleSubmit}
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  Log In
                                </Button>
                              </div>
                            </AvForm>
                          </div>

                          <div className="mt-5 text-center">
                            <p>
                              © 2021 EGS. Crafted with{" "}
                              <i className="mdi mdi-heart text-danger"></i> by
                              EGS
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
}
