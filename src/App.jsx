import React from 'react';
import './App.css';
import Web3 from 'web3';
import contract from './contract.json';

const contractAddress = '0xb8f2caa6c1d00ad46f8a6c8c183881ee3a86440a';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      network: ''
    };
  }
  componentWillMount() {
    this.loadBlockchainNetwork();
    console.log(`${this.state.account} ${this.state.network}`);
  }

  // This loads blockchain network details
  async loadBlockchainNetwork() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545/');
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0], network });
    const todoList = new web3.eth.Contract(contract, contractAddress);
    this.setState({ todoList });
    todoList.methods
      .addTodo('code')
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        console.log(receipt);
      });
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
