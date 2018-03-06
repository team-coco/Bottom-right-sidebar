import React from "react";
import ReactDOM from "react-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      business: [{}],
      postalCode: Number,
      matchingBiz1: [{}],
      matchingBiz2: [{}],
      matchingBiz3: [{}],
      tip1: [{}],
      tip2: [{}],
      tip3: [{}]
    };
  }

  componentDidMount() {
    var url = window.location.href.split("/").pop();
    url = url.split("?");
    console.log(url[0], "this is url[0]");
    axios
      .get("http://localhost:3002/yelp/repos/" + url[0])
      .then(response => {
        this.setState({ business: response.data });
        console.log(response.data, "THIS IS RESPONSE AND SHOULD BE ON WEBPAGE");
      })
      .then(() => {
        var postalCode = this.state.business[0].postal_code;
        console.log(this.state.business[0].postal_code, "this is here");
        this.setState({ postalCode: postalCode });
        this.fetchBusinessIds(postalCode);
        console.log(this.state.postalCode, "this is the second promise");
        // send query to db with new biz ID
      })
      .then(() => {
        console.log("we are here now");
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchBusinessIds(postalCode) {
    axios
      .get("http://localhost:3002/yelp/postalCode/" + postalCode)
      .then(response => {
        this.setState({ matchingBiz1: response.data[0] });
        this.setState({ matchingBiz2: response.data[1] });
        this.setState({ matchingBiz3: response.data[2] });
        console.log(response, "these should be 3 matching zip businesses");
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchTips() {
    axios
      .get("http://localhost:3002/yelp/businessTips")
      .then(response => {
        console.log(response, "this is response from fetchTips axios react");
        this.setState({ tip1: response.data[0] });
        this.setState({ tip2: response.data[1] });
        this.setState({ tip3: response.data[2] });
      })
      .catch(error => {
        console.log(error, "this is error from fetchTips axios react");
      });
  }

  render() {
    return (
      <div className="page">
        <h1 className="rightsb_header">Things to Consider</h1>
        <h2 className="rightsb_subheader">People Also Viewed</h2>
        <p className="rightsb_listitem">img {this.state.matchingBiz1.name}</p>
        <p className="rightsb_review_count">
          {" "}
          {this.state.matchingBiz1.stars} stars{" "}
          {this.state.matchingBiz1.review_count} reviews{" "}
        </p>
        <p className="rightsb_listitem">img {this.state.matchingBiz2.name}</p>

        <p className="rightsb_review_count">
          {this.state.matchingBiz2.stars} stars {"    "}
          {this.state.matchingBiz2.review_count} reviews{" "}
        </p>
        <p className="rightsb_listitem">img {this.state.matchingBiz3.name}</p>
        <p className="rightsb_review_count">
          {" "}
          {this.state.matchingBiz3.stars} stars
          {this.state.matchingBiz3.review_count} reviews{" "}
        </p>
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
          <span>
            <img className="image" src={"https://i.imgur.com/YVTtcKY.png"} />
          </span>Restaurants
        </p>
        <p className="rightsb_listitem">
          {" "}
          <span>
            <img className="image" src={"https://i.imgur.com/f3RdwOP.png"} />
          </span>Nightlife
        </p>
        <p className="rightsb_listitem">
          {" "}
          <span>
            <img className="image" src={"https://i.imgur.com/2sYyjqj.jpg"} />
          </span>Shopping
        </p>
        <p className="rightsb_listitem">
          <span>
            <img className="image" src={"https://i.imgur.com/aAnrFk2.png"} />
          </span>Show All
        </p>
        <h2 className="rightsb_subheader">
          Dining in {this.state.business[0].city}
        </h2>
        <p className="rightsb_listitem">
          <span>
            <img className="image" src={"https://i.imgur.com/rAokCAc.jpg"} />
          </span>Search for Reservations
        </p>
        <p className="rightsb_listitem">
          <span>
            <img className="image" src={"https://i.imgur.com/gc2EsDX.png"} />
          </span>Book a table in {this.state.business[0].city}
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
