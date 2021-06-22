import React, { Component } from "react";
import config from "../config";
import { NavLink } from "react-router-dom";
import TokenService from "../services/token-service";
import ValidationError from "../ValidationError";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isURL from 'validator/lib/isURL';

export default class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      category: {
        value: "",
        touched: false,
      },
      address: {
        value: "",
        touched: false,
      },
      city: {
        value: "",
        touched: false,
      },
      state: {
        value: "",
        touched: false,
      },
      zipcode: {
        value: "",
        touched: false,
      },
      website: {
        value: "",
        touched: false,
      }
    };
  }

  changeBusinessName(name) {
    this.setState({
      name: { value: name, touched: true },
    });
  }

  changeCategory(category) {
    this.setState({
      category: { value: category, touched: true },
    });
  }

  changeCity(city) {
    this.setState({
      city: { value: city, touched: true },
    });
  }

  changeState(state) {
    this.setState({
      state: { value: state, touched: true },
    });
  }

  changeZipcode(zipcode) {
    this.setState({
      zipcode: { value: zipcode, touched: true },
    });
  }

  changeWebsite(website) {
    this.setState({
      website: { value: website, touched: true },
    });
  }

  changeAddress(address) {
    this.setState({
      address: { value: address, touched: true },
    });
  }

  validateBusinessName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return <p className="input-error">Business name is required</p>;
    } else if (name.length < 2) {
      return (
        <p className="input-error">
          Business name must be at least 2 characters long
        </p>
      );
    }
  }

  validateCity() {
    const city = this.state.city.value.trim();
    if (city.length === 0) {
      return <p className="input-error">City is required</p>;
    } else if (city.length < 2) {
      return (
        <p className="input-error">
          City name must be at least 2 characters long
        </p>
      );
    }
  }

  validateZipcode() {
    const zipcode = this.state.zipcode.value.trim();
    if (zipcode.length === 0) {
      return <p className="input-error">Zipcode is required</p>;
    } else if (zipcode.length !== 5) {
      return <p className="input-error">Zipcode must be 5 digits</p>
    }
  }

  validateWebsite() {
    const website = this.state.website.value.trim();
    if (website.length === 0) {
      return <p className="input-error">Website is required</p>;
    } else if (!isURL(website)) {
      return (
        <p className="input-error">
          Must be a valid website.
        </p>
      );
    }
  }

  componentDidMount() {
    let currentUser = TokenService.getUserId();
    // console.log(currentUser);

    //if the user is not logged in, send to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }
  }

  addBusiness(e) {
    e.preventDefault();

    const data = {};

    const formData = new FormData(e.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    let adder_id = TokenService.getUserId();

    let { name, category, address, city, state, zipcode, website } = data;

    let payload = {
      adder_id: adder_id,
      name: name,
      category: category,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      website: website

    };
    console.log(payload)

    fetch(`${config.API_ENDPOINT}/businesses`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        window.location = "/businesses";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="add-business">
        <form className="add-business-form" onSubmit={this.addBusiness}>
          <h3>Add a business or service:</h3>
          <label htmlFor="name">business/service name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => this.changeBusinessName(e.target.value)}
            required
          />
          {this.state.name.touched && (
            <ValidationError message={this.validateBusinessName()} />
          )}
          <label htmlFor="category">category:</label>
          <select 
            id="category"
            name="category"
            onChange={(e) => this.changeCategory(e.target.value)}
            required
          >
            <option value="restaurant-bar">restaurant/bar</option>
            <option value="shopping">shopping</option>
            <option value="hotel/accommodations">hotel/accommodations</option>
            <option value="service">service</option>
            <option value="housing/realty">housing/realty</option>
            <option value="education">education</option>
            <option value="healthcare">healthcare</option>
          </select>
          
          <label htmlFor="address">address:</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={(e) => this.changeAddress(e.target.value)}
            required
          />
          
          <label htmlFor="city">city:</label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={(e) => this.changeCity(e.target.value)}
            required
          />
          {this.state.state.touched && (
            <ValidationError message={this.validateCity()} />
          )}
          <label htmlFor="state">state:</label>
          <select
            id="state"
            name="state"
            onChange={(e) => this.changeState(e.target.value)}
            required
          >
            <option value="AK">AK</option>
            <option value="AL">AL</option>
            <option value="AR">AR</option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="IA">IA</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="MA">MA</option>
            <option value="MD">MD</option>
            <option value="ME">ME</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MO">MO</option>
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="NE">NE</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NV">NV</option>
            <option value="NY">NY</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VA">VA</option>
            <option value="VT">VT</option>
            <option value="WA">WA</option>
            <option value="WI">WI</option>
            <option value="WV">WV</option>
            <option value="WY">WY</option>
            <option value="DC">DC</option>
            <option value="AS">AS</option>
            <option value="GU">GU</option>
            <option value="MP">MP</option>
            <option value="PR">PR</option>
            <option value="VI">VI</option>
          </select>
          
          <label htmlFor="zipcode">zipcode:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            onChange={(e) => this.changeZipcode(e.target.value)}
            required
          />
          {this.state.address.touched && (
            <ValidationError message={this.validateZipcode()} />
          )}
          <label htmlFor="website">website:</label>
          <input
            type="url"
            id="website"
            name="website"
            onChange={(e) => this.changeWebsite(e.target.value)}
            required
          />
          {this.state.address.touched && (
            <ValidationError message={this.validateWebsite()} />
          )}
          

          <div className="buttons">
            <NavLink to="/businesses">
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
  }
}
