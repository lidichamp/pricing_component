import React, { Component } from 'react';
import logo from './images/logo_gold.png';
import './app.css';
import Origin from "./components/Origin";
import { cost } from './components/Destination'
import Destination from "./components/Destination";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="Max.ng" alt="logo" />
            <h1 className="lead">max.ng
        </h1>
          <p className="lead">
              A React component to calculate the cost of transportation/delivery
          </p>
        </header>
          <div className="container">
              <Origin />
              <br/>
              <Destination />
              <br/>
              <p className="lead">{cost}</p>
          </div>
      </div>
    );
  }
}

export default App;
