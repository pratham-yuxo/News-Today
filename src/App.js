import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import { Navbar } from "./components/Navbar2";
import { News } from "./components/NewsInfinite";
import {Landing} from './components/Landing'
import {About} from './components/About'
import {
  BrowserRouter,
   Routes,
    Route 
} from "react-router-dom";

export default class App extends Component {

  apiKey="5031b8fbef5b4a43a26f4e3513c64b51"// to access environment variables
  state={
    progress:0,
    bg:"",
    position:"",
    underline:null,
    lang:"en",
    country:"",
    category:"general",
    page:"1",
    pageSize:"3",
    // url:`https://newsapi.org/v2/top-headlines?country=${this.state.country}&language=${this.state.lang}&category=${this.state.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`,

     }

  setProgress=(progress)=>{
    this.setState({progress:progress});
  }
  toggle_for_navbar=(value)=>{
if(value==="black"){
  this.setState({bg:"black",position:"sticky"})
}
else{
  this.setState({bg:"",position:""})
}
  }
  makeUnderline=(value)=>{
    console.log("make underline" ,value)
    this.setState({underline:value})
  }
  changeLang=(value)=>{
this.setState({lang:value})
console.log(value)
  }

  render() {

    return (
      <div>
        <BrowserRouter>
              <Navbar compo={"/home"} lang={this.state.lang} changeLang={this.changeLang} underline={this.state.underline} bg={this.state.bg} position={this.state.position} />
              <LoadingBar
              height={3}
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
              <Route exact path='/' element={<Landing value={null} makeUnderline={this.makeUnderline}  toggle_for_navbar={this.toggle_for_navbar}/>}> </Route>
              <Route exact path='/home' element={<News lang={this.state.lang}  value={0} makeUnderline={this.makeUnderline}  toggle_for_navbar={this.toggle_for_navbar} apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={3} country={this.state.country} category='general' />}> </Route>
              <Route exact path='/sports' element={<News value={2} makeUnderline={this.makeUnderline} toggle_for_navbar={this.toggle_for_navbar} apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={6} country={this.state.country} category='sports' />}> </Route>
              <Route exact path='/business' element={<News   value={2} makeUnderline={this.makeUnderline} toggle_for_navbar={this.toggle_for_navbar} apiKey={this.apiKey} setProgress={this.setProgress} key="bussiness" pageSize={6} country={this.state.country} category='business' />}> </Route>
              <Route exact path='/entertainment' element={<News lang={this.state.lang} value={3} makeUnderline={this.makeUnderline} toggle_for_navbar={this.toggle_for_navbar} apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={6} country='in' category='entertainment' />}> </Route>
              <Route exact path='/science' element={<News value={0} makeUnderline={this.makeUnderline} toggle_for_navbar={this.toggle_for_navbar} apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={6} country={this.state.country} category='science' />}> </Route>
              <Route exact path='/health' element={<News value={0} makeUnderline={this.makeUnderline} toggle_for_navbar={this.toggle_for_navbar} apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={6} country={this.state.country} category='health' />}> </Route>
          </Routes>
          <About/>
        </BrowserRouter>
      </div>
    )
  }
}
