import React from 'react';
import './App.css';
import Web3 from 'web3';
import contract from './contract.json';
import TodoList from './components/TodoList';

const contractAddress = '0x5fd26af191d4b4151eab7940a10f09a83d76c127';

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
    this.addTodo = this.addTodo.bind(this);
  }
  componentWillMount() {
    this.loadBlockchainNetwork();
    console.log(`${this.state.account} ${this.state.network}`);
  }

  // This loads blockchain network details
  async componentWillMount() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545/');
    console.log(web3);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const todoList = new web3.eth.Contract(contract, contractAddress);
    this.setState({ todoList });
    const lastIndex = await todoList.methods.lastIndex().call();
    this.setState({ lastIndex: parseInt(lastIndex._hex) });
    for (let i = 1; i <= this.state.lastIndex; i++) {
      const todo = await todoList.methods.getTodo(i).call();
      this.setState({ allTodos: [...this.state.allTodos, todo] });
    }
    console.log(this.state.allTodos);
  }

  addTodo = (todo, e) => {
    e.preventDefault();
    this.state.todoList.methods
      .addTodo(todo)
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        console.log(receipt);
      });
  };

  render() {
    return (
      <div className='App'>
        <h2>Your account Id:{this.state.account}</h2>
        <h1>All Todos</h1>
        <form onSubmit={e => this.addTodo(this.state.todo, e)}>
          <input
            type='text'
            onChange={e => this.setState({ todo: e.target.value })}
          />
          <button type='submit'>Add Todo</button>
        </form>
        <TodoList allTodos={this.state.allTodos} />
      </div>
    );
  }
}

export default App;
