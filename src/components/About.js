import React, { Component } from 'react'
import mogo from "./mogo.png";
import{
Link
  } from "react-router-dom";
  
export class About extends Component {
  render() {
    return (
      <footer>
      <div class="footer-content">
        <h3>News Today</h3>
        <p>News Today is a news providing website with the help of an api and will allow you to get news of your choice.Our special thanks to www.newsapi.org</p>
        <ul class="socials">
          <li><a href="#"><i class="fa fa-facebook"></i></a></li>
          <li><a href="#"><i class="fa fa-twitter"></i></a></li>
          <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
          <li><a href="#"><i class="fa fa-youtube"></i></a></li>
          <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>copyright &copy; <a href="#">Kuro Ryu</a> </p>
        <div class="footer-menu">
          <ul class="f-menu">
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Contact</a></li>
            <li><a href="">Blog</a></li>
          </ul>
        </div>
      </div>
  
    </footer>
    )
  }
}

export default About