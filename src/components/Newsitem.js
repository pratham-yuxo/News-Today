import React, { Component } from 'react'
import no_image from "./no_image.jpg";
import {Animated} from "react-animated-css";
export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;//yha hai js destructuring, it will pull title from a object (props
    return (
      <Animated animationIn="bounceInLeft" animationInDuration={2500} isVisible={true} style={{width:"100%"}}>

      <div className='my-3'>
        <div className="card" >
          <img src={imageUrl===null?no_image:imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title.length<88?title:title.slice(0,88)+"..."}</h5>
            <span className="badge bg-secondary">{source}</span>
            <p className="card-text hit">{description!==null?description.slice(0,150)+"...":"description not found"}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author.slice(0,10)+"..."} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">Read more</a>
          </div>
        </div>
      </div>
      </Animated>
    )
  }
}

export default Newsitem
// d=new date(a);            making a date object
// d.toGMTString();           converting into a gmt type date

