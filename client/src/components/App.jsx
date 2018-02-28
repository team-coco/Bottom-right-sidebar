import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      business: [{}]
    };
  }
  componentDidMount() {
    axios
      .get("/repos")
      .then(response => {
        this.setState({ business: response.data });
        console.log(this.state.business[0].city);
        // we are getting city in the console so accessing is correct
        console.log(response, "THIS IS RESPONSE AND SHOULD BE ON WEBPAGE");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1 className="rightsb_header">Things to Consider</h1>
        <h2 className="rightsb_subheader">People Also Viewed</h2>
        <li className="rightsb_listitem">img Place 1</li>
        <li className="rightsb_listitem">img Place 2</li>
        <li className="rightsb_listitem">img Place 3</li>
        <h2 className="rightsb_subheader">Other Places Nearby</h2>
        <li className="rightsb_listitem">
          Find more Places Near {this.state.business[0].name}
        </li>
        <li className="rightsb_listitem">
          Find more Burgers Near {this.state.business[0].name}
        </li>
        <li className="rightsb_listitem">
          Find more Sandwiches Near {this.state.business[0].name}
        </li>
        <h2 className="rightsb_subheader">Browse Nearby</h2>
        <li className="rightsb_listitem">Restaurants</li>
        <li className="rightsb_listitem">Nightlife</li>
        <li className="rightsb_listitem">Shopping</li>
        <li className="rightsb_listitem">...Show All</li>
        <h2 className="rightsb_subheader">
          Dining in {this.state.business[0].city}
        </h2>
        <li className="rightsb_listitem">Restaurants</li>
        <li className="rightsb_listitem">Nightlife</li>
        <li className="rightsb_listitem">Shopping</li>
        <li className="rightsb_listitem">...Show All</li>
      </div>
    );
  }
}

export default App;
