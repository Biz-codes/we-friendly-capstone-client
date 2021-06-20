import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav";
import config from "../config";
import TokenService from "../services/token-service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      reviews: [],
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
        this.setState({
          reviews: reviews,
        });
      })

      .catch((error) => this.setState({ error }));
    
    // let business_id = review.
    // let getBusinessByIdUrl = `${config.API_ENDPOINT}/businesses/${business_id}`

    // fetch(getBusinessByIdUrl)
    //   .then((business) => business.json())
    //   .then((business) => {
    //     this.setState({
    //       business: business
    //     })
    //   })
    
  }
  

  

  render() {
    const showReviews = this.state.reviews.map((review, key) => {
      return (
        <div className="review-item" key={key}>
        {/* I need to figure out how to take the business_id and use it to look up and display the corresponding name and zipcode. I also want to utilize this is sorting and filtering.*/}
          <h3>{review.business_id.name}                        {review.rating}</h3>
          <p>{review.friendly_for} -friendly        {review.business_id.zipcode}</p>
          <p>{review.review}</p>
          <p>{review.reviewer_id.username}                {review.date_modified.slice(0, 10)}</p>
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
          <div className="search">Search will go here.</div>
          <div className="results">{showReviews}</div>
          <footer><a href='https://www.freepik.com/photos/background'>Background photo created by rawpixel.com - www.freepik.com</a></footer>
        </div>
        
      </div>
    );
  }
}

export default Reviews;
