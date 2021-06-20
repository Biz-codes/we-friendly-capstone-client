import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import config from "../config";
import TokenService from "../services/token-service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Remember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remembered: [],
    };
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // console.log(currentUser)

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    //get businesses from the API

    let businessesRememberedUrl = `${config.API_ENDPOINT}/remembered-businesses/remembered-by-me/${currentUser}`

    fetch(businessesRememberedUrl)
      .then((remembered) => remembered.json())
      .then((remembered) => {
        return remembered.sort((a, b) => {
          let result = 0;
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return result;
        });
      })
      .then((remembered) => {
        this.setState({
          remembered: remembered,
        });
      })

      .catch((error) => this.setState({ error }));
  }

  forget(e) {
    e.preventDefault();
 
    const data = {};

    const formData = new FormData(e.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    // console.log(data);

    let { remembered_business_id } = data;
    // console.log(project_id);

    fetch(`${config.API_ENDPOINT}/remembered-businesses/${remembered_business_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      window.location = `/me-friendly`;
    });
  }


  render() {
    const showBusinessesRemembered = this.state.remembered.map((remembered, key) => {
      return (
        <div className="business-item" key={key}>
          <h3>{remembered.id}</h3>
          {/* <p>{business.category}</p>
          <p>{business.address}</p>
          <p>{business.city}, {business.state} {business.zipcode}</p>
          <p>{business.website}</p>
          <p>reviews</p> */}
          <div className="buttons">
            {/* <NavLink to={{ pathname: "/add-review", business_id: business.id }}> */}
              <button>write a review</button>
            {/* </NavLink> */}
            <form className="delete" onSubmit={this.forget}>
                <input
                    type="hidden"
                    name="review_id"
                    defaultValue={remembered.id}
                ></input>
                <button type="submit" className="delete">
                    forget
                </button>
            </form>
          </div>
        </div>
      );
    });

    return (
      <div className="remembered-by-me">
        <div className="remembered">
            <h3>businesses to remember</h3>
            <div className="business-items">          
                {showBusinessesRemembered}
            </div>              
        </div>

        <footer></footer>
      </div>
    );
  }
}

export default Remember;