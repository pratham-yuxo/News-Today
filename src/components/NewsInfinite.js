import React, { Component } from 'react'
import { Newsitem } from "./Newsitem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types'//impt
import InfiniteScroll from "react-infinite-scroll-component";
import filter from "./filter.png";
// import {Animated} from "react-animated-css";
import {
  Link
} from "react-router-dom";
export class News extends Component {
  //will run after render
  state = {
    isopen: false
  }
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  openFilter = () => {
    this.state.isopen ? this.setState({ isopen: false }) : this.setState({ isopen: true })
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  constructor(props) {
    super(props);
    this.props.toggle_for_navbar("black");
    this.props.makeUnderline(this.props.value);
    // this.props.toggle_for_navbar();
    this.state = {
      articles: [],
      load: false,
      page: 1,
      totalResults: 0,
      item:"general",
      url:`https://newsapi.org/v2/top-headlines?country=${this.props.country}&language=${this.props.lang}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`,
      lang:this.props.lang
        }
    document.title = `Newsapp-${this.capitalize(this.props.category)}`;
  }
  async updateData() {

    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&language=${this.state.lang}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // const url=this.props.url;
    this.setState({
      load: true
    })
    let data = await fetch(url);
    this.props.setProgress(40);
    
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      load: false
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateData();
  }
  fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&language=${this.state.lang}&category=${this.props.category}&apiKey=5031b8fbef5b4a43a26f4e3513c64b51&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/everything?q=null&apiKey=5031b8fbef5b4a43a26f4e3513c64b51`;
    this.setState({ page: this.state.page + 1 });
    // let url=this.state.url;
    this.setState({
      load: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      load: false
    });
  }

  render() {

    return (
      <>
        {/* 225.938 */}

        <div className='angleUp' onClick={this.scrollToTop }><i class="fas fa-angle-up"></i></div>
        <h1 className='text-center'>Headlines</h1>

        {/* {this.state.load && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner />}

        >
          <div className='container my-3'>
            <div className="row">
              {this.state.articles.map((element) => {
                //iterating with the use of map
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                </div>
              })}

            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}
export default News