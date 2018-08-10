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

  componentDidMount() {
    var position = localStorage.getItem("save")
    if (position)
      this.setState({ position })
    else
      this.setState({ position: 'b1p0' })
  }

  progress() {
    console.log(this.state.branches)
    var newBranches = this.state.branches
    newBranches = newBranches.concat([<Branch key={this.state.no} no={this.state.no} progress={this.progress.bind(this)} />])
    console.log(this.state.newBranches)
    this.setState({
      branches: newBranches,
      no: this.state.no + 1
    })
  }

  branchSubmit(next) {
    this.setState({
      oldBranches: this.state.oldBranches.concat([<Branch disabled position={this.state.position} />]),
      position: next
    })
  }

  save() {
    localStorage.setItem("save", this.state.position)
  }

  load() {
    var position = localStorage.getItem("save")
    if (position)
      this.setState({ position, oldBranches: [] })
  }

  restart() {
    this.setState({ position: 'b1p0', oldBranches: [] })
    this.save()
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Exampolo</h1>
        </header>
        {this.state.position ?
          <div>
            <button onClick={this.save.bind(this)}>Save</button><button onClick={this.load.bind(this)}>Load</button><button onClick={this.restart.bind(this)}>Restart</button>
            {this.state.oldBranches}
            <Branch onSubmit={this.branchSubmit.bind(this)} position={this.state.position} /></div>
          : null}
      </div>
    );
  }
}

export default App;
