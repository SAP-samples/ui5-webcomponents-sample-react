import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.list = React.createRef();
    this.deleteBtn = React.createRef();
  }

  componentDidMount() {
    this.list.current.addEventListener("selectionChange", event => {
      this.props.selectionChange(event);
    });
  }
  
  render() {
    return (
      <ui5-list id="todo-list" mode="MultiSelect" ref={this.list}>
        {
          this.props.items.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                deadline={todo.deadline}
                done={todo.done}
                handleDelete={this.props.remove.bind(this)}
                handleEdit={this.props.edit.bind(this)}>
              </TodoItem>
            )
          })
        }
      </ui5-list>
    );
  }
}

export default TodoList;
