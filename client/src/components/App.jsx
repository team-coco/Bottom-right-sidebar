import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      business: [{}],
      postalCode: Number,
      matchBiz1: [{}],
      matchBiz2: [{}],
      matchBiz3: [{}],
      tip1: null,
      tip2: null,
      tip3: null,
      photo1: null,
      photo2: null,
      photo3: null,
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
        console.log(response.data, "we expect 3 matching businesses");
        var biz1 = response.data[0];
        var biz2 = response.data[1];
        var biz3 = response.data[2];
        this.setState({ matchBiz1: biz1 });
        this.setState({ matchBiz2: biz2 });
        this.setState({ matchBiz3: biz3 });
        this.fetchTips(this.state.matchBiz1.id);
        this.fetchTips(this.state.matchBiz2.id);
        this.fetchTips(this.state.matchBiz3.id);
        this.fetchPhotos(this.state.matchBiz1.id);
        this.fetchPhotos(this.state.matchBiz2.id);
        this.fetchPhotos(this.state.matchBiz3.id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchPhotos(bizId) {
    axios
      .get("/sidebar/photos/" + bizId)
      .then(response => {
        if (this.state.photo1 === null) {
          this.setState({ photo1: response.data[0].id });
        } else if (this.state.photo2 === null) {
          this.setState({ photo2: response.data[0].id });
        } else if (this.state.photo3 === null) {
          this.setState({ photo3: response.data[0].id });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchTips(bizId) {
    axios
      .get("/sidebar/businessTips/" + bizId)
      .then(response => {
        if (this.state.tip1 === null) {
          this.setState({ tip1: response.data[0].text });
        } else if (this.state.tip2 === null) {
          this.setState({ tip2: response.data[0].text });
        } else if (this.state.tip3 === null) {
          this.setState({ tip3: response.data[0].text });
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
              src={`https://s3-media3.fl.yelpcdn.com/bphoto/${
                this.state.photo1
              }/120s.jpg`}
            />{" "}
            <span className="rightsb_matchBiz">
              {this.state.matchBiz1.name}
            </span>
          </span>{" "}
        </p>
        <p className="rightsb_review_count">
          {" "}
          {this.state.matchBiz1.stars} stars {this.state.matchBiz1.review_count}{" "}
          reviews
        </p>
        <p className="rightsb_tips">{this.state.tip1}</p>
        <p className="rightsb_business">
          {" "}
          <span>
            <img
              className="image_biz"
              src={`https://s3-media3.fl.yelpcdn.com/bphoto/${
                this.state.photo2
              }/120s.jpg`}
            />{" "}
            <span className="rightsb_matchBiz">
              {this.state.matchBiz2.name}
            </span>
          </span>
        </p>

        <p className="rightsb_review_count">
          {this.state.matchBiz2.stars} stars {"    "}
          {this.state.matchBiz2.review_count} reviews
        </p>
        <p className="rightsb_tips">{this.state.tip2}</p>
        <p className="rightsb_business">
          {" "}
          <span>
            <img
              className="image_biz"
              src={`https://s3-media3.fl.yelpcdn.com/bphoto/${
                this.state.photo3
              }/120s.jpg`}
            />{" "}
            <span className="rightsb_matchBiz">
              {this.state.matchBiz3.name}
            </span>
          </span>
        </p>
        <p className="rightsb_review_count">
          {" "}
          {this.state.matchBiz3.stars} stars {"  "}
          {this.state.matchBiz3.review_count} reviews
        </p>
        <p className="rightsb_tips">{this.state.tip3}</p>
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
            {"  "}
          </span>Restaurants
        </p>
        <p className="rightsb_listitem">
          {" "}
          <span>
            <img className="image" src={"https://i.imgur.com/f3RdwOP.png"} />
            {"  "}
          </span>Nightlife
        </p>
        <p className="rightsb_listitem">
          {" "}
          <span>
            <img className="image" src={"https://i.imgur.com/2sYyjqj.jpg"} />
            {"  "}
          </span>Shopping
        </p>
        <p className="rightsb_listitem">
          <span>
            <img className="image" src={"https://i.imgur.com/aAnrFk2.png"} />
            {"  "}
          </span>Show All
        </p>
        <h2 className="rightsb_subheader">
          Dining in {this.state.business[0].city}
        </h2>
        <p className="rightsb_listitem">
          <span>
            <img className="image" src={"https://i.imgur.com/rAokCAc.jpg"} />
            {"  "}
            {"  "}
          </span>Search for Reservations
        </p>
        <p className="rightsb_listitem">
          <span>
            <img className="image" src={"https://i.imgur.com/gc2EsDX.png"} />
            {"  "}
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
