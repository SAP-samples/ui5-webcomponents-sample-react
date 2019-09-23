import React from 'react';

function TodoItem ({id, done, hidden, text, deadline, handleDelete, handleEdit}) {

  return (
    <ui5-li-custom key={id} selected={done || undefined} data-key={id} class={hidden ? "hidden" : ""}>
        <div className="li-content">
          <span className="li-content-text">{text} - finish before: {deadline}</span>
          <div className="li-content-actions">
            <ui5-button class="edit-btn" onClick={handleEdit.bind(this, id)}>Edit</ui5-button>
            <ui5-button type="Negative" onClick={handleDelete.bind(this, id)}>Delete</ui5-button>
          </div>
        </div>
      </ui5-li-custom>
  );
}

export default TodoItem;
