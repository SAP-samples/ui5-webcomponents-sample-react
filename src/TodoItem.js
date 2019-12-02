import React, { useEffect, useRef } from 'react';

function TodoItem ({id, done, hidden, text, deadline, handleDelete, handleEdit}) {

  const editButton = useRef(),
    deleteButton = useRef();

  useEffect(() => {
    editButton.current.addEventListener("click", () => {
      handleEdit(id);
    });
    return () => {
      editButton.current.removeEventListener("click", () => {
        handleEdit(id);
      });
    }
  }, [handleEdit]);

  useEffect(() => {
    deleteButton.current.addEventListener("click", () => {
      handleDelete(id);
    });
    return () => {
      deleteButton.current.removeEventListener("click", () => {
        handleDelete(id);
      });
    }
  }, [handleDelete]);

  return (
    <ui5-li-custom key={id} selected={done || undefined} data-key={id} class={hidden ? "hidden" : ""}>
        <div className="li-content">
          <span className="li-content-text">{text} - finish before: {deadline}</span>
          <div className="li-content-actions">
            <ui5-button class="edit-btn" ref={editButton}>Edit</ui5-button>
            <ui5-button design="Negative" ref={deleteButton}>Delete</ui5-button>
          </div>
        </div>
      </ui5-li-custom>
  );
}

export default TodoItem;
