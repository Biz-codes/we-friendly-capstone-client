import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Businesses from "./businesses/Businesses";
import AddBus from "./businesses/AddBus";
import EditBus from "./businesses/EditBus";
import Reviews from "./reviews/Reviews";
import AddRev from "./reviews/AddRev";
import EditRev from "./reviews/EditRev";
import MeFriendly from "./me-friendly/MeFriendly";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <h1>we - friendly</h1>
          </header>

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/signup" component={SignUp} />
            <Route path="/users/login" component={LogIn} />
            <Route path="/businesses" component={Businesses} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/me-friendly" component={MeFriendly} />
            <Route path="/add-business" component={AddBus} />
            <Route path="/edit-business" component={EditBus} />
            <Route path="/add-review/:business_id" component={AddRev} />
            <Route path="/edit-review/:review_id" component={EditRev} />
          </Switch>

          <footer>
            <p>app by Biz</p>
            <ul className="contact">
              <li>
                <a href="mailto:elizabeth.biz.hight@gmail.com?subject=Responding%20to%20Your%20Portfolio!">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/elizabeth-biz-hight/"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="contact-icon" />
                </a>
              </li>
              <li>
                <a href="https://github.com/biz-codes" target="_blank">
                  <FontAwesomeIcon icon={faGithub} className="contact-icon" />
                </a>
              </li>
            </ul>
          </footer>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
