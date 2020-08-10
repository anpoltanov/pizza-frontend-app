import React from 'react';
import './App.css';
import Menu from "./components/layout/Menu";

class App extends React.Component{
  render() {
    return (
        <div className="App">
          <Menu/>
          <div className="container">
            <div className="row pt-3">
              <div className="col-xl-10">
                {this.props.render(this.state)}
              </div>
              <div className="col-xl-2">
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
