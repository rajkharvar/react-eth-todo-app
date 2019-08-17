import React from 'react';
import './App.css';
import Web3 from 'web3';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      network: ''
    };
  }
  componentDidMount() {
    this.loadBlockchainNetwork();
    console.log(`${this.state.account} ${this.state.network}`);
  }

  // This loads blockchain network details
  async loadBlockchainNetwork() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545/');
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0], network });
  }
  render() {
    return (
      <div className='App'>
        <h1>Hello World</h1>
        <h2>Your Network is:{this.state.network}</h2>
        <h2>Your account Id:{this.state.account}</h2>
      </div>
    );
  }
}

export default App;
