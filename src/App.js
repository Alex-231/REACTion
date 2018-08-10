import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Branch from './Branch'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      oldBranches: [],
      position: null
    }
  }

  //Called when the app loads.
  componentDidMount() {
    //Load the stored save point.
    var position = localStorage.getItem("save")
    if (position) //If there is a save point...
      this.setState({ position }) //Move it to state
    else //Else
      this.setState({ position: 'b1p0' }) //Move the start point to state.
  }

  //When a branch button is pressed
  branchSubmit(next) {
    this.setState({
      oldBranches: this.state.oldBranches.concat([<Branch disabled position={this.state.position} />]),
      position: next
    })
  }

  //Save the current position to local storage.
  save() {
    localStorage.setItem("save", this.state.position)
  }

  //Load the position saved in local storage (if there is one).
  load() {
    var position = localStorage.getItem("save")
    if (position)
      this.setState({ position, oldBranches: [] })
  }

  //Go back to the beginning
  restart() {
    this.setState({ position: 'b1p0', oldBranches: [] })
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Exampolo</h1>
        </header>
        {
          this.state.position
            ? <div>
              <button onClick={this.save.bind(this)}>Save</button>
              <button onClick={this.load.bind(this)}>Load</button>
              <button onClick={this.restart.bind(this)}>Restart</button>
              {this.state.oldBranches}
              <Branch onSubmit={this.branchSubmit.bind(this)} position={this.state.position} />
            </div>
            : null}
      </div>
    );
  }
}

export default App;
