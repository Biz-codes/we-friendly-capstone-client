import React, { Component } from "react";
import ValidationError from "./ValidationError";
import AuthApiService from "./services/auth-api-service";
import TokenService from "./services/token-service.js";
import { faDoorOpen, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
        touched: false,
      },
      password: {
        value: "",
        touched: false,
      },
      LogInUserID: 0,
      error: "",
    };
  }

  changeUsername(username) {
    this.setState({
      username: { value: username },
    });
  }

  changePassword(password) {
    this.setState({
      password: { value: password },
    });
  }

  validateUserName() {
    const username = this.state.username.value.trim();
    if (username.length === 0) {
      return <p className="input-error">Username is required</p>;
    } else if (username.length < 3) {
      return (
        <p className="input-error">
          Username must be at least 3 characters long
        </p>
      );
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return <p className="input-error">Password is required</p>;
    } else if (password.length < 8 || password.length > 16) {
      return (
        <p className="input-error">
          Password must be between 8 and 16 characters long
        </p>
      );
    } else if (!password.match(/[0-9]/)) {
      return (
        <p className="input-error">Password must contain at least one number</p>
      );
    }
  }

  loginUser = (event) => {
    event.preventDefault();
    //get the input from the form submission
    const data = {};
    //get the payload from the form submission
    const formData = new FormData(event.target);
    for (let value of formData) {
      data[value[0]] = value[1];
    }
    // console.log(data);
    let { username, password } = data;
    // console.log("username:", username.value, "password:", password.value);

    this.setState({ error: null });
    AuthApiService.postLogin({
      username: username,
      password: password,
    })

      .then((response) => {
        TokenService.saveAuthToken(response.authToken);
        TokenService.saveUserId(response.userId);
        window.location = "/reviews";
      })
      .catch((res) => {
        this.setState({ error: "Incorrect username and/or password." });
      });
  };

  render() {
    let errorOutput = "";
    if (this.state.error) {
      errorOutput = this.state.error
    }
    return (
      <div className="log-in">
        <h2>Log into your account!</h2>
        <p className="demo">To try the demo:</p>
        <p className="demo">username: Demo</p>
        <p className="demo">password: Friendly1</p>
        <form className="log-in-form" onSubmit={this.loginUser}>
          <h3>we-friendly community code of respect:</h3>
          <p>
            By clicking the box below, I agree to be respectful toward all other users - 
            those who identify the same way(s) I do, and those who identify differently.
            I agree to be empathic toward other people's views, without making assumptions
            about the lived experiences of other folx. Basically, I agree to contribute
            to making we-friendly a safe space.
          </p>
          <label htmlFor="agree"></label>
          <input type="checkbox" required/>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username."
            onChange={(e) => this.changeUsername(e.target.value)}
            required
          />
          {this.state.username.touched && (
            <ValidationError message={this.validateUsername()} />
          )}
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password."
            onChange={(e) => this.changePassword(e.target.value)}
            required
          />
          {this.state.password.touched && (
            <ValidationError message={this.validatePassword()} />
          )}
          <div className="input-error">
            {errorOutput}
          </div>
            <div className="buttons">
          <NavLink to="/">
            <button>
              <FontAwesomeIcon icon={faStepBackward} /> Cancel
            </button>
          </NavLink>
          <button type="submit" disabled={this.state.submitButtonDisabled}>
            <FontAwesomeIcon icon={faDoorOpen} /> Submit
          </button>
          
          </div>
          
          <NavLink to="/signup">Need to create an account?</NavLink>
          
          
        </form>      
      </div>
    );
  }
}
