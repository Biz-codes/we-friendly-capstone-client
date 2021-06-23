import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav";
import config from "../config";
import TokenService from "../services/token-service";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchRev from "./SearchRev";
import RatingStars from "./RatingStars";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      results: []
    };
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    console.log(currentUser)

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    let reviewsUrl = `${config.API_ENDPOINT}/reviews`;

    fetch(reviewsUrl)
      .then((reviews) => reviews.json())
      .then((reviews) => {
        return reviews.sort((a, b) => {
          let result = 0;
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return result;
        });
      })
      .then((reviews) => {
        // console.log(reviews)
        this.setState({
          reviews: reviews,
          results: reviews,
        });
      })

      .catch((error) => this.setState({ error }));
  }

  handleSearchRev = (e) => {
    e.preventDefault();

    const data = {};

    const formData = new FormData(e.target);

    //for each of the keys in form data populate it with form value
    for (let value of formData) {
      data[value[0]] = value[1];
    }

    //check if the state is populated with the search params data
    // console.log(data)

    let reviews = this.state.reviews;
    let searchFriendly = data.friendly_for;
    let searchName = data.name;
    let searchZip = data.zipcode;
    let searchState = data.state;
    let searchCategory = data.category;
    // console.log(reviews)
    // console.log(searchFriendly, searchName, searchZip, searchState, searchCategory)

    //by default select all the results
    let response = reviews;
    let outputFriendly = [];
    let outputState = [];
    let outputCategory = [];
    let outputName = [];
    let outputZip = [];
    let filterSelected = 0

    if (searchFriendly != "select") {
      for (let i = 0; i < response.length; i++) {
        if (searchFriendly === response[i].friendly_for) {
          outputFriendly.push(response[i]);
        }
      }
      filterSelected = 1
    }
    else {
      outputFriendly = response
    }
    // console.log(filterSelected)
    // console.log(outputFriendly)

    if (searchName) {
      for (let i=0; i<outputFriendly.length; i++) {
        if (outputFriendly[i].name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0) {
          outputName.push(outputFriendly[i])
        }
      } 
      filterSelected = 1
    }
    else {
      outputName = outputFriendly
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
    const showReviews = this.state.results.map((review, key) => {
      return (
        <div className="review-item" key={key}>
          <h3>{review.name} </h3>
          <p>({review.category}, {review.zipcode})</p>
          <p><RatingStars rating={review.rating} /></p>
          <p>{review.friendly_for} -friendly </p>
          <p>{review.review}</p>
          <p>{review.date_modified.slice(0, 10)}</p>
        </div>
      );
    });

    return (
      <div className="reviews-page">
        <div className="nested-nav">
          <div className="page-heading">
            <Nav />
          </div>
          <div className="page-heading">
            <h2 className="page-title">Search for reviews:</h2>
          </div>
        </div>
        <div className="reviews">
          <div className="search">
            <SearchRev onHandleSearchRev={(event) => this.handleSearchRev(event)} />
          </div>
          <div className="page-heading">
            <h2>Results:</h2>
          </div>
          <div className="review-items">{showReviews}</div>
          <div>
            <NavLink to="/businesses">
              <button className="big-button">
                <FontAwesomeIcon icon={faSearch} /> find or add a business to write a review
              </button>
            </NavLink>
          </div>

          <footer>
            <a href="https://www.freepik.com/photos/background">
              Background photo created by rawpixel.com - www.freepik.com
            </a>
          </footer>
        </div>
      </div>
    );
  }
}

export default Reviews;
