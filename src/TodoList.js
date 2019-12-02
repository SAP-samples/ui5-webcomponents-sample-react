import React, { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList({ items, selectionChange, remove, edit }) {
  const list = useRef();

  useEffect(() => {
    list.current.addEventListener("selectionChange", selectionChange);
    return () => {
      list.current.removeEventListener("selectionChange", selectionChange);
    }
  }, [selectionChange]);

  return (
    <ui5-list id="todo-list" mode="MultiSelect" ref={list}>
      {items.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            deadline={todo.deadline}
            done={todo.done}
            handleDelete={remove}
            handleEdit={edit}
          ></TodoItem>
        );
      })}
    </ui5-list>
  );
}

export default TodoList;
