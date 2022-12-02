import React, { Component } from "react";
import Loading from "./loading.gif";
export default class Spiner extends Component {
  render() {
    return (
      <div className="text-center my-3">
        <img src={Loading} alt="loading" />
      </div>
    );
  }
}
