import React, { Component } from 'react';

export default class SearchBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  onSubmit(e) {
      e.preventDefault();
      
  }


  render() {
    
    return (
      <form className="search-bar">
        <input 
          type="text"
          placeholder="Type a business name to search"
          value={this.state.searchTerm}
          onChange={(e) => this.onInputChange(e.target.value)}
        />

      </form>
    );
  }
  onInputChange(searchTerm) {
    this.setState({searchTerm});
    this.props.onSearchTermChange(searchTerm)
  }
}