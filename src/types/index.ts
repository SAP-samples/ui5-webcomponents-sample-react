import type { DOMAttributes, useRef, Key } from "react";
import type Dialog from "@ui5/webcomponents/dist/Dialog";
import type Input from "@ui5/webcomponents/dist/Input";
import type Text from "@ui5/webcomponents/dist/Text";
import type TextArea from "@ui5/webcomponents/dist/TextArea";
import type DatePicker from "@ui5/webcomponents/dist/DatePicker";
import type Select from "@ui5/webcomponents/dist/Select";
import type Panel from "@ui5/webcomponents/dist/Panel";

import type Avatar from "@ui5/webcomponents/dist/Avatar.js";
import type Switch from "@ui5/webcomponents/dist/Switch.js";
import type Label from "@ui5/webcomponents/dist/Label.js";

import type Tab from "@ui5/webcomponents/dist/Tab";
import type TabContainer from "@ui5/webcomponents/dist/TabContainer";
import type TabSeparator from "@ui5/webcomponents/dist/TabSeparator";
import type Button from "@ui5/webcomponents/dist/Button";
import type Popover from "@ui5/webcomponents/dist/Popover";
import type Title from "@ui5/webcomponents/dist/Title";
import type List from "@ui5/webcomponents/dist/List";
import type ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom";
import type Link from "@ui5/webcomponents/dist/Link";
import type StandardListItem from "@ui5/webcomponents/dist/ListItemStandard";
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar";
import type ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import type Icon from "@ui5/webcomponents/dist/Icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomElement<T> = Partial<T & CustomElementAttrs<T> & { children: any }>;
type CustomElementAttrs<T> = DOMAttributes<T> & { key: Key; ref: ReturnType<typeof useRef<T>>; class: string };

declare global {
	namespace JSX {
		interface IntrinsicElements {
			["ui5-tab"]: CustomElement<Tab>;
			["ui5-tabcontainer"]: CustomElement<TabContainer>;
			["ui5-tab-separator"]: CustomElement<TabSeparator>;
			["ui5-button"]: CustomElement<Button>;
			["ui5-title"]: CustomElement<Title>;
			["ui5-label"]: CustomElement<Label>;
			["ui5-dialog"]: CustomElement<Dialog>;
			["ui5-list"]: CustomElement<List>;
			["ui5-li"]: CustomElement<StandardListItem>;
			["ui5-li-custom"]: CustomElement<ListItemCustom>;
			["ui5-link"]: CustomElement<Link>;
			["ui5-popover"]: CustomElement<Popover>;
			["ui5-panel"]: CustomElement<Panel>;
			["ui5-avatar"]: CustomElement<Avatar>;
			["ui5-switch"]: CustomElement<Switch>;
			["ui5-select"]: CustomElement<Select>;
			["ui5-shellbar"]: CustomElement<ShellBar>;
			["ui5-shellbar-item"]: CustomElement<ShellBarItem>;
			["ui5-input"]: CustomElement<Input>;
			["ui5-icon"]: CustomElement<Icon>;
			["ui5-text"]: CustomElement<Text>;
			["ui5-textarea"]: CustomElement<TextArea>;
			["ui5-date-picker"]: CustomElement<DatePicker>;
		}
	}
}

type TodoItem = {
	id: number;
	text: string;
	deadline: string;
	done: boolean;
};

type EditingTodoItem = Omit<TodoItem, "done">;

export type { TodoItem, EditingTodoItem };
