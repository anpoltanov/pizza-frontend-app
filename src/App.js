import React from 'react';
import './App.css';
import Menu from "./components/Menu";

class App extends React.Component{
  render() {
    return (
        <div className="App">
          <Menu/>
          <div className="container">
            <div className="row pt-3">
              <div className="col-xxl-10">
                {this.props.render(this.state)}
              </div>
              <div className="col-xxl-2">
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
