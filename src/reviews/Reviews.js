import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav";
import config from "../config";
import TokenService from "../services/token-service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchRev from "./SearchRev";
import RatingStars from "./RatingStars";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      reviews: [],
      fullReviews: [],
    };
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // console.log(currentUser)

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
          if (a.date_modified > b.date_modified) return 1;
          if (a.date_modified < b.date_modified) return -1;
          return result;
        });
      })
      .then((reviews) => {
        console.log(reviews)
        this.setState({
          reviews: reviews,
        });
      })

      .catch((error) => this.setState({ error }));

    let businessesUrl = `${config.API_ENDPOINT}/businesses`;

    fetch(businessesUrl)
      .then((businesses) => businesses.json())
      .then((businesses) => {
        this.setState({
          businesses: businesses,
        });
      })

      .catch((error) => this.setState({ error }));
  }

  render() {
    const showReviews = this.state.reviews.map((review, key) => {
      return (
        <div className="review-item" key={key}>
          {/* I need to figure out how to take the business_id and use it to look up and display the corresponding name and zipcode. I also want to utilize this is sorting and filtering.*/}
          <h3>{review.name} <RatingStars rating={review.rating} /></h3>
          <p>{review.friendly_for} -friendly </p>
          <p>{review.zipcode}</p>
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
            <h2 className="page-title">Search for reviews</h2>
          </div>
        </div>
        <div className="reviews">
          <div className="search">
            <SearchRev />
          </div>
          <div className="review-items">{showReviews}</div>
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
