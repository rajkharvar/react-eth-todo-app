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
      todo: '',
      todoList: {},
      lastIndex: 0,
      allTodos: []
    };
  }
  componentWillMount() {
    this.loadBlockchainNetwork();
    console.log(`${this.state.account} ${this.state.network}`);
  }

  // This loads blockchain network details
  async loadBlockchainNetwork() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545/');
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const todoList = new web3.eth.Contract(contract, contractAddress);
    this.setState({ todoList });
    const lastIndex = await todoList.methods.lastIndex().call();
    this.setState({ lastIndex });
    this.generateAllTodos();
  }

  addTodo = (todo, e) => {
    console.log('clicked');
    console.log(this.state.todo);
    console.log(typeof this.state.todo);
    e.preventDefault();
    this.state.todoList.methods
      .addTodo(todo)
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        console.log(receipt);
      });
  };

  generateAllTodos = async () => {
    this.state.todoList.methods
      .getTodo(1)
      .call()
      .then(res => console.log(res));
  };
  render() {
    return (
      <div className='App'>
        <h2>Your account Id:{this.state.account}</h2>
        <h1>All Todos</h1>
        <form onSubmit={e => this.addTodo(this.state.todo, e)}>
          <input type='text' onChangeText={todo => this.setState({ todo })} />
          <button type='submit'>Add Todo</button>
        </form>
      </div>
    );
  }
}

export default App;
