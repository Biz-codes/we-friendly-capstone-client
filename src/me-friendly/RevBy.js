import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import config from "../config";
import TokenService from "../services/token-service";
import { faPencilAlt, faRecycle, faFingerprint, faTheaterMasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingStars from '../reviews/RatingStars'

class RevBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    
    let reviewsByMeUrl = `${config.API_ENDPOINT}/reviews/written-by-me/${currentUser}`;

    fetch(reviewsByMeUrl)
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
        });
      })

      .catch((error) => this.setState({ error }));
    
  
  }


    deleteReview(e) {
        e.preventDefault();
     
        const data = {};
    
        const formData = new FormData(e.target);
    
        for (let value of formData) {
          data[value[0]] = value[1];
        }
    
        // console.log(data);
    
        let { review_id } = data;
    
        fetch(`${config.API_ENDPOINT}/reviews/${review_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }).then((response) => {
          window.location = `/me-friendly`;
        });
      }



  render() {

    const showReviewsByMe = this.state.reviews.map((review, key) => {
      let editReviewUrl = `/edit-review/${review.id}`
      return (
        <div className="review-item" key={key}>
          <h3>{review.name} </h3>
          <p>({review.category}, {review.zipcode})</p>
          <p><RatingStars rating={review.rating} /></p>
          <p>{review.friendly_for} -friendly </p>
          <p>{review.review}</p>
          <p>{review.date_modified.slice(0, 10)}</p>
          <div className="buttons">
            <form className="delete" onSubmit={this.deleteReview}>
                <input
                    type="hidden"
                    name="review_id"
                    defaultValue={review.id}
                ></input>
                <button type="submit" className="delete">
                <FontAwesomeIcon icon = {faRecycle} /> delete
                </button>
            </form>
            <NavLink to={{ pathname: editReviewUrl }}>
              <button>
                <FontAwesomeIcon icon = {faPencilAlt} /> edit
              </button>
            </NavLink>
          </div>
        </div>
      );
    });

    return (
      <div className="reviews-by-me">
        <h3 className="my-rev-heading">
          <FontAwesomeIcon icon={faTheaterMasks} /> reviews by me <FontAwesomeIcon icon={faFingerprint} /> 
        </h3>
        <div className="reviews">
          <div className="review-items">{showReviewsByMe}</div>
          <footer></footer>
        </div>
        
      </div>
    );
  }
}

export default RevBy;