import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import config from "../config";
import TokenService from "../services/token-service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RevBy extends Component {
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

    let reviewsByMeUrl = `${config.API_ENDPOINT}/reviews/written-by-me/${currentUser}`;

    fetch(reviewsByMeUrl)
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
    deleteReview(e) {
        e.preventDefault();
     
        const data = {};
    
        const formData = new FormData(e.target);
    
        for (let value of formData) {
          data[value[0]] = value[1];
        }
    
        // console.log(data);
    
        let { review_id } = data;
        // console.log(project_id);
    
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
      return (
        <div className="review-item" key={key}>
        {/* I need to figure out how to take the business_id and use it to look up and display the corresponding name and zipcode. I also want to utilize this is sorting and filtering.*/}
          <h3>{review.business_id.name}                        {review.rating}</h3>
          <p>{review.friendly_for} -friendly        {review.business_id.zipcode}</p>
          <p>{review.review}</p>
          <p>{review.reviewer_id.username}                {review.date_modified.slice(0, 10)}</p>
          <div className="buttons">
            <form className="delete" onSubmit={this.deleteReview}>
                <input
                    type="hidden"
                    name="review_id"
                    defaultValue={review.id}
                ></input>
                <button type="submit" className="delete">
                    delete
                </button>
            </form>
            <NavLink to={{ pathname: "/edit-review", review_id: review.id }}>
              <button>edit</button>
            </NavLink>
          </div>
        </div>
      );
    });

    return (
      <div className="reviews-by-me">
        <h3>reviews by me</h3>
        <div className="reviews">
          <div className="review-items">{showReviewsByMe}</div>
          <footer></footer>
        </div>
        
      </div>
    );
  }
}

export default RevBy;