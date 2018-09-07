import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: ''
  }

  async componentDidMount () {
    try {
      const res = await this.callApi();
      this.setState({ response: res.express });
    } catch (e) {
      console.log(e);
    }
  }

  callApi = async () => {
    const res = await fetch('/api/hello');
    const body = await res.json();

    if (res.status !== 200) throw Error(body.message);

    return body;
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.response}
        </p>
      </div>
    );
  }
}

export default App;
