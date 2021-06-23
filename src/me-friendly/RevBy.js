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
      myReviews: [],
      // currentUser: 0,
    };
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // console.log(currentUser)
    // this.setState({
    //   currentUser: currentUser
    // })

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    // let reviewsUrl = `${config.API_ENDPOINT}/reviews`;

    // fetch(reviewsUrl)
    //   .then((reviews) => reviews.json())
    //   .then((reviews) => {
    //     return reviews.sort((a, b) => {
    //       let result = 0;
    //       if (a.name > b.name) return 1;
    //       if (a.name < b.name) return -1;
    //       return result;
    //     });
    //   })
    //   .then((reviews) => {
    //     console.log(reviews)
    //     this.setState({
    //       reviews: reviews,
    //     });
    //   })

    //   .catch((error) => this.setState({ error }));




    //   let reviews = this.state.reviews;
    // // // let reviewer = this.state.currentUser;
    // console.log(reviews)
    // // console.log(reviewer)

    // let response = reviews;
    // let myReviews = []

    // for (let i=0; i<response.length; i++) {
    //   if (currentUser == response[i].reviewer_id) {
    //     myReviews.push(response[i])
    //   } else {myReviews = []
    // }
    // }

    // console.log(myReviews)
    // this.setState({
    //   myReviews: myReviews
    // })
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
        console.log(reviews)
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
            <NavLink to={{ pathname: "/edit-review", review_id: review.id }}>
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