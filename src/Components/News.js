import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      lodding: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `India News - ${this.props.category}`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c49bf88af00449eb240154372e03621&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a36c66757d64d278a8f270cd07c7705&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ lodding: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      lodding: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=5c49bf88af00449eb240154372e03621&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    // let url1 = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a36c66757d64d278a8f270cd07c7705&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container" style={{ marginTop: "70px" }}>
          <h1 className="text-center">{`India News - Top ${this.props.category} Headlines`}</h1>
        </div>
        {this.state.lodding && <Spiner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spiner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((elm, index) => {
                return (
                  <div className="col-md-3" key={index}>
                    <NewsItem
                      title={elm.title ? elm.title : ""}
                      descripton={elm.description ? elm.description : ""}
                      imgUrl={elm.urlToImage}
                      newsUrl={elm.url}
                      author={elm.author}
                      publishedAt={elm.publishedAt}
                      source={elm.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
