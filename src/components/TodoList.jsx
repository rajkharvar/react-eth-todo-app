import React from 'react';

class TodoList extends React.Component {
  render() {
    return (
      <div className='todoList' style={{ margin: '0 10%' }}>
        <ul>
          {this.props.allTodos.map((todo, key) => {
            return (
              <li
                style={{
                  listStyleType: 'none',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: '#3C40C6',
                  padding: '10px',
                  margin: '5px',
                  border: '1px solid #3C40C6'
                }}
                key={key}
              >
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
