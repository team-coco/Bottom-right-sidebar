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
    url =
      url.charAt(url.length - 1) === "/" ? url.substr(0, url.length - 1) : url;
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
        this.setState({ matchBiz1: biz1, matchBiz2: biz2, matchBiz3: biz3 });
        // this.setState({ matchBiz2: biz2 });
        // this.setState({ matchBiz3: biz3 });
        this.fetchTips(this.state.matchBiz1.id);
        this.fetchTips(this.state.matchBiz2.id);
        this.fetchTips(this.state.matchBiz3.id);
        this.fetchPhotos(this.state.matchBiz1.id);
        this.fetchPhotos(this.state.matchBiz2.id);
        this.fetchPhotos(this.state.matchBiz3.id);
      })
      .catch(err => {
        console.log(err, "error fetch postalCode axios");
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
        console.log(error, "error fetchphotos axios");
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
        console.log(error, "error from fetchTips axios react");
      });
  }

  render() {
    return (
      <div className="page">
        <div className="rightsb_relatedBusinesses">
          <h2 className="rightsb_subheader">People Also Viewed</h2>
          <ul className="rightsb_list">
            <li className="rightsb_business-list">
              <div className="rightsb_media-block">
                <div className="rightsb_media-avatar">
                  <div className="rightsb_image_box">
                    <img
                      className="rightsb_image_biz"
                      src={`https://s3-media3.fl.yelpcdn.com/bphoto/${
                        this.state.photo1
                      }/120s.jpg`}
                    />
                  </div>
                </div>
                <div className="rightsb_media-story">
                  <div className="rightsb_media-title">
                    {this.state.matchBiz1.name}
                  </div>
                  <div className="rightsb_bizrating">
                    <div className="rightsb_star-rating">
                      {this.state.matchBiz1.stars} STARS
                    </div>
                    <span className="rightsb_review-count">
                      {this.state.matchBiz1.review_count} reviews
                    </span>
                  </div>
                  <q className="rightsb_tips">{this.state.tip1}</q>
                </div>
              </div>
            </li>
            <li className="rightsb_business-list">
              <div className="rightsb_media-block">
                <div className="rightsb_media-avatar">
                  <div className="rightsb_image_box">
                    <img
                      className="rightsb_image_biz"
                      src={`https://s3-media3.fl.yelpcdn.com/bphoto/${
                        this.state.photo2
                      }/120s.jpg`}
                    />
                  </div>
                </div>
                <div className="rightsb_media-story">
                  <div className="rightsb_media-title">
                    {this.state.matchBiz2.name}
                  </div>
                  <div className="rightsb_bizrating">
                    <div className="rightsb_star-rating">
                      {this.state.matchBiz2.stars} STARS
                    </div>
                    <span className="rightsb_review-count">
                      {this.state.matchBiz2.review_count} reviews
                    </span>
                  </div>
                  <q className="rightsb_tips">{this.state.tip2}</q>
                </div>
              </div>
            </li>
            <li className="rightsb_business-list">
              <div className="rightsb_media-block">
                <div className="rightsb_media-avatar">
                  <div className="rightsb_image_box">
                    <img
                      className="rightsb_image_biz"
                      src={`https://s3-media3.fl.yelpcdn.com/bphoto/${
                        this.state.photo3
                      }/120s.jpg`}
                    />
                  </div>
                </div>
                <div className="rightsb_media-story">
                  <div className="rightsb_media-title">
                    {this.state.matchBiz3.name}
                  </div>
                  <div className="rightsb_bizrating">
                    <div className="rightsb_star-rating">
                      {this.state.matchBiz3.stars} STARS
                    </div>
                    <span className="rightsb_review-count">
                      {this.state.matchBiz3.review_count} reviews
                    </span>
                  </div>
                  <q className="rightsb_tips">{this.state.tip3}</q>
                </div>
              </div>
            </li>
          </ul>
          <div className="rightsb_other-places-nearby">
            <h3 className="rightsb_subheader">Other Places Nearby</h3>
            <ul className="rightsb_list">
              <li className="rightsb_other-list-item">
                <a className="rightsb_other-list-item-arrange">
                  Find more Places Near {this.state.business[0].name}
                </a>
              </li>
              <li className="rightsb_other-list-item">
                <a className="rightsb_other-list-item-arrange">
                  Find more Lunch Near {this.state.business[0].name}
                </a>
              </li>
              <li className="rightsb_other-list-item">
                <a className="rightsb_other-list-item-arrange">
                  Find more Dinner Near {this.state.business[0].name}
                </a>
              </li>
            </ul>
          </div>
          <div className="rightsb_browse-nearby">
            <h3 className="rightsb_subheader">Browse Nearby</h3>
            <ul className="rightsb_list">
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/YVTtcKY.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span>Restaurants</span>
                </a>
              </li>
              <li>
                {" "}
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/f3RdwOP.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span>Nightlife</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/2sYyjqj.jpg/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span>Shopping</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/aAnrFk2.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span>Show All</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="rightsb_subheader">
              Dining in {this.state.business[0].city}
            </h3>
            <ul className="rightsb_list">
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/rAokCAc.jpg/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span>Search for Reservations</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="rightsb_static-icon">
                    <img
                      className="rightsb_icon"
                      src={"https://i.imgur.com/gc2EsDX.png/120.jpg"}
                    />
                    {"  "}
                  </span>
                  <span>Book a table in {this.state.business[0].city}</span>
                </a>
              </li>
            </ul>
          </div>
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
      </div>
    );
  }
}

export default App;
