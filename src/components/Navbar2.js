import React, { Component } from 'react'
import mogo from "./mogo.png";
import SearchBar from "material-ui-search-bar";
import filter from "./filter.png";
import {
  Link
} from "react-router-dom";
export class Navbar extends Component {
  state = {
    isopen: false,
    item:"general",
    show:true,
    lastScrollY:0,
    lang:"english"
  }
  hideOrShowNavbar=()=>{
    if (typeof window !== 'undefined') { 
      // console.log("window.scrolly", window.scrollY);
      // console.log("last scroll",this.state.lastScrollY);
      if (window.scrollY < this.state.lastScrollY) { // if scroll down hide the navbar
        this.setState({show:false})
      } else { // if scroll up show the navbar
        this.setState({show:true})  
      }

      // remember current page location to use in the next move
      this.setState({lastScrollY:window.scrollY}); 
    }
  }
  openFilter = () => {
    this.state.isopen ? this.setState({ isopen: false }) : this.setState({ isopen: true })
  }
  run=(value,fullvalue)=>{
    this.props.changeLang(value)
    this.setState({lang:fullvalue})
    this.openFilter();
    // window.scrollTo(0,document.body.scrollHeight);
  }
  componentDidUpdate(){
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.hideOrShowNavbar);

      // cleanup function
      // return () => {
      //   window.removeEventListener('scroll', this.hideOrShowNavbar);
      // };
    }
      
  }
  render() {

    let myStyle = {
      backgroundColor: this.props.bg,
      position: this.props.position
    }
    let marker = document.querySelector('#marker')
    let item = document.querySelectorAll('.list a')
    // console.log("marker", marker)
    function indicator(e) {
      if (e) {
        
        marker.style.left = e.offsetLeft + "px";
        marker.style.width = e.offsetWidth + "px";
      }

      // console.log("run")
    }
    //  console.log('inside indicator',this.props.underline)
    item.forEach(link => {
      link.addEventListener('click', (e) => {
        console.log("for", e.target)
        indicator(e.target);
      })
    })
    if (this.props.underline !== null) {
      console.log(this.props.underline)
      indicator(item[this.props.underline]);
    }
    else {
      console.log('marker', marker)
      if (marker !== null) {
        marker.style.width = "0px";

      }
    }

    return (
<>
      <div className={`navbar2 ${this.state.show&&'hidden'} `} style={myStyle}>
        <div className="cont">

          <div className="logo"><img src={mogo} alt="mogo" /></div>
          <ul className="list">
            <div id="marker"></div>
            <li className="items"><Link to="/home">Home</Link></li>
            <li className="items"><Link to="">About</Link></li>
            <li className="items"><Link to="/business">Business</Link></li>
            {/* <li className="items"><Link to="/entertainment">Entertainment</Link></li> */}
            {/* <li className="items"><Link to="#">More..</Link></li> */}

          </ul>
        </div>
       {this.props.position==='sticky' && <SearchBar
        // classes={{color:"red"}}
        // value={"Search"}
        onChange={() => console.log('onChange')}
        onRequestSearch={() => console.log('onRequestSearch')}
        style={{
          marginRight:'20px',
          maxWidth: 800,
          height:"33px"
        }}
        cancelOnEscape
        />}
      </div>
      {this.props.position==='sticky' && <div className="filterBox" style={{ height: this.state.isopen ? "240.938px" : "0px" }}  >
          <img src={filter} style={{ filter: this.state.isopen ? "invert(1)" : "invert(0)" }} onClick={this.openFilter} alt="" />
          <div className="dabba" style={{ opacity: this.state.isopen ? "1" : "0" }} >
            <div className="dropdownBox">
              <div className="categories">
                <h3>Category</h3>
                <div className="forcross">
                  <Link className="links" onClick={()=>this.setState({item:"general"})} to={"/home"} style={{color:this.state.item==="general"?"white":""}}>General</Link>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.item==="general"?"visible":"hidden"}}></i>
                </div>
                <div className="forcross">
                  <Link  className="links" to={"/entertainment"} onClick={()=>this.setState({item:"entertainment"})} style={{color:this.state.item==="entertainment"?"white":""}}>Entertainment</Link>

                  <i class="fa-solid fa-xmark" style={{visibility:this.state.item==="entertainment"?"visible":"hidden"}}></i>
                </div>
                <div className="forcross">

                  <Link  className="links" onClick={()=>this.setState({item:"business"})} to={"/business"} style={{color:this.state.item==="business"?"white":""}}>Bussiness</Link>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.item==="business"?"visible":"hidden"}}></i>
                </div>
                <div className="forcross">

                  <Link to={"/sports"} className="links" onClick={()=>this.setState({item:"sports"})} style={{color:this.state.item==="sports"?"white":""}}>Sports</Link>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.item==="sports"?"visible":"hidden"}}></i>
                </div>
                <div className="forcross">
                  <Link to={"/science"} className="links" onClick={()=>this.setState({item:"science"})} style={{color:this.state.item==="science"?"white":""}}>Science</Link>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.item==="science"?"visible":"hidden"}}></i>

                </div>
                <div className="forcross">

                  <Link to={"/technology"} className="links" onClick={()=>this.setState({item:"tech"})} style={{color:this.state.item==="tech"?"white":""}}>Technology</Link>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.item==="tech"?"visible":"hidden"}}></i>
                </div>
              </div>
            </div>
            <div className="dropdownBox">
              <div className="categories">
                <h3>Language</h3>
                <div className="forcross">
                  <Link className="links" onClick={()=> this.run("en","english") } to={"/home"} >English</Link><i class="fa-solid fa-xmark" style={{visibility:this.state.lang==="english"?"visible":"hidden"}}></i>

                </div>
                <div className="forcross">
                  <Link className="links" onClick={()=> this.run("es","spanish") } >Spanish</Link><i class="fa-solid fa-xmark"></i>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.lang==="spanish"?"visible":"hidden"}}></i>

                </div>
                <div className="forcross">
                  <Link className="links"onClick={()=> this.run("pr","portugese") } >Portugese</Link><i class="fa-solid fa-xmark"></i>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.lang==="portugese"?"visible":"hidden"}}></i>

                </div>
                <div className="forcross">
                  <Link className="links" onClick={()=> this.run("fr","french") } >French</Link><i class="fa-solid fa-xmark"></i>
                  <i class="fa-solid fa-xmark" style={{visibility:this.state.lang==="french"?"visible":"hidden"}}></i>
                </div>
                {/* <Link className="links">Technology</Link> */}
              </div>
            </div>
            <div className="dropdownBox">
              <div className="categories">
                <h3>Sort By</h3>
                <Link className="links">Relevancy</Link>
                <Link className="links">Popularity</Link>
                <Link className="links">Nesest</Link>
                {/* <Link className="links">Science</Link>
              <Link className="links">Technology</Link> */}
              </div>
            </div>
          </div>

        </div>}
        </>
    )
  }
}

export default Navbar