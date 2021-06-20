import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav";
import config from "../config";
import TokenService from "../services/token-service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBus from "./SearchBus"

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      error: null,
      params: {

      }
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

    let businessesUrl = `${config.API_ENDPOINT}/businesses`

    fetch(businessesUrl)
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

  formatQueryParams(params) {
    const results = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return results.join('&')
  }

  handleSearch = (e) => {
    e.preventDefault()

    const data = {}

    const formData = new FormData(e.target)

    //for each of the keys in form data populate it with form value
    for (let value of formData) {
      data[value[0]] = value[1]
    }

    //assigning the object from the form data to params in the state
    this.setState({
      params: data
    })

    //check if the state is populated with the search params data
    console.log(this.state.params)
  }


  render() {
    const showBusinesses = this.state.businesses.map((business, key) => {
      return (
        <div className="supply-item" key={key}>
          <h3>{business.name}</h3>
          <p>{business.category}</p>
          <p>{business.address}</p>
          <p>{business.city}, {business.state} {business.zipcode}</p>
          <p>{business.website}</p>
          <p>reviews</p>
          <div className="buttons">
            <NavLink to={{ pathname: "/add-review", business_id: business.id }}>
              <button>write a review</button>
            </NavLink>
            {/* <button className="remember">
                remember
            </button> */}
          </div>
        </div>
      );
    });

    return (
      <div className="businesses">
        <div className="nested-nav">
          <div className="page-heading">
            <Nav />
          </div>
          <div className="page-heading">
            <h3>Search for a business or service:</h3>
          </div>
        </div>
        
        <div className="search">
          <SearchBus />
        </div>
        <div className="results">
          <h2>Results</h2>
          {showBusinesses}
        </div>        
        <div>          
          <NavLink to="/add-business">
            <button>
              <FontAwesomeIcon icon={faPlus} />
              <p>Add a business</p>
            </button>    
          </NavLink>
          {/* <button>clear search</button> */}
        </div>
      </div>
    );
  }
}

export default Businesses;
