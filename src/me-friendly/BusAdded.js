import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import config from "../config";
import TokenService from "../services/token-service";
import { faPlus, faParagraph, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BusAdded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
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

    let businessesAddedUrl = `${config.API_ENDPOINT}/businesses/added-by-me/${currentUser}`

    fetch(businessesAddedUrl)
      .then((businesses) => businesses.json())
      .then((businesses) => {
        return businesses.sort((a, b) => {
          let result = 0;
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return result;
        });
      })
      .then((businesses) => {
        this.setState({
          businesses: businesses,
        });
      })

      .catch((error) => this.setState({ error }));
  }


  render() {
    const showBusinessesAddedByMe = this.state.businesses.map((business, key) => {
      let addReviewUrl = `/add-review/${business.id}`
      return (
        <div className="business-item" key={key}>
          <h3>{business.name}</h3>
          <p>{business.category}</p>
          <p>{business.address}</p>
          <p>{business.city}, {business.state} {business.zipcode}</p>
          <p>{business.website}</p>
          <div className="buttons">
            <NavLink to={{ pathname: addReviewUrl }}>
              <button>
                <FontAwesomeIcon icon = {faParagraph} /> write a review
              </button>
            </NavLink>
            <NavLink to={{ pathname: "/edit-business", business_id: business.id }}>
              <button>
                <FontAwesomeIcon icon = {faPencilAlt} /> edit details
              </button>
            </NavLink>
          </div>
        </div>
      );
    });

    return (
      <div className="businesses-added-by-me">
        <div className="businesses">
            <h3 className="my-bus-heading">businesses added by me</h3>
            <div className="business-items">          
                {showBusinessesAddedByMe}
            </div>        
          <div>          
            <NavLink to="/add-business">
              <button>
                <FontAwesomeIcon icon={faPlus} /> add a business
              </button>    
            </NavLink>
          </div>          
        </div>

        <footer></footer>
      </div>
    );
  }
}

export default BusAdded;
