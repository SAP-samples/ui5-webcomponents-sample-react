import React, { useState, useRef, useEffect, useCallback } from "react";
import logo from "./logo.png";
import "./App.css";
import TodoList from "./TodoList";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-base/dist/features/F6Navigation";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/CustomListItem";
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

setTheme("sap_horizon");
function App() {
	const [todos, setTodos] = useState([
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
	const [todoBeingEditted, setTodoBeingEditted] = useState({
		id: "",
		text: "",
		date: "",
	});

	const themeChangeItem = useRef(),
		addButton = useRef(),
		todoInput = useRef(),
		todoDeadline = useRef(),
		editDialog = useRef(),
		cancelBtn = useRef(),
		saveBtn = useRef(),
		titleEditInput = useRef(),
		dateEditInput = useRef(),
		themeSelect = useRef(),
		shellBar = useRef(),
		profileSettingsSelect = useRef(),
		dialogButton = useRef(),
		dialogHelpCloseButton = useRef(),
		rtlSwitch = useRef(),
		contentDensitySwitch = useRef();

	function handleCancel() {
		editDialog.current.close();
	}

	const handleProfileClick = useCallback((event) => {
		window["profile-pop"].showAt(event.detail.targetRef);
	}, []);

	const handleSettingsDialogCloseButtonClick = useCallback(() => {
		window["settings-dialog"].close();
	}, []);

	const handleHelpDialogCloseButtonClick = useCallback(() => {
		window["help-dialog"].close();
	}, []);

	const handleRtlSwitchChange = useCallback((event) => {
		document.body.dir = event.target.checked ? "rtl" : "ltr";
		applyDirection();
	}, []);

	const handleContentDensitySwitchChange = useCallback((event) => {
		if (event.target.checked) {
			document.body.classList.add("ui5-content-density-compact");
		} else {
			document.body.classList.remove("ui5-content-density-compact");
		}
	}, []);

	const handleProfileSettingsSelect = useCallback((event) => {
		const selectedKey = event.detail.item.getAttribute("data-key");
		if (selectedKey === "settings") {
			window["settings-dialog"].show(event.detail.targetRef);
		} else if (selectedKey === "help") {
			window["help-dialog"].show(event.detail.targetRef);
		}
	}, []);

	const handleThemeSettingsToggle = useCallback((event) => {
		window["theme-settings-popover"].showAt(event.detail.targetRef);
	}, []);

	const handleThemeChange = useCallback((event) => {
		const selectedTheme = event.detail.selectedItems[0].getAttribute("data-theme");
		setTheme(selectedTheme);
	}, []);

	const handleSave = useCallback(() => {
		const edittedText = titleEditInput.current.value;
		const edittedDate = dateEditInput.current.value;

		setTodos((todos) =>
			todos.map((todo) => {
				if (todo.id === todoBeingEditted.id) {
					todo.text = edittedText;
					todo.deadline = edittedDate;
				}
				return todo;
			})
		);

		editDialog.current.close();
	}, [todoBeingEditted, setTodos]);

	const handleDone = useCallback(
		(event) => {
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
		(event) => {
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
				text: todoInput.current.value,
				id: todos.length + 1,
				deadline: todoDeadline.current.value,
				done: false,
			},
		]);
	}, [setTodos]);

	const handleRemove = useCallback(
		(id) => {
			setTodos((todos) => todos.filter((todo) => todo.id !== id));
		},
		[setTodos]
	);

	const handleEdit = useCallback(
		(id) => {
			const todoObj = todos.filter((todo) => {
				return todo.id === id;
			})[0];

			setTodoBeingEditted(() => ({
				id: id,
				text: todoObj.text,
				deadline: todoObj.deadline,
			}));

			editDialog.current.show();
		},
		[todos, setTodoBeingEditted]
	);

	useEffect(() => {
		todoInput.current.addEventListener("submit", handleAdd);
		return () => {
			todoInput.current.removeEventListener("submit", handleAdd);
		};
	}, [handleAdd]);

	useEffect(() => {
		profileSettingsSelect.current.addEventListener("item-click", handleProfileSettingsSelect);
		return () => {
			profileSettingsSelect.current.removeEventListener("item-click", handleProfileSettingsSelect);
		};
	}, [handleProfileSettingsSelect]);

	useEffect(() => {
		addButton.current.addEventListener("click", handleAdd);
		return () => {
			addButton.current.removeEventListener("click", handleAdd);
		};
	}, [handleAdd]);

	useEffect(() => {
		cancelBtn.current.addEventListener("click", handleCancel);
		return () => {
			cancelBtn.current.removeEventListener("click", handleCancel);
		};
	}, [handleCancel]);

	useEffect(() => {
		saveBtn.current.addEventListener("click", handleSave);
		return () => {
			saveBtn.current.removeEventListener("click", handleSave);
		};
	}, [handleSave]);

	useEffect(() => {
		themeChangeItem.current.addEventListener("click", handleThemeSettingsToggle);
		return () => {
			themeChangeItem.current.removeEventListener("click", handleThemeSettingsToggle);
		};
	}, [handleThemeSettingsToggle]);

	useEffect(() => {
		themeSelect.current.addEventListener("selection-change", handleThemeChange);
		return () => {
			themeSelect.current.removeEventListener("selection-change", handleThemeChange);
		};
	}, [handleThemeChange]);

	useEffect(() => {
		shellBar.current.addEventListener("profile-click", handleProfileClick);
		return () => {
			shellBar.current.removeEventListener("profile-click", handleProfileClick);
		};
	}, [handleProfileClick]);

	useEffect(() => {
		dialogButton.current.addEventListener("click", handleSettingsDialogCloseButtonClick);
		return () => {
			dialogButton.current.removeEventListener("click", handleSettingsDialogCloseButtonClick);
		};
	}, [handleSettingsDialogCloseButtonClick]);

	useEffect(() => {
		dialogHelpCloseButton.current.addEventListener("click", handleHelpDialogCloseButtonClick);
		return () => {
			dialogHelpCloseButton.current.removeEventListener("click", handleHelpDialogCloseButtonClick);
		};
	}, [handleHelpDialogCloseButtonClick]);

	useEffect(() => {
		rtlSwitch.current.addEventListener("change", handleRtlSwitchChange);
		return () => {
			rtlSwitch.current.removeEventListener("change", handleRtlSwitchChange);
		};
	}, [handleRtlSwitchChange]);

	useEffect(() => {
		contentDensitySwitch.current.addEventListener("change", handleContentDensitySwitchChange);
		return () => {
			contentDensitySwitch.current.removeEventListener("change", handleContentDensitySwitchChange);
		};
	}, [handleContentDensitySwitchChange]);

	return (
		<div className="app">
			<ui5-shellbar primary-title="UI5 Web Components React Sample Application" show-notifications notifications-count="2" ref={shellBar}>
				<img className="app-header-logo" alt="logo" slot="logo" src={logo} />
				<ui5-shellbar-item icon="palette" text="Theme" ref={themeChangeItem}></ui5-shellbar-item>
				<ui5-avatar slot="profile" size="XS" initials="JD"></ui5-avatar>
			</ui5-shellbar>

			<ui5-tabcontainer fixed collapsed>
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
						<TodoList items={todos.filter((todo) => !todo.done)} selectionChange={handleDone} remove={handleRemove} edit={handleEdit}></TodoList>
					</ui5-panel>

					<ui5-panel header-text="Completed Tasks" collapsed={!todos.filter((todo) => todo.done).length || undefined} className="list-todos-panel" id="completed-tasks">
						<TodoList items={todos.filter((todo) => todo.done)} selectionChange={handleUnDone} remove={handleRemove} edit={handleEdit}></TodoList>
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

			<ui5-popover id="theme-settings-popover" className="app-bar-theming-popover" placement-type="Bottom" horizontal-align="Right" header-text="Theme">
				<ui5-list ref={themeSelect} mode="SingleSelect">
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

			<ui5-popover id="profile-pop" className="app-bar-profile-popover" placement-type="Bottom" horizontal-align="Right">
				<div className="profile-settings">
					<ui5-avatar size="M" initials="JD"></ui5-avatar>
					<div className="profile-text">
						<ui5-title level="H3">John Doe</ui5-title>
						<ui5-label>React Developer</ui5-label>
					</div>
				</div>

				<div className="profile-settings-list">
					<ui5-list mode="SingleSelect" separators="None" ref={profileSettingsSelect}>
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

			<ui5-dialog id="settings-dialog" header-text="Profile Settings" draggable>
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

			<ui5-dialog id="help-dialog" header-text="">
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
					<a href="https://github.com/SAP-samples/ui5-webcomponents-sample-react" target={"_blank"}>
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
