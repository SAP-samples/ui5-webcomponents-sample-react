import React, { useRef, useEffect } from "react";
import TodoItem from "./TodoItem";

function TodoList({ items, selectionChange, remove, edit }) {
	const list = useRef();

	useEffect(() => {
		const currentList = list.current;
		currentList.addEventListener("selection-change", selectionChange);
		return () => {
			currentList.removeEventListener("selection-change", selectionChange);
		};
	}, [selectionChange]);

	return (
		<ui5-list id="todo-list" selection-mode="Multiple" ref={list}>
			{items.map((todo) => {
				return <TodoItem key={todo.id} id={todo.id} text={todo.text} deadline={todo.deadline} done={todo.done} handleDelete={remove} handleEdit={edit}></TodoItem>;
			})}
		</ui5-list>
	);
}

export default TodoList;
