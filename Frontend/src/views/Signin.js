import React, { Component, Fragment } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { login } from "../services/auth";
import createBrowserHistory from "history/createBrowserHistory";
import Eyecon from "@material-ui/icons/Visibility";
import EyeClosecon from "@material-ui/icons/VisibilityOff";
import registerImage from "../assets/register_atmanirbhar.png";
import Recaptcha from "react-recaptcha";

class Signin extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    err: "",
    passwordIsMasked: true,
    captcha: false,
  };

  recaptchaLoaded = () => {
    console.log("recaptcha");
  };

  verifyCallback = (response) => {
    if (response) {
      this.setState({
        captcha: true,
      });
    }
  };

  onValueChange = (e) => {
    this.setState({
      ...this.state,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  togglePasswordMask = () => {
    this.setState((prevState) => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  togglePasswordMask = () => {
    this.setState((prevState) => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  history = createBrowserHistory({ forceRefresh: true });

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.captcha) {
      login(event, this.state);
    } else {
      alert("Please verify that you are a human");
    }
  };

  render() {
    return (
      <Fragment>
        <section>
          <div id="container">
            <Row>
              <Col
                xs={0}
                md={6}
                style={{ marginTop: "2rem" }}
                className="back-img"
              >
                <div>
                  <img src={registerImage} alt="cover-img"></img>
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div id="form">
                  <h3>Sign In</h3>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicusername">
                      <Form.Label className="label">Username</Form.Label>
                      <Form.Control
                        type="username"
                        placeholder="Enter username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onValueChange}
                      />
                    </Form.Group>

                    <Form.Group
                      className="password-field"
                      controlId="formBasicPassword"
                    >
                      <Form.Label className="label">Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={
                            this.state.passwordIsMasked ? "password" : "text"
                          }
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onValueChange}
                        />

                        <InputGroup.Append>
                          <InputGroup.Text
                            style={{
                              color: "#E76829",
                              border: "none",
                            }}
                          >
                            {!this.state.passwordIsMasked ? (
                              <Eyecon onClick={this.togglePasswordMask} />
                            ) : (
                              <EyeClosecon onClick={this.togglePasswordMask} />
                            )}
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      <div
                        style={{ paddingLeft: "1.7rem", paddingTop: "1rem" }}
                      >
                        <Recaptcha
                          sitekey="6LfKSLkZAAAAAPcHdfBuLFTTYNmbEXPp2naM9CAA"
                          render="explicit"
                          onloadCallback={this.recaptchaLoaded}
                          verifyCallback={this.verifyCallback}
                        />
                      </div>
                    </Form.Group>

                    {/* #448aff */}

                    <Button variant="primary" type="submit" id="btn">
                      Signin
                    </Button>

                    <div>
                      <p id="signup-para">
                        Forgot Password?
                        <a href="/forgot-password"> Contact Us</a>
                      </p>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>

            <style>
              {`
                #container{
                    height: 100vh;
                }
                img{
                    width: 100%;
                    height: 100vh;
                }
    
                #form{
                    color: #E76829;
                   margin: 15rem 13rem 4rem 6rem;
                }
    
                #form > h3 {
                    color: #E76829;
                    font-weight: 600;
                    margin-bottom: 2rem;
                }
    
                #btn{
                    border-radius: 30px;
                    padding: 12px 30px;
                    color: white;
                    background: #E76829;
                    border: 1px solid;
                    margin-top: 5%;
                }

               .eye-icon {
                                position: absolute;
                                right: 34%;
                                top: 50%;
                                z-index: 9999; 
                              }

                #signup-para{
                    margin-top: 1rem;

                    text-align: center;
                    color: #E76829;
                }
                
                #signup-para > a{
                    color: black;
                    text-decoration: none;
                    font-weight: bolder;
                }

                .form-header{
                    display: flex;
                }
    
                .label{
                    display: flex;
                    margin-bottom: 0px;
                }
    
                .form-control{
                    margin-bottom: 8px;
                }
    
                .text-muted{
                    text-align: initial;
                }

                .back-image{
                    margin-top:2rem;
                    padding-top: 2rem;
                }
            `}
            </style>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Signin;
