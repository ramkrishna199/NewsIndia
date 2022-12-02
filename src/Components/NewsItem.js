import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, descripton, imgUrl, newsUrl, publishedAt, author, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              imgUrl
                ? imgUrl
                : "https:www.nasa.gov/sites/default/files/thumbnails/image/hubble_ngc6440.jpg"
            }
            className="card-img-top"
            alt="..."
            width="300px"
            height="180px"
          />
          <div className="card-body">
            <h5 className="card-title">
              <span className="badge text-bg-danger">{source}</span> <br />
              {title}
            </h5>
            <p className="card-text">{descripton}</p>
            <p className="card-text">
              <small className="text-muted">
                On : {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              className="btn btn-sm btn-dark"
              target="_blank"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
