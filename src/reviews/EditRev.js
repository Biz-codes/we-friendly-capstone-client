import React, { Component } from "react";
import config from "../config";
import { NavLink } from "react-router-dom";
import TokenService from "../services/token-service";
import ValidationError from "../ValidationError";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class EditRev extends Component {
  constructor(props) {
    super(props);
    this.state = {
      existingReview: [],
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
  }
  

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

  validateFriendlyFor() {
    const friendly_for = this.state.friendly_for.trim();
    if (friendly_for == "select") {
      return <p className="input-error">-friendly identity is required</p>
    }
  }

  validateRating() {
    const rating = this.state.rating.value.trim();
    if (rating.length === 0) {
      return <p className="input-error">rating is required</p>
    } else if (rating < 1 || rating > 5) {
        return (
          <p className="input-error">rating must be from 1 to 5</p>
        )
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
    console.log(currentUser);

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    let review_id = this.props.match.params.review_id;

    fetch(`${config.API_ENDPOINT}/reviews/${review_id}`, {
      headers: {"content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson)
        this.setState({
          existingReview: resJson,
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }

  updateReview = (event) => {
    event.preventDefault();
    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    let reviewer_id = TokenService.getUserId();

    let { business_id, friendly_for, rating, review } = data;

    let payload = {
      reviewer_id: reviewer_id,
      business_id: business_id,
      friendly_for: friendly_for,
      rating: rating,
      review: review,
    };
    // console.log(payload);
    

    fetch(`${config.API_ENDPOINT}/reviews/${this.props.match.params.review_id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {"content-type": "application/json"},
      
    })
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson)
        window.location = "/me-friendly";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.state.existingReview)
    return (
      <div className="edit-review">
        <form className="edit-review-form" onSubmit={this.updateReview}>
          <h3>Edit your review: </h3>
          <label htmlFor="friendly_for">-friendly identity:</label>
          <select
            id="friendly_for"
            name="friendly_for"
            defaultValue={this.state.existingReview.friendly_for}
            onChange={(e) => this.changeFriendlyFor(e.target.value)}
            required
          >
            <option value="select" disabled>select a -friendly identity</option>
            {this.state.existingReview.friendly_for == "Black, Asian/Pacific Islander, Latinx, and Indigenous persons" ? (
              <option value="Black, Asian/Pacific Islander, Latinx, and Indigenous persons" selected>
                Black, Asian/Pacific Islander, Latinx, and Indigenous persons
              </option>
            ) : (
              <option value="Black, Asian/Pacific Islander, Latinx, and Indigenous persons">Black, Asian/Pacific Islander, Latinx, and Indigenous persons</option>
            )}

            {this.state.existingReview.friendly_for == "Disabled persons" ? (
              <option value="Disabled persons" selected>
              Disabled persons
              </option>
            ) : (
              <option value="Disabled persons">Disabled persons</option>
            )}

            {this.state.existingReview.friendly_for == "Migrants/Immigrants" ? (
              <option value="Migrants/Immigrants" selected>
              Migrants/Immigrants
              </option>
            ) : (
              <option value="Migrants/Immigrants">Migrants/Immigrants</option>
            )}

            {this.state.existingReview.friendly_for == "LGBTQIA+" ? (
              <option value="LGBTQIA+" selected>
              LGBTQIA+
              </option>
            ) : (
              <option value="LGBTQIA+">LGBTQIA+</option>
            )}

            {this.state.existingReview.friendly_for == "Women" ? (
              <option value="Women" selected>
              Women
              </option>
            ) : (
              <option value="Women">Women</option>
            )}

          </select>
          <label htmlFor="rating">rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            defaultValue={this.state.existingReview.rating}
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
            defaultValue={this.state.existingReview.review}
            onChange={(e) => this.changeReview(e.target.value)}
            required
          />
          {this.state.review.touched && (
            <ValidationError message={this.validateReview()} />
          )}
          <div className="buttons">
            <NavLink to="/me-friendly">
              <button>
                <FontAwesomeIcon icon={faStepBackward} /> cancel
              </button>
            </NavLink>
            <button type="submit">
              <FontAwesomeIcon icon={faSave} /> save
            </button>
          </div>
          {/* <input type="hidden" name="review_id" defaultValue={this.state.existingReview.id}></input> */}
          <input type="hidden" name="business_id" defaultValue={this.state.existingReview.business_id}></input>
        </form>
      </div>
    );

  }
}
