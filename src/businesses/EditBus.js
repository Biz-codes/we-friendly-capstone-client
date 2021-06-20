import React, { Component } from "react";
import config from "../config";
import { NavLink } from "react-router-dom";
import TokenService from "../services/token-service";
import ValidationError from "../ValidationError";
import { faSave, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isURL from 'validator/lib/isURL';

export default class EditBus extends Component {
  state = {
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

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = "/";
    }

    let business_id = this.props.location.business_id;

    let getBusinessSpecsUrl = `${config.API_ENDPOINT}/businesses/${business_id}`;

    fetch(getBusinessSpecsUrl)
      .then((res) => res.json())
      .then(({ name, category, address, city, state, zipcode, website }) => {
        this.setState({
          name: {
            value: name,
            touched: this.state.name.touched,
          },
          category: { 
            value: category, 
            touched: this.state.category.touched 
          },
          address: { 
            value: address, 
            touched: this.state.address.touched 
          },
          city: {
            value: city,
            touched: this.state.city.touched
          },
          state: {
            value: state,
            touched: this.state.state.touched
          },
          zipcode: {
            value: zipcode,
            touched: this.state.zipcode.touched
          },
          website: {
            value: website,
            touched: this.state.website.touched
          }
        });
      })

      .catch((error) => this.setState({ error }));
  }

  updateBusiness = (event) => {
    // console.log('hello there')
    event.preventDefault();
    const data = {};

    const formData = new FormData(event.target);

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
    // console.log(payload);

    fetch(`${config.API_ENDPOINT}/businesses/${this.props.location.business_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        window.location = "/me-friendly";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let showBusinessSpecs = "";
    showBusinessSpecs = (
      <div className="edit-business">
        <form className="edit-business-form" onSubmit={this.updateBusiness}>
          <h3>Edit the details for this business or service:</h3>
          <label htmlFor="business_name">business name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name.value}
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
            value={this.state.category.value}
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
            value={this.state.address.value}
            onChange={(e) => this.changeAddress(e.target.value)}
            required
          />
          
          <label htmlFor="city">city:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={this.state.city.value}
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
            value={this.state.state.value}
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
            value={this.state.zipcode.value}
            onChange={(e) => this.changeZipcode(e.target.value)}
            required
          />
          {this.state.address.touched && (
            <ValidationError message={this.validateZipcode()} />
          )}
          <label htmlFor="website">website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={this.state.website.value}
            onChange={(e) => this.changeWebsite(e.target.value)}
            required
          />
          {this.state.address.touched && (
            <ValidationError message={this.validateWebsite()} />
          )}
          

          <div className="buttons">
            <NavLink to="/me-friendly">
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

    return <div>{showBusinessSpecs}</div>;
  }
}
