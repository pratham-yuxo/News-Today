import React, { Component } from 'react'
import {
Link
  } from "react-router-dom";
  
export class Landing extends Component {
  constructor(props){
    super(props);
    this.props.toggle_for_navbar("no_black");
    this.props.makeUnderline(this.props.value);
  }
  render() {
    
    // this.props.remove_bg();
    return (
      <section className="land ">
      <div className="box">

        <p>Get news from all over the world in one click</p>
        <Link className="batan" to="/home"> <span>Start Reading</span><i></i></Link>
      </div>

    </section>
    )
  }
}

export default Landing