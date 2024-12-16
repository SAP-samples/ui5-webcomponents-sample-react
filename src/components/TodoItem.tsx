import { useEffect, useRef } from "react";
import { TodoItem as TodoItemType } from "../types";
import "@ui5/webcomponents/dist/ListItemCustom";
import type Button from "@ui5/webcomponents/dist/Button";

function TodoItem({
	id,
	done,
	text,
	deadline,
	handleDelete,
	handleEdit,
}: TodoItemType & {
	handleDelete: (id: number) => void;
	handleEdit: (id: number) => void;
}) {
	const handleEditBound = () => handleEdit(id);
	const handleDeleteBound = () => handleDelete(id);

	const editButton = useRef<Button>(),
		deleteButton = useRef<Button>();

	useEffect(() => {
		const currentEditBtn = editButton.current;
		currentEditBtn?.addEventListener("click", handleEditBound);
		return () => {
			currentEditBtn?.removeEventListener("click", handleEditBound);
		};
	});

	useEffect(() => {
		const currentDeleteBtn = deleteButton.current;
		currentDeleteBtn?.addEventListener("click", handleDeleteBound);
		return () => {
			currentDeleteBtn?.removeEventListener("click", handleDeleteBound);
		};
	});

	return (
		<ui5-li-custom key={id} selected={done || undefined} data-key={id}>
			<div className="li-content">
				<span className="li-content-text">
					{text} - finish before: {deadline}
				</span>
				<div className="li-content-actions">
					<ui5-button class="edit-btn" ref={editButton}>
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
