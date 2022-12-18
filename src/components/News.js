import React, { Component } from 'react'
import { Newsitem } from "./Newsitem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types'//impt
export class News extends Component {
  //will run after render
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
  capitalize=(string)=>{
        return string.charAt(0).toUpperCase()+ string.slice(1);  
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      load: false,
      page: 1
    }
    document.title=`Newsapp-${this.capitalize(this.props.category)}`;
  }
  async updateData() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5031b8fbef5b4a43a26f4e3513c64b51&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      load: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      load: false
    });
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5031b8fbef5b4a43a26f4e3513c64b51&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      load: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      load: false
    });
    // console.log(this.state.totalResults)
    // console.log(this.state.articles.length)
    // console.log(parsedData)
  }
  componentDidUpdate(lang){

  }
  preClick = async () => {

    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5031b8fbef5b4a43a26f4e3513c64b51&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   load: true
    // })
    // let data = await fetch(url);
    // let parsedData= await data.json();
    //     this.setState({
    //       articles:parsedData.articles,
    //       page:this.state.page-1,
    //       load: false
    //     })
    this.setState({ page: this.state.page - 1 })
    this.updateData();

  }
  nextClick = async () => {

    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5031b8fbef5b4a43a26f4e3513c64b51&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   load: true
    // })
    // let data = await fetch(url);
    // let parsedData= await data.json();
    //     this.setState({
    //       articles:parsedData.articles,
    //       page:this.state.page+1,
    //         load: false

    //     })
    this.setState({ page: this.state.page + 1 })
    this.updateData();
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>Headlines</h1>
        {this.state.load && <Spinner />}
        <div className="row">
          {!this.state.load && this.state.articles.map((element) => {
            //iterating with the use of map
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}

        </div>

        {!this.state.load && <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.preClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button>
        </div>}
      </div>
    )
  }
}
export default News