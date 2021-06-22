import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav";
import config from "../config";
import TokenService from "../services/token-service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBus from "./SearchBus";

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      results: [],
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

    let businessesUrl = `${config.API_ENDPOINT}/businesses`;

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
          results: businesses,
        });
      })

      .catch((error) => this.setState({ error }));
  }

  handleSearchBus = (e) => {
    e.preventDefault();

    const data = {};

    const formData = new FormData(e.target);

    //for each of the keys in form data populate it with form value
    for (let value of formData) {
      data[value[0]] = value[1];
    }

    //check if the state is populated with the search params data
    // console.log(data)

    let businesses = this.state.businesses;
    let searchName = data.name;
    let searchZip = data.zipcode;
    let searchState = data.state;
    let searchCategory = data.category;
    console.log(businesses)
    // console.log(searchName, searchZip, searchState, searchCategory)

    //by default select all the results
    let response = businesses;
    let outputState = [];
    let outputCategory = [];
    let outputName = [];
    let outputZip = [];
    let filterSelected = 0

    if (searchName) {
      for (let i=0; i<response.length; i++) {
        if (response[i].name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0) {
          outputName.push(response[i])
        }
      } 
      filterSelected = 1
    }
    else {
      outputName = response
    }
    // console.log(filterSelected)
    // console.log(outputName)
    
    if(searchZip) {
      for (let i=0; i<outputName.length; i++) {
        if(searchZip == outputName[i].zipcode) {
          outputZip.push(outputName[i])
        }
      }
      filterSelected = 1
    }
    else {
      outputZip = outputName
    }
    
    // console.log(filterSelected)
    // console.log(outputZip)

    if (searchState != "select") {
      for (let i = 0; i < outputZip.length; i++) {
        if (searchState === outputZip[i].state) {
          outputState.push(outputZip[i]);
        }
      }
      filterSelected = 1
    }
    else {
      outputState = outputZip
    }

    // console.log(filterSelected)
    // console.log(outputState)

    if (searchCategory != "select") {
      for (let i = 0; i < outputState.length; i++) {
        if (searchCategory === outputState[i].category) {
          outputCategory.push(outputState[i]);
        }
      }
      filterSelected = 1
    }
    else {
      outputCategory = outputState
    }

    // console.log(filterSelected)
    // console.log(outputCategory)

    if (filterSelected == 0) {
      outputCategory = []
    }

    // console.log(outputCategory);

    this.setState({
      results: outputCategory
    })
  };

  render() {
    const showBusinesses = this.state.results.map((business, key) => {
      // if (this.state.results == undefined) {
      //   return (
      //     <p>Sorry, we couldn't find anything. Try different search terms, or click [+ add a business]</p>
      //   )
      // } else {
        return (
        <div className="business-item" key={key}>
          <h3>{business.name}</h3>
          <p>{business.category}</p>
          <p>{business.address}</p>
          <p>
            {business.city}, {business.state} {business.zipcode}
          </p>
          <p>{business.website}</p>
          <p>reviews</p>
          <div className="buttons">
            <NavLink to={{ pathname: "/add-review", business_id: business.id }}>
              <button>write a review</button>
            </NavLink>
            <form className="remember" onSubmit={this.remember}>
              <input
                type="hidden"
                name="review_id"
                defaultValue={business.id}
              ></input>
              <button type="submit" className="remember">
                remember
              </button>
            </form>
          </div>
        </div>
      );
      // }
      
    });

    return (
      <div className="businesses-page">
        <div className="nested-nav">
          <div className="page-heading">
            <Nav />
          </div>
          <div className="page-heading">
            <h3>Search for a business or service:</h3>
          </div>
        </div>
        <div className="businesses">
          <div className="search">
            <SearchBus onHandleSearchBus={(event) => this.handleSearchBus(event)} />
          </div>
          <div className="page-heading">
            <h2>Results:</h2>
          </div>

          <div className="business-items">{showBusinesses}</div>
          <div>
            <NavLink to="/add-business">
              <button>
                <FontAwesomeIcon icon={faPlus} /> add a business
              </button>
            </NavLink>
            {/* <button>clear search</button> */}
          </div>
        </div>

        <footer>
          <a href="https://www.freepik.com/photos/paper">
            Paper photo created by jcomp - www.freepik.com
          </a>
        </footer>
      </div>
    );
  }
}

export default Businesses;
