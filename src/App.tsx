import React, { useState, useRef, useEffect, useCallback } from "react";
import logo from "./logo.png";
import "./App.css";
import TodoList from "./components/TodoList";

import { TodoItem, EditingTodoItem } from "./types";

import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-base/dist/features/F6Navigation";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents/dist/Switch";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents-fiori/dist/Assets";
import "@ui5/webcomponents-icons/dist/palette.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/account.js";
import "@ui5/webcomponents-icons/dist/private.js";
import "@ui5/webcomponents-icons/dist/loan.js";
import "@ui5/webcomponents-icons/dist/globe.js";

import type Button from "@ui5/webcomponents/dist/Button";
import type Input from "@ui5/webcomponents/dist/Input";
import type DatePicker from "@ui5/webcomponents/dist/DatePicker";
import type Dialog from "@ui5/webcomponents/dist/Dialog";
import type TextArea from "@ui5/webcomponents/dist/TextArea";
import type List from "@ui5/webcomponents/dist/List";
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar";
import type Switch from "@ui5/webcomponents/dist/Switch";
import type Popover from "@ui5/webcomponents/dist/Popover";
import type ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import { ListItemClickEventDetail, ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List";
import { ShellBarItemClickEventDetail } from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import { ShellBarProfileClickEventDetail } from "@ui5/webcomponents-fiori/dist/ShellBar";

setTheme("sap_horizon");

function App() {
	const [todos, setTodos] = useState<TodoItem[]>([
		{
			text: "Get some carrots",
			id: 1,
			deadline: "27/7/2018",
			done: false,
		},
		{
			text: "Do some magic",
			id: 2,
			deadline: "22/7/2018",
			done: false,
		},
		{
			text: "Go to the gym",
			id: 3,
			deadline: "24/7/2018",
			done: false,
		},
		{
			text: "Buy milk",
			id: 4,
			deadline: "30/7/2018",
			done: false,
		},
		{
			text: "Eat some fruits",
			id: 5,
			deadline: "29/7/2018",
			done: true,
		},
	]);
	const [todoBeingEditted, setTodoBeingEditted] = useState<EditingTodoItem>({
		id: -1,
		text: "",
		deadline: "",
	});

	const themeChangeItem = useRef<ShellBarItem>(),
		addButton = useRef<Button>(),
		todoInput = useRef<Input>(),
		todoDeadline = useRef<DatePicker>(),
		editDialog = useRef<Dialog>(),
		cancelBtn = useRef<Button>(),
		saveBtn = useRef<Button>(),
		titleEditInput = useRef<TextArea>(),
		dateEditInput = useRef<DatePicker>(),
		themeSelect = useRef<List>(),
		shellBar = useRef<ShellBar>(),
		profileSettingsSelect = useRef<List>(),
		dialogButton = useRef<Button>(),
		dialogHelpCloseButton = useRef<Button>(),
		rtlSwitch = useRef<Switch>(),
		contentDensitySwitch = useRef<Switch>(),
		profilePopover = useRef<Popover>(),
		settingsDialog = useRef<Dialog>(),
		helpDialog = useRef<Dialog>(),
		themeSettingsPopover = useRef<Popover>();

	const handleCancel = useCallback(() => {
		if (editDialog.current) {
			editDialog.current.open = false;
		}
	}, [editDialog]);

	const handleProfileClick = useCallback((event: CustomEvent<ShellBarProfileClickEventDetail>) => {
		if (profilePopover.current) {
			profilePopover.current.opener = event.detail.targetRef;
			profilePopover.current.open = true;
		}
	}, []);

	const handleSettingsDialogCloseButtonClick = useCallback(() => {
		if (settingsDialog.current) {
			settingsDialog.current.open = false;
		}
	}, []);

	const handleHelpDialogCloseButtonClick = useCallback(() => {
		if (helpDialog.current) {
			helpDialog.current.open = false;
		}
	}, []);

	const handleRtlSwitchChange = useCallback((event: CustomEvent) => {
		document.body.dir = (event.target as Switch).checked ? "rtl" : "ltr";
		applyDirection();
	}, []);

	const handleContentDensitySwitchChange = useCallback((event: CustomEvent) => {
		if ((event.target as Switch).checked) {
			document.body.classList.add("ui5-content-density-compact");
		} else {
			document.body.classList.remove("ui5-content-density-compact");
		}
	}, []);

	const handleProfileSettingsSelect = useCallback((event: CustomEvent<ListItemClickEventDetail>) => {
		const selectedKey = event.detail.item.getAttribute("data-key");
		if (selectedKey === "settings") {
			if (settingsDialog.current) {
				settingsDialog.current.open = true;
			}
		} else if (selectedKey === "help") {
			if (helpDialog.current) {
				helpDialog.current.open = true;
			}
		}
	}, []);

	const handleThemeSettingsToggle = useCallback((event: CustomEvent<ShellBarItemClickEventDetail>) => {
		if (themeSettingsPopover.current) {
			themeSettingsPopover.current.opener = event.detail.targetRef;
			themeSettingsPopover.current.open = true;
		}
	}, []);

	const handleThemeChange = useCallback((event: CustomEvent<ListSelectionChangeEventDetail>) => {
		const selectedTheme = event.detail.selectedItems[0].getAttribute("data-theme")!;
		setTheme(selectedTheme);
	}, []);

	const handleSave = useCallback(() => {
		const edittedText = titleEditInput.current?.value || "";
		const edittedDate = dateEditInput.current?.value || "";

		setTodos((todos) =>
			todos.map((todo) => {
				if (todo.id === todoBeingEditted.id) {
					todo.text = edittedText;
					todo.deadline = edittedDate;
				}
				return todo;
			})
		);

		if (editDialog.current) {
			editDialog.current.open = false;
		}
	}, [todoBeingEditted, setTodos]);

	const handleDone = useCallback(
		(event: CustomEvent<ListSelectionChangeEventDetail>) => {
			const selectedItem = event.detail.selectedItems[0];
			const selectedId = selectedItem.getAttribute("data-key");

			setTodos((todos) =>
				todos.map((todo) => {
					return { ...todo, done: todo.done || selectedId === todo.id.toString() };
				})
			);
		},
		[setTodos]
	);

	const handleUnDone = useCallback(
		(event: CustomEvent<ListSelectionChangeEventDetail>) => {
			const selectedItems = event.detail.selectedItems;

			setTodos((todos) =>
				todos.map((todo) => {
					const unselectedItem = selectedItems.filter((item) => item.getAttribute("data-key") === todo.id.toString());
					todo.done = !!unselectedItem[0];
					return todo;
				})
			);
		},
		[setTodos]
	);

	const handleAdd = useCallback(() => {
		setTodos((todos) => [
			...todos,
			{
				text: todoInput.current?.value || "",
				id: todos.length + 1,
				deadline: todoDeadline.current?.value || "",
				done: false,
			},
		]);
	}, [setTodos]);

	const handleRemove = useCallback(
		(id: number) => {
			setTodos((todos) => todos.filter((todo) => todo.id !== id));
		},
		[setTodos]
	);

	const handleEdit = useCallback(
		(id: number) => {
			const todoObj = todos.filter((todo) => {
				return todo.id === id;
			})[0];

			setTodoBeingEditted({
				id: id,
				text: todoObj.text,
				deadline: todoObj.deadline,
			});

			if (editDialog.current) {
				editDialog.current.open = true;
			}
		},
		[todos, setTodoBeingEditted]
	);

	useEffect(() => {
		const currentTodoInput = todoInput.current;

		currentTodoInput?.addEventListener("submit", handleAdd);
		return () => {
			currentTodoInput?.removeEventListener("submit", handleAdd);
		};
	}, [handleAdd]);

	useEffect(() => {
		const currentProfileSettingsSelect = profileSettingsSelect.current;

		currentProfileSettingsSelect?.addEventListener("item-click", handleProfileSettingsSelect as EventListener);
		return () => {
			currentProfileSettingsSelect?.removeEventListener("item-click", handleProfileSettingsSelect as EventListener);
		};
	}, [handleProfileSettingsSelect]);

	useEffect(() => {
		const curretnAddButton = addButton.current;

		curretnAddButton?.addEventListener("click", handleAdd);
		return () => {
			curretnAddButton?.removeEventListener("click", handleAdd);
		};
	}, [handleAdd]);

	useEffect(() => {
		const currentCancelBtn = cancelBtn.current;

		currentCancelBtn?.addEventListener("click", handleCancel);
		return () => {
			currentCancelBtn?.removeEventListener("click", handleCancel);
		};
	}, [handleCancel]);

	useEffect(() => {
		const currentSaveBtn = saveBtn.current;

		currentSaveBtn?.addEventListener("click", handleSave);
		return () => {
			currentSaveBtn?.removeEventListener("click", handleSave);
		};
	}, [handleSave]);

	useEffect(() => {
		const currentThemeChangeItem = themeChangeItem.current;

		currentThemeChangeItem?.addEventListener("click", handleThemeSettingsToggle as EventListener);
		return () => {
			currentThemeChangeItem?.removeEventListener("click", handleThemeSettingsToggle as EventListener);
		};
	}, [handleThemeSettingsToggle]);

	useEffect(() => {
		const currentThemeSelect = themeSelect.current;

		currentThemeSelect?.addEventListener("selection-change", handleThemeChange as EventListener);
		return () => {
			currentThemeSelect?.removeEventListener("selection-change", handleThemeChange as EventListener);
		};
	}, [handleThemeChange]);

	useEffect(() => {
		const currentShellBar = shellBar.current;

		currentShellBar?.addEventListener("profile-click", handleProfileClick as EventListener);
		return () => {
			currentShellBar?.removeEventListener("profile-click", handleProfileClick as EventListener);
		};
	}, [handleProfileClick]);

	useEffect(() => {
		const currentDialogButton = dialogButton.current;

		currentDialogButton?.addEventListener("click", handleSettingsDialogCloseButtonClick);
		return () => {
			currentDialogButton?.removeEventListener("click", handleSettingsDialogCloseButtonClick);
		};
	}, [handleSettingsDialogCloseButtonClick]);

	useEffect(() => {
		const currentDialogHelpCloseButton = dialogHelpCloseButton.current;

		currentDialogHelpCloseButton?.addEventListener("click", handleHelpDialogCloseButtonClick);
		return () => {
			currentDialogHelpCloseButton?.removeEventListener("click", handleHelpDialogCloseButtonClick);
		};
	}, [handleHelpDialogCloseButtonClick]);

	useEffect(() => {
		const currentRtlSwitch = rtlSwitch.current;

		currentRtlSwitch?.addEventListener("change", handleRtlSwitchChange as EventListener);
		return () => {
			currentRtlSwitch?.removeEventListener("change", handleRtlSwitchChange as EventListener);
		};
	}, [handleRtlSwitchChange]);

	useEffect(() => {
		const currentContentDensitySwitch = contentDensitySwitch.current;

		currentContentDensitySwitch?.addEventListener("change", handleContentDensitySwitchChange as EventListener);
		return () => {
			currentContentDensitySwitch?.removeEventListener("change", handleContentDensitySwitchChange as EventListener);
		};
	}, [handleContentDensitySwitchChange]);

	return (
		<div className="app">
			<ui5-shellbar primary-title="UI5 Web Components React Sample Application" show-notifications notifications-count="2" ref={shellBar}>
				<img className="app-header-logo" alt="logo" slot="logo" src={logo} />
				<ui5-shellbar-item icon="palette" text="Theme" ref={themeChangeItem}></ui5-shellbar-item>
				<ui5-avatar slot="profile" size="XS" initials="JD"></ui5-avatar>
			</ui5-shellbar>

			<ui5-tabcontainer collapsed>
				<ui5-tab text="My Todos"></ui5-tab>
			</ui5-tabcontainer>

			<section className="app-content">
				<div className="create-todo-wrapper">
					<ui5-input placeholder="Type a task..." ref={todoInput} className="add-todo-element-width" id="add-input"></ui5-input>
					<ui5-date-picker format-pattern="dd/MM/yyyy" className="add-todo-element-width" ref={todoDeadline} id="date-picker"></ui5-date-picker>
					<ui5-button className="add-todo-element-width" ref={addButton} design="Emphasized" id="add-button">
						Add Todo
					</ui5-button>
				</div>

				<div className="list-todos-wrapper">
					<ui5-panel header-text="Incompleted Tasks" collapsed={!todos.filter((todo) => !todo.done).length || undefined} className="list-todos-panel">
						<TodoList items={todos.filter((todo) => !todo.done)} handleSelectionChange={handleDone} handleDelete={handleRemove} handleEdit={handleEdit}></TodoList>
					</ui5-panel>

					<ui5-panel header-text="Completed Tasks" collapsed={!todos.filter((todo) => todo.done).length || undefined} className="list-todos-panel" id="completed-tasks">
						<TodoList items={todos.filter((todo) => todo.done)} handleSelectionChange={handleUnDone} handleDelete={handleRemove} handleEdit={handleEdit}></TodoList>
					</ui5-panel>
				</div>
			</section>

			<ui5-dialog header-text="Edit Todo" ref={editDialog}>
				<div className="dialog-content">
					<div className="edit-wrapper">
						<ui5-label>Title:</ui5-label>
						<ui5-textarea className="title-textarea" max-length="24" show-exceeded-text value={todoBeingEditted.text} ref={titleEditInput}></ui5-textarea>
					</div>

					<div className="edit-wrapper date-edit-fields">
						<ui5-label>Date:</ui5-label>
						<ui5-date-picker format-pattern="dd/MM/yyyy" value={todoBeingEditted.deadline} ref={dateEditInput}></ui5-date-picker>
					</div>
				</div>

				<div className="dialog-footer">
					<ui5-button className="dialog-footer-btn--cancel" design="Transparent" ref={cancelBtn}>
						Cancel
					</ui5-button>
					{/*close dialog*/}
					<ui5-button className="dialog-footer-btn--save" design="Emphasized" ref={saveBtn}>
						Save
					</ui5-button>
					{/*save dialog info*/}
				</div>
			</ui5-dialog>

			<ui5-popover ref={themeSettingsPopover} className="app-bar-theming-popover" placement="Bottom" horizontal-align="End" header-text="Theme">
				<ui5-list ref={themeSelect} selection-mode="Single">
					<ui5-li icon="palette" data-theme="sap_horizon" selected>
						SAP Horizon Morning
					</ui5-li>
					<ui5-li icon="palette" data-theme="sap_horizon_dark">
						SAP Horizon Evening
					</ui5-li>
					<ui5-li icon="palette" data-theme="sap_horizon_hcb">
						SAP Horizon HCB
					</ui5-li>
					<ui5-li icon="palette" data-theme="sap_horizon_hcw">
						SAP Horizon HCW
					</ui5-li>
					<ui5-li icon="palette" data-theme="sap_fiori_3">
						SAP Quartz Light
					</ui5-li>
					<ui5-li icon="palette" data-theme="sap_fiori_3_dark">
						SAP Quartz Dark
					</ui5-li>
					<ui5-li icon="palette" data-theme="sap_fiori_3_hcb">
						SAP Quartz HCB
					</ui5-li>
					<ui5-li icon="palette" data-theme="sap_fiori_3_hcw">
						SAP Quartz HCW
					</ui5-li>
				</ui5-list>
			</ui5-popover>

			<ui5-popover ref={profilePopover} className="app-bar-profile-popover" placement="Bottom" horizontal-align="End">
				<div className="profile-settings">
					<ui5-avatar size="M" initials="JD"></ui5-avatar>
					<div className="profile-text">
						<ui5-title level="H3">John Doe</ui5-title>
						<ui5-label>React Developer</ui5-label>
					</div>
				</div>

				<div className="profile-settings-list">
					<ui5-list selection-mode="Single" separators="None" ref={profileSettingsSelect}>
						<ui5-li icon="settings" data-key="settings">
							Settings
						</ui5-li>
						<ui5-li icon="sys-help" data-key="help">
							Help
						</ui5-li>
						<ui5-li icon="log" data-key="sign-out">
							Sign out
						</ui5-li>
					</ui5-list>
				</div>
			</ui5-popover>

			<ui5-dialog ref={settingsDialog} header-text="Profile Settings" draggable>
				<div>
					<div className="profile-rtl-switch centered">
						<div className="profile-rtl-switch-title">
							<ui5-label className="profile-rtl-switch-text">RTL</ui5-label>
						</div>
						<ui5-switch ref={rtlSwitch}></ui5-switch>
					</div>
				</div>

				<div className="profile-rtl-switch centered">
					<div className="profile-rtl-switch-title">
						<ui5-label className="profile-rtl-switch-text">Compact</ui5-label>
					</div>
					<ui5-switch ref={contentDensitySwitch}></ui5-switch>
				</div>

				<div className="dialog-button">
					<ui5-button ref={dialogButton} design="Emphasized">
						Close
					</ui5-button>
				</div>
			</ui5-dialog>

			<ui5-dialog ref={helpDialog} header-text="">
				<div slot="header" className="help-header" id="header-title-align">
					<ui5-icon name="sys-help"></ui5-icon>
					Help
				</div>

				<div className="help-header" id="header-logo-align">
					<img className="app-header-logo" alt="logo" slot="logo" src={logo} />
					<ui5-title level="H5">UI5 Web Components React Sample App</ui5-title>
				</div>

				<p className="help-dialog-text">
					<b>Release</b>: b225.20220729335 <br></br>
					<b>Server</b>: 31pc212x3132 <br></br>
					<b>Timestamp</b>: 2022-07-28T10:29:03.159+0200 <br></br>
					<b>Company ID</b>: SAP <br></br>
					<b>UI version</b>: SAP Fiori <br></br>
					<b>Edition</b>: Enterprise <br></br>
					<b>Admin version</b>: React Admin <br></br>
					<hr></hr>
					For more information, please visit our{" "}
					<a href="https://github.com/SAP-samples/ui5-webcomponents-sample-react" target="_blank">
						documentation
					</a>
					.
				</p>

				<div className="dialog-button">
					<ui5-button design="Emphasized" ref={dialogHelpCloseButton}>
						Close
					</ui5-button>
				</div>
			</ui5-dialog>
		</div>
	);
}

export default App;
