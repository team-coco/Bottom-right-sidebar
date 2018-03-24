import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.css";
import RightBottomSidebar from "./components/App.jsx";

let url = window.location.href.split("/").pop();
url.charAt(url.length - 1) === "/" ? url.substr(0, url.length - 1) : url;

ReactDOM.hydrate(
  <RightBottomSidebar businessId={url[0]} initialState={window.__SIDEBAR_INITIAL_STATE__}/>,
  document.getElementById("right_bottom_sidebar")
);
