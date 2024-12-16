import { useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import type List from "@ui5/webcomponents/dist/List";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List";

import { TodoItem as TodoItemType } from "../types";

function TodoList({
	items,
	handleSelectionChange,
	handleDelete,
	handleEdit,
}: {
	items: TodoItemType[];
	handleSelectionChange: (event: CustomEvent<ListSelectionChangeEventDetail>) => void;
	handleDelete: (id: number) => void;
	handleEdit: (id: number) => void;
}) {
	const list = useRef<List>();

	useEffect(() => {
		const currentList = list.current;

		currentList?.addEventListener("selection-change", handleSelectionChange as EventListener);
		return () => {
			currentList?.removeEventListener("selection-change", handleSelectionChange as EventListener);
		};
	}, [handleSelectionChange]);

	return (
		<ui5-list id="todo-list" selection-mode="Multiple" ref={list}>
			{items.map((todo) => {
				return <TodoItem key={todo.id} id={todo.id} text={todo.text} deadline={todo.deadline} done={todo.done} handleDelete={handleDelete} handleEdit={handleEdit}></TodoItem>;
			})}
		</ui5-list>
	);
}

export default TodoList;
