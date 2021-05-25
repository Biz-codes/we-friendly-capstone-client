import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../Nav";
import config from "../config"
import TokenService from "../services/token-service"

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolsByUserId: [],
      tools: [],
    };
  }

  componentDidMount() {

    let currentUser = TokenService.getUserId();
    console.log(currentUser)

    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()) {
      window.location = '/'
    }
    let myToolsUrl = `${config.API_ENDPOINT}/tools/my-tools/${currentUser}`;

    fetch(myToolsUrl)
      .then((tools) => tools.json())
      .then((tools) => {
        console.log(tools)
        this.setState({
          toolsByUserId: tools,
        });
        console.log(this.state);
      })

      .catch((error) => this.setState({ error }));

  }


  deleteTool(event) {
    event.preventDefault();

    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }

    console.log(data);

    let { tool_id } = data;
    console.log(tool_id);

    fetch(`${config.API_ENDPOINT}/tools/${tool_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      window.location = `/tools`;
    });
  }

  render() {
    const showTools = this.state.toolsByUserId.map((tool, key) => {
      return (
        <div className="tool-item" key={key}>
          <h3>{tool.tool_name}</h3>
          <div className="specs">
            <div className="specs-column">
              <p>Details: <br /> {tool.details}</p>
            </div>
            <div className="specs-column">
              <p>Quantity: <br /> {tool.quantity}</p>
            </div>
          </div>        
        
          <NavLink to={
            {pathname: "/edit-tool",
            tool_id: tool.id}
          }>
            <button>Edit</button>
          </NavLink>
          <form className="delete" onSubmit={this.deleteTool}>
            <input type="hidden" name="tool_id" defaultValue={tool.id}></input>          
            <button type="submit" className="delete">
              Delete
            </button>
          </form>
        </div>       
        
      );
    })

    return (
      <div className="tools" >
        <div className="nested-nav">
          <div className="page-heading">
            <h2 className="page-title">My DIY Tools</h2>
          </div>
          <div className="page-heading">
            <Nav />
        </div>

        <div className="tool-items">
          {showTools}
        </div>
        
        <div>

          <button>
          <NavLink to="/add-tool">Add tool</NavLink>
        </button></div>
      </div>
        </div>
    )
  }   
}

export default Tools;