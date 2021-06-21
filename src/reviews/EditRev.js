import React, { Component } from "react";
import config from "../config";
import { NavLink } from "react-router-dom";
import TokenService from "../services/token-service";
import ValidationError from "../ValidationError";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class EditRev extends Component {
  state = {
    friendly_for: {
      value: "",
      touched: false,
    },
    rating: {
      value: "",
      touched: false,
    },
    review: {
      value: "",
      touched: false,
    },
  };

  changeFriendlyFor(friendly_for) {
    this.setState({
      friendly_for: { value: friendly_for, touched: true },
    });
  }

  changeRating(rating) {
    this.setState({
      rating: { value: rating, touched: true },
    });
  }
  
  changeReview(review) {
    this.setState({
      review: { value: review, touched: true },
    });
  }

  validateRating() {
    const rating = this.state.rating.value.trim();
    if (rating.length === 0) {
      return <p className="input-error">rating is required</p>;
    }
  }

  validateReview() {
    const review = this.state.review.value.trim();
    if (review.length === 0) {
      return <p className="input-error">Review is required</p>;
    } else if (review.length < 2) {
      return (
        <p className="input-error">
          review must be at least 2 characters long
        </p>
      );
    }
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // console.log(currentUser);

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    let review_id = this.props.location.tool_id;

    let getReviewSpecsUrl = `${config.API_ENDPOINT}/reviews/${review_id}`;

    fetch(getReviewSpecsUrl)
      .then((res) => res.json())
      .then(({ friendly_for, rating, review }) => {
        this.setState({
          friendly_for: {
            value: friendly_for,
            touched: this.state.friendly_for.touched,
          },
          rating: { 
            value: rating, 
            touched: this.state.rating.touched 
          },
          review: { 
            value: review, 
            touched: this.state.quantity.touched 
          },
        });
      })

      .catch((error) => this.setState({ error }));
  }

  updateReview = (event) => {
    // console.log('hello there')
    event.preventDefault();
    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    let reviewer_id = TokenService.getUserId();

    let { friendly_for, rating, review } = data;

    let payload = {
      reviewer_id: reviewer_id,
      friendly_for: friendly_for,
      rating: rating,
      review: review,
    };
    // console.log(payload);

    fetch(`${config.API_ENDPOINT}/tools/${this.props.location.review_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        window.location = "/tools";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let showReviewSpecs = "";
    showReviewSpecs = (
      <div className="edit-review">
        <form className="edit-review-form" onSubmit={this.updateReview}>
          <h3>Edit your review of (business_name, business_zip)</h3>
          <label htmlFor="friendly_for">-friendly identity:</label>
          <select
            id="friendly_for"
            name="friendly_for"
            value={this.state.friendly_for.value}
            onChange={(e) => this.changeFriendlyFor(e.target.value)}
            required
          >
            <option value="POC">Black, Asian/Pacific Islander, Latinx, and Indigenous persons</option>
            <option value="disabled-persons">Disabled persons</option>
            <option value="migrants-immigrants">Migrants/Immigrants</option>
            <option value="LGBTQIA+">LGBTQIA+</option>
            <option value="women">Women</option>
          </select>
          <label htmlFor="rating">rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={this.state.rating.value}
            onChange={(e) => this.changeRating(e.target.value)}
            required
          />
          {this.state.rating.touched && (
            <ValidationError message={this.validateRating()} />
          )}
          <label htmlFor="review">review:</label>
          <input
            type="text"
            id="review"
            name="review"
            value={this.state.review.value}
            onChange={(e) => this.changeReview(e.target.value)}
            required
          />
          {this.state.review.touched && (
            <ValidationError message={this.validateReview()} />
          )}
          <div className="buttons">
            <NavLink to="/tools">
              <button>
                <FontAwesomeIcon icon={faStepBackward} /> Cancel
              </button>
            </NavLink>
            <button type="submit">
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
          </div>
          <input type="submit" className="hidden"></input>
        </form>
      </div>
    );

    return <div>{showReviewSpecs}</div>;
  }
}
