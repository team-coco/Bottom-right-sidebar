import React from "react";
import ReactDOM from "react-dom";
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
      tip1: {
        text: null,
        trigger: false
      },
      tip2: {
        text: null,
        trigger: false
      },
      tip3: {
        text: null,
        trigger: false
      },
      image1: [{}],
      image2: [{}],
      image3: [{}]
    };
  }

  componentDidMount() {
    var url = window.location.href.split("/").pop();
    url = url.split("?");
    axios
      .get("/sidebar/business/" + url[0])
      .then(response => {
        this.setState({ business: response.data });
      })
      .then(() => {
        var postalCode = this.state.business[0].postal_code;
        var bizId = this.state.business[0].id;
        this.setState({ postalCode: postalCode });
        this.fetchBusinessIds(postalCode);
      })
      .catch(err => {
        console.log(err, "this is the error in the componentDidMount");
      });
  }

  fetchBusinessIds(postalCode) {
    axios
      .get("/sidebar/postalCode/" + postalCode)
      .then(response => {
        var biz1 = response.data[0];
        var biz2 = response.data[1];
        var biz3 = response.data[2];
        this.setState({ matchingBiz1: biz1 });
        this.setState({ matchingBiz2: biz2 });
        this.setState({ matchingBiz3: biz3 });
      })
      .then(() => {
        this.fetchTips(this.state.matchingBiz1.id);
        // this.fetchTips(this.state.matchingBiz2.id);
        // this.fetchTips(this.state.matchingBiz3.id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchTips(bizId) {
    axios
      .get("/sidebar/businessTips/" + bizId)
      .then(response => {
        if (this.state.tip1.text === null) {
          this.setState({ tip1: response.data });
          // use spread operator here
        }
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
        <p className="rightsb_business">
          {" "}
          <span>
            <img
              className="image_biz"
              src={"https://i.imgur.com/STjU6M1.jpg"}
            />
            {this.state.matchingBiz1.name}
          </span>{" "}
        </p>
        <p className="rightsb_review_count">
          {" "}
          {this.state.matchingBiz1.stars} stars{" "}
          {this.state.matchingBiz1.review_count} reviews
        </p>
        <p className="rightsb_business">
          {" "}
          <span>
            <img
              className="image_biz"
              src={"https://i.imgur.com/HyYYsQT.jpg"}
            />
          </span>{" "}
          {this.state.matchingBiz2.name}
        </p>

        <p className="rightsb_review_count">
          {this.state.matchingBiz2.stars} stars {"    "}
          {this.state.matchingBiz2.review_count} reviews
        </p>
        <p className="rightsb_business">
          {" "}
          <span>
            <img
              className="image_biz"
              src={"https://i.imgur.com/L6Kql0e.jpg"}
            />
          </span>{" "}
          {this.state.matchingBiz3.name}
        </p>
        <p className="rightsb_review_count">
          {" "}
          {this.state.matchingBiz3.stars} stars
          {this.state.matchingBiz3.review_count} reviews
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
        <p className="rightsb_listitem">Food {this.state.business[0].city}</p>
        <h2 className="rightsb_subheader">Near Me</h2>
        <p className="rightsb_listitem">Dinner</p>
        <p className="rightsb_listitem">Lunch</p>
        <p className="rightsb_listitem">Breakfast</p>
      </div>
    );
  }
}

export default App;
