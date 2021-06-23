import React, { Component } from "react";
import config from "../config";
import { NavLink } from "react-router-dom";
import TokenService from "../services/token-service";
import ValidationError from "../ValidationError";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useParams } from 'react-router-dom';

export default class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      existingBusiness: [],
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

    //if the user is not logged in, send to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    let business_id = this.props.match.params.business_id;
    // console.log(business_id)

    fetch(`${config.API_ENDPOINT}/businesses/${business_id}`, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson)
        this.setState({
          existingBusiness: resJson,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addReview(e) {
    e.preventDefault();

    const data = {};

    const formData = new FormData(e.target);

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
    // console.log(payload)



    fetch(`${config.API_ENDPOINT}/reviews`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson)
        window.location = "/me-friendly";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // console.log(this.state.existingBusiness)
    return (
      <div className="add-review">
        <form className="add-review-form" onSubmit={this.addReview}>
          <h3>Write a review of {this.state.existingBusiness.name}, {this.state.existingBusiness.zipcode}</h3>
          <label htmlFor="friendly_for">-friendly identity:</label>
          <select
            id="friendly_for"
            name="friendly_for"
            onChange={(e) => this.changeFriendlyFor(e.target.value)}
            required
          >
            <option value="select" defaultValue>select a -friendly identity</option>
            <option value="Black, Asian/Pacific Islander, Latinx, and Indigenous persons">Black, Asian/Pacific Islander, Latinx, and Indigenous persons</option>
            <option value="Disabled persons">Disabled persons</option>
            <option value="Migrants/Immigrants">Migrants/Immigrants</option>
            <option value="LGBTQIA+">LGBTQIA+</option>
            <option value="women">Women</option>
          </select>
          {this.state.friendly_for.touched && (
            <ValidationError message={this.validateFriendlyFor()} />
          )}
          <label htmlFor="rating">rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
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
            onChange={(e) => this.changeReview(e.target.value)}
            required
          />
          {this.state.review.touched && (
            <ValidationError message={this.validateReview()} />
          )}
          <div className="buttons">
            <NavLink to="/businesses">
              <button>
                <FontAwesomeIcon icon={faStepBackward} /> cancel
              </button>
            </NavLink>
            <button type="submit">
              <FontAwesomeIcon icon={faSave} /> save
            </button>
          </div>
          <input type="hidden" name="business_id" defaultValue={this.state.existingBusiness.id}></input>
        </form>
      </div>
    );
  }
}
