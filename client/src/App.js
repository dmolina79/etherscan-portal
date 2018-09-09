import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoadAddressPanel from './components/loadAddressPanel';
import GetAddressInfoPanel from './components/getAddressInfoPanel';
import TableResulsPanel from './components/tableResultsPanel';

class App extends Component {
  state = {
    response: '',
    addressInfo: null
  }

  handleAddressInfo = async (addressInfo) => {
    console.log('addressInfo', addressInfo);
    if (addressInfo) {
      this.setState({ addressInfo });
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Etherscan Portal</h1>
        </header>
        <LoadAddressPanel />
        <GetAddressInfoPanel onAddressInfoLoad={this.handleAddressInfo} />
        <TableResulsPanel addressInfo={this.state.addressInfo} />
      </div>
    );
  }
}

export default App;
