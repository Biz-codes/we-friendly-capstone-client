import React, { Component } from 'react';

export default class SearchBus extends Component {

  render() {
    
    return (
      <form 
        className="search-form"
        onSubmit = {this.props.handleSearch}
      >
        <div className="searchBar">
          <label htmlFor="business-name">business name:</label>
          <input 
            type="text"
            name="business-name"
            required
          />
          <label htmlFor="zipcode">zipcode:</label>
          <input
            type="text"
            name="zipcode"
          />
        </div>
        <div className="filters">
          <h3>filter by:</h3>
          <label htmlFor="friendly_for">-friendly identity:</label>
          <select
            name="friendly_for"
          >
            <option value="select">select -friendly identity</option>
            <option value="POC">Black, Asian/Pacific Islander, Latinx, and Indigenous persons</option>
            <option value="disabled-persons">Disabled persons</option>
            <option value="migrants-immigrants">Migrants/Immigrants</option>
            <option value="LGBTQIA+">LGBTQIA+</option>
            <option value="women">Women</option>
          </select>

          <label htmlFor="state">state, district or territory</label>
          <select name='state'>
            <option value="select">select state</option>
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
          <label htmlFor="business-type">business/service category:</label>
          <select name="category">
            <option value="select">select category</option>
            <option value="restaurant/bar">restaurant/bar</option>
            <option value="shopping">shopping</option>
            <option value="hotel/accommodations">hotel/accommodations</option>
            <option value="service">service</option>
            <option value="housing/realty">housing/realty</option>
            <option value="education">education</option>
            <option value="healthcare">healthcare</option>
          </select>         
        </div>
        <button type="submit">search</button>
      </form>
    );
  
  }
}