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
      <div className="page">
        <h1 className="rightsb_header">Things to Consider</h1>
        <h2 className="rightsb_subheader">People Also Viewed</h2>
        <p className="rightsb_listitem">img Place 1</p>
        <p className="rightsb_listitem">img Place 2</p>
        <p className="rightsb_listitem">img Place 3</p>
        <h2 className="rightsb_subheader">Other Places Nearby</h2>
        <p className="rightsb_listitem">
          Find more Places Near {this.state.business[0].name}
        </p>
        <p className="rightsb_listitem">
          Find more Burgers Near {this.state.business[0].name}
        </p>
        <p className="rightsb_listitem">
          Find more Sandwiches Near {this.state.business[0].name}
        </p>
        <h2 className="rightsb_subheader">Browse Nearby</h2>
        <p className="rightsb_listitem">
          {" "}
          <img src={"./icons/icon_restaurant.png"} />Restaurants
        </p>
        <p className="rightsb_listitem">
          {" "}
          <img src={"./icons/icon_nightlife.png"} />Nightlife
        </p>
        <p className="rightsb_listitem">
          {" "}
          <img src={"./icons/icon_shopping.jpeg"} />Shopping
        </p>
        <p className="rightsb_listitem">
          <img src={"./icons/icon_ellipsis.png"} />Show All
        </p>
        <h2 className="rightsb_subheader">
          Dining in {this.state.business[0].city}
        </h2>
        <p className="icon">
          <img src={"./icons/icon_calendar.png"} />
        </p>
        <p className="rightsb_listitem">Search for Reservations</p>
        <p className="rightsb_listitem">
          <img src={"./icons/icon_magglass.jpeg"} />
          Book a table in {this.state.business[0].city}
        </p>
        <h2 className="rightsb_subheader">
          Best of {this.state.business[0].city}
        </h2>
        <p className="rightsb_listitem">
          Things to do in {this.state.business[0].city}
        </p>
        <h2 className="rightsb_subheader">
          People found {this.state.business[0].name} by searching for...
        </h2>
        <p className="rightsb_listitem">
          "Food item" {this.state.business[0].city}
        </p>
        <h2 className="rightsb_subheader">Near Me</h2>
        <p className="rightsb_listitem">"Food item"</p>
        <p className="rightsb_listitem">"Food item2"</p>
      </div>
    );
  }
}

export default App;
