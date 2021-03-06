import React, { Component } from "react";
import Nav from "../Nav";
import BusAdded from './BusAdded';
import RevBy from './RevBy';
import TokenService from "../services/token-service";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MeFriendly extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     businesses: [],
  //     reviews: [],
  //   };
  // }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // console.log(currentUser)

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }
  }
  

  

  render() {
    return (
      <div className="me-friendly-page">
        <div className="nested-nav">
          <div className="page-heading">
            <Nav />
          </div>
          <div className="page-heading">
            <h2 className="logo">
              <FontAwesomeIcon icon={faFingerprint} />  me - friendly <FontAwesomeIcon icon={faFingerprint} /> 
            </h2>
          </div>
        </div>
        <div className="me-friendly">
          <RevBy />
          <BusAdded />
          <footer>
            <a href="https://www.freepik.com/freepik">photo created by freepik</a>
          </footer>
        </div>
        
      </div>
    );
  }
}

export default MeFriendly;
