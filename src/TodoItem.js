import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.delete = React.createRef();
    this.edit = React.createRef();
  }

  componentDidMount() {
    const that = this;

    this.delete.current.addEventListener('click', event => {
      that.props.handleDelete(that.props.id);
    });

    this.edit.current.addEventListener('click', event => {
      that.props.handleEdit(parseInt(that.props.id));
    });
  }

  render() {
    return (
      <ui5-li-custom key={this.props.id} selected={this.props.done || undefined} data-key={this.props.id} class={this.props.hidden ? "hidden" : ""}>
        <div className="li-content">
          <span className="li-content-text">{this.props.text} - finish before: {this.props.deadline}</span>
          <div className="li-content-actions">
            <ui5-button class="edit-btn" ref={this.edit}>Edit</ui5-button>
            <ui5-button design="Negative" ref={this.delete}>Delete</ui5-button>
          </div>
        </div>
      </ui5-li-custom>
    )
  }
}

export default TodoItem;
