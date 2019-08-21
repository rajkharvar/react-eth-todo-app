import React from 'react';

class TodoList extends React.Component {
  render() {
    return (
      <div className='todoList'>
        <ul>
          {this.props.allTodos.map((todo, key) => {
            return (
              <li style={{ listStyleType: 'none' }} key={key}>
                {todo[1]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
