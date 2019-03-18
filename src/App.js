import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import TodoList from './TodoList';

import "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/browsersupport/Edge";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Toolbar";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/TextArea";

class App extends Component {

  state = {
    todos: [
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
    ],
    todoBeingEdittedText: "",
    todoBeingEdittedDate: "",
    selectedEditTodo: ""
  };

  constructor(props) {
    super(props);

    this.addButton = React.createRef();
    this.todoInput = React.createRef();
    this.todoDeadline = React.createRef();
    this.editDialog = React.createRef();
    this.cancelBtn = React.createRef();
    this.saveBtn = React.createRef();
    this.titleEditInput = React.createRef();
    this.dateEditInput = React.createRef();
  }

  componentDidMount() {
    this.addButton.current.addEventListener('press', event => {
      this.handleAdd();
    });

    this.cancelBtn.current.addEventListener('press', event => {
      this.editDialog.current.close();
    });

    this.saveBtn.current.addEventListener('press', event => {
      this.saveEdits();
      this.editDialog.current.close();
    });
  }

  saveEdits() {
    const edittedText = this.titleEditInput.current.value;
    const edittedDate = this.dateEditInput.current.value;

    const filteredTodos = this.state.todos.map((todo) => {
      if (todo.id === this.state.selectedEditTodo) {
        todo.text = edittedText;
        todo.deadline = edittedDate;
      }

      return todo;
    });

    this.setState((oldState) => {
      return {
        ...oldState,
        todos: filteredTodos
      }
    });
  }

  handleDone(event) {
    const selectedItem = event.detail.items[0];
    const selectedId = selectedItem.getAttribute("data-key");

    const updatedTodos = this.state.todos.map(todo => {
      return { ...todo, done: (todo.done || (selectedId === todo.id.toString())) };
    });

    this.setState((oldState) => {
      return { ...oldState, todos: updatedTodos }
    });
  }

  handleUnDone(event) {
    const selectedItems = event.detail.items;
    const updatedTodos = this.state.todos.map((todo) => {
      const unselectedItem = selectedItems.filter(item => item.getAttribute("data-key") === todo.id.toString());

      todo.done = unselectedItem[0];

      return todo;
    });

    this.setState((oldState) => { return { ...oldState, todos: updatedTodos } });
  }

  handleAdd() {
    this.setState((oldState, props) => {
      return {
        ...oldState,
        todos: [...oldState.todos, {
          text: this.todoInput.current.value,
          id: oldState.todos.length + 1,
          deadline: this.todoDeadline.current.value,
          done: false
        }]
      }
    });
  }

  handleRemove(id) {
    const filtered = this.state.todos.filter(todo => todo.id !== id);

    this.setState((oldState, props) => {
      return {
        ...oldState,
        todos: filtered
      }
    });
  }

  handleEdit(id) {
    const todoObj = this.state.todos.filter(todo => {
      return todo.id === id
    })[0];

    this.setState((oldState, props) => {
      return {
        ...oldState,
        todoBeingEdittedText: todoObj.text,
        todoBeingEdittedDate: todoObj.deadline,
        selectedEditTodo: id
      }
    });

    this.editDialog.current.open();
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <ui5-toolbar class="header-toolbar">
            <img src={logo} alt="UI5 Logo" className="ui5-logo" />
            <ui5-title class="app-title">UI5 Web Components React Sample Application</ui5-title>
          </ui5-toolbar>
        </header>
        <section className="app-content">
          <div className="create-todo-wrapper">
            <ui5-input placeholder="My Todo ..." ref={this.todoInput} class="add-todo-element-width" id="add-input"></ui5-input>
            <ui5-datepicker format-pattern="dd/MM/yyyy" class="add-todo-element-width" ref={this.todoDeadline} id="date-picker"></ui5-datepicker>
            <ui5-button class="add-todo-element-width" ref={this.addButton} type="Emphasized">Add Todo</ui5-button>
          </div>

          <div className="list-todos-wrapper">
            <TodoList
              items={this.state.todos.filter(todo => !todo.done)}
              selectionChange={this.handleDone.bind(this)}
              remove={this.handleRemove.bind(this)}
              edit={this.handleEdit.bind(this)}
            >
            </TodoList>

            <ui5-panel header-text="Completed tasks" collapsed={!this.state.todos.filter(todo => todo.done).length || undefined}>
              <TodoList
                items={this.state.todos.filter(todo => todo.done)}
                selectionChange={this.handleUnDone.bind(this)}
                remove={this.handleRemove.bind(this)}
                edit={this.handleEdit.bind(this)}
              >
              </TodoList>
            </ui5-panel>
          </div>
        </section>
        <ui5-dialog header-text="Edit Todo item" ref={this.editDialog}>
          <div className="dialog-content">
            <div className="edit-wrapper">
                <ui5-label>Title:</ui5-label>
                <ui5-textarea class="title-textarea" max-length="24" show-exceeded-text value={this.state.todoBeingEdittedText} ref={this.titleEditInput}></ui5-textarea>
            </div>

            <div className="edit-wrapper date-edit-fields">
                <ui5-label>Date:</ui5-label>
                <ui5-datepicker format-pattern="dd/MM/yyyy" value={this.state.todoBeingEdittedDate} ref={this.dateEditInput}></ui5-datepicker>
            </div>
          </div>
            <ui5-toolbar class="dialog-footer" data-ui5-slot="footer">
              <ui5-button type="Transparent" ref={this.cancelBtn}>Cancel</ui5-button>{/*close dialog*/}
              <ui5-button type="Emphasized" ref={this.saveBtn}>Save</ui5-button>{/*save dialog info*/}
            </ui5-toolbar>
        </ui5-dialog>
      </div>
    );
  }
}

export default App;
