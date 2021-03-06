import React, { Fragment } from "react";
import {
  InputLabel,
  FormHelperText,
  Input,
  FormControl,
  Button
} from "@material-ui/core";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import axios from "axios";
import Cookie from "js-cookie";
import { ClipLoader } from "react-spinners";
import DefaultImage from "../Images/defaultAvatar.png";

import "../styles/register.css";
export default class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    description: "",
    image: "",
    role: "member",
    status: "Register",
    dropZoneText: "Select or Drop your Profile Image Here",
    hasError: false,
    errorMessage: ""
  };

  registerUser = () => {
    if (!this.state.image) {
      this.setState({ image: DefaultImage });
    }
    this.setState({ status: "Registering" });
    axios
      .post(
        "https://discussion-site.herokuapp.com/auth/register",
        this.state
      )
      .then(res => {
        Cookie.set("token", res.data.token, {
          expires: 7,
          path: "/"
        });
        this.setState({ status: "Registered" });
        this.props.history.push("/");
        window.location.reload();
        window.scrollTo({
          top: 0,
          behavior: "auto"
        });
      })
      .catch(err => {
        this.setState(
          {
            status: "Error registering account... Try again.",
            hasError: true,
            errMessage: err
            // errorMessage: err.response.data.error || "Invalid Credentials"
          },
          () => console.log({ ...err })
        );
      });
  };

  imageUploadProgress = e => {
    let progress = Math.round(e.loaded / e.total) * 100;
    if (progress < 100) {
      this.setState({ dropZoneText: progress + "%" });
    } else {
      this.setState({ dropZoneText: "Your Profile Image was Uploaded" });
    }
  };

  registerUserEnter = e => {
    return e.key === "Enter" ? this.registerUser() : null;
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="register-form-container">
        <h1 className="hide">Register Page</h1>
        <h2 className="fw-bold">Register Below</h2>
        {this.state.hasError ? (
          <h4 style={{ color: "#F50057" }}>{this.state.errorMessage}</h4>
        ) : null}
        <form
          onSubmit={e => this.registerUserEnter(e)}
          className="register-form-flex"
        >
          <FormControl fullWidth required>
            <InputLabel>Username</InputLabel>
            <Input
              autoComplete="true"
              name="name"
              type="text"
              onChange={this.handleInputChange}
            />
            <FormHelperText>Please enter your username</FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Email</InputLabel>
            <Input
              autoComplete="true"
              name="email"
              type="email"
              onChange={this.handleInputChange}
            />
            <FormHelperText>
              Please enter a valid email address that you can keep up with
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Password</InputLabel>
            <Input
              autoComplete="true"
              name="password"
              type="password"
              onChange={this.handleInputChange}
            />
            <FormHelperText>
              Please enter a strong password that you can remember
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel />
            <Input
              name="date_of_birth"
              type="date"
              onChange={this.handleInputChange}
            />
            <FormHelperText>Please enter your date of birth.</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Description</InputLabel>
            <Input
              name="description"
              type="text"
              onChange={this.handleInputChange}
            />
            <FormHelperText>
              Please give us a short description about yourself, if you want.
            </FormHelperText>
          </FormControl>

          <br />
          <FormControl fullWidth>
            <StyledDropZone
              label={this.state.dropZoneText}
              onDrop={(file, text) => {
                const reader = new FileReader();
                reader.onload = upload =>
                  this.setState({ image: upload.srcElement.result });
                reader.onprogress = this.imageUploadProgress;
                reader.readAsDataURL(file);
              }}
            ></StyledDropZone>
          </FormControl>

          <br />
          <FormControl fullWidth>
            <Button
              onClick={this.registerUser}
              fullWidth
              color="secondary"
              variant="contained"
            >
              {this.state.status === "Registering" ? (
                <Fragment>
                  <span style={{ position: "relative", top: 0, right: 20 }}>
                    <ClipLoader />
                  </span>
                  {this.state.status}
                </Fragment>
              ) : (
                this.state.status
              )}
            </Button>
            <FormHelperText>
              Already registered? Please go <a href="/login">Login</a> to login.
            </FormHelperText>
          </FormControl>
        </form>
      </div>
    );
  }
}
