import React, { useEffect, useRef } from "react";

function TodoItem({ id, done, hidden, text, deadline, handleDelete, handleEdit }) {
	const handleEditBound = () => handleEdit(id);
	const handleDeleteBound = () => handleDelete(id);

	const editButton = useRef(),
		deleteButton = useRef();

	useEffect(() => {
		const currentEditButton = editButton.current;

		currentEditButton.addEventListener("click", handleEditBound);
		return () => {
			currentEditButton.removeEventListener("click", handleEditBound);
		};
	});

	useEffect(() => {
		const currentDeleteButton = deleteButton.current;
		currentDeleteButton.addEventListener("click", handleDeleteBound);
		return () => {
			currentDeleteButton.removeEventListener("click", handleDeleteBound);
		};
	});

	return (
		<ui5-li-custom key={id} selected={done || undefined} data-key={id} className={hidden ? "hidden" : ""}>
			<div className="li-content">
				<span className="li-content-text">
					{text} - finish before: {deadline}
				</span>
				<div className="li-content-actions">
					<ui5-button className="edit-btn" ref={editButton}>
						Edit
					</ui5-button>
					<ui5-button design="Negative" ref={deleteButton}>
						Delete
					</ui5-button>
				</div>
			</div>
		</ui5-li-custom>
	);
}

export default TodoItem;
