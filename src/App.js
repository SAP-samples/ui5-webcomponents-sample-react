import React, { useState, useRef, useEffect, useCallback } from 'react';
import logo from './logo.png';
import './App.css';
import TodoList from './TodoList';

import "@ui5/webcomponents-base/dist/features/browsersupport/Edge";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents-fiori/dist/ShellBar";

function App () {

  const [todos, setTodos] = useState([
    {
      text: "Get some carrots",
      id: 1,
      deadline: "27/7/2018",
      done: false
    },
    {
      text: "Do some magic",
      id: 2,
      deadline: "22/7/2018",
      done: false
    },
    {
      text: "Go to the gym",
      id: 3,
      deadline: "24/7/2018",
      done: true
    },
    {
      text: "Buy milk",
      id: 4,
      deadline: "30/7/2018",
      done: false
    },
    {
      text: "Eat some fruits",
      id: 5,
      deadline: "29/7/2018",
      done: false
    }
  ]);
  const [todoBeingEditted, setTodoBeingEditted] = useState({
    id: "",
    text: "",
    date: ""
  });

  const addButton = useRef(),
    todoInput = useRef(),
    todoDeadline = useRef(),
    editDialog = useRef(),
    cancelBtn = useRef(),
    saveBtn = useRef(),
    titleEditInput = useRef(),
    dateEditInput = useRef();

  function handleCancel() {
    editDialog.current.close();
  }

  const handleSave = useCallback(() => {
    const edittedText = titleEditInput.current.value;
    const edittedDate = dateEditInput.current.value;

    setTodos(todos => todos.map((todo) => {
      if (todo.id === todoBeingEditted.id) {
        todo.text = edittedText;
        todo.deadline = edittedDate;
      }
      return todo;
    }));

    editDialog.current.close();
  }, [todoBeingEditted, setTodos]);

  const handleDone = useCallback(event => {
      const selectedItem = event.detail.selectedItems[0];
      const selectedId = selectedItem.getAttribute("data-key");
  
      setTodos((todos) => todos.map(todo => {
        return { ...todo, done: (todo.done || (selectedId === todo.id.toString())) };
      }));
  }, [setTodos]);

  const handleUnDone = useCallback( event => {
    const selectedItems = event.detail.selectedItems;

    setTodos((todos) => todos.map((todo) => {
      const unselectedItem = selectedItems.filter(item => item.getAttribute("data-key") === todo.id.toString());
      todo.done = !!unselectedItem[0];
      return todo;
    }));

  }, [setTodos]);

  const handleAdd = useCallback(() => {
    setTodos(todos => [
      ...todos,
      {
        text: todoInput.current.value,
        id: todos.length + 1,
        deadline: todoDeadline.current.value,
        done: false
      }
    ]);
  }, [setTodos]);

  const handleRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, [setTodos]);

  const handleEdit = useCallback((id) => {
    const todoObj = todos.filter(todo => {
      return todo.id === id
    })[0];

    setTodoBeingEditted(() => ({
      id: id,
      text: todoObj.text,
      deadline: todoObj.deadline
    }));

    editDialog.current.open();
  }, [todos, setTodoBeingEditted]);

  useEffect(() => {
    todoInput.current.addEventListener('submit', handleAdd);
    return () => {
      todoInput.current.removeEventListener('submit', handleAdd);
    }
  }, [handleAdd]);

  useEffect(() => {
    addButton.current.addEventListener("click", handleAdd);
    return () => {
      addButton.current.removeEventListener("click", handleAdd);
    }
  }, [handleAdd]);

  useEffect(() => {
    cancelBtn.current.addEventListener("click", handleCancel);
    return () => {
      cancelBtn.current.removeEventListener("click", handleCancel);
    }
  }, [handleCancel]);

  useEffect(() => {
    saveBtn.current.addEventListener("click", handleSave);
    return () => {
      saveBtn.current.removeEventListener("click", handleSave);
    }
  }, [handleSave]);

  return (
      <div className="app">
        <ui5-shellbar
          primary-title="UI5 Web Components React Sample Application">
            <img alt="logo" slot="logo" height="30px" src={logo} />
        </ui5-shellbar>
        <section className="app-content">
          <div className="create-todo-wrapper">
            <ui5-input placeholder="My Todo ..." ref={todoInput} class="add-todo-element-width" id="add-input"></ui5-input>
            <ui5-datepicker format-pattern="dd/MM/yyyy" class="add-todo-element-width" ref={todoDeadline} id="date-picker"></ui5-datepicker>
            <ui5-button class="add-todo-element-width" ref={addButton} design="Emphasized">Add Todo</ui5-button>
          </div>

          <div className="list-todos-wrapper">
            <TodoList
              items={todos.filter(todo => !todo.done)}
              selectionChange={handleDone}
              remove={handleRemove}
              edit={handleEdit}
            >
            </TodoList>

            <ui5-panel header-text="Completed tasks" collapsed={!todos.filter(todo => todo.done).length || undefined}>
              <TodoList
                items={todos.filter(todo => todo.done)}
                selectionChange={handleUnDone}
                remove={handleRemove}
                edit={handleEdit}
              >
              </TodoList>
            </ui5-panel>
          </div>
        </section>
        <ui5-dialog header-text="Edit Todo item" ref={editDialog}>
          <div className="dialog-content">
            <div className="edit-wrapper">
                <ui5-label>Title:</ui5-label>
                <ui5-textarea class="title-textarea" max-length="24" show-exceeded-text value={todoBeingEditted.text} ref={titleEditInput}></ui5-textarea>
            </div>

            <div className="edit-wrapper date-edit-fields">
                <ui5-label>Date:</ui5-label>
                <ui5-datepicker format-pattern="dd/MM/yyyy" value={todoBeingEditted.deadline} ref={dateEditInput}></ui5-datepicker>
            </div>
          </div>
            <div className="dialog-footer" >
              <ui5-button design="Transparent" ref={cancelBtn}>Cancel</ui5-button>{/*close dialog*/}
              <ui5-button design="Emphasized" ref={saveBtn}>Save</ui5-button>{/*save dialog info*/}
            </div>
        </ui5-dialog>
      </div>
  );
}

export default App;
