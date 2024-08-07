// custom.d.ts
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import type ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import type Avatar from "@ui5/webcomponents/dist/Avatar.js";
import type TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import type Tab from "@ui5/webcomponents/dist/Tab.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type DatePicker from "@ui5/webcomponents/dist/DatePicker.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type Panel from "@ui5/webcomponents/dist/Panel.js";
import type Label from "@ui5/webcomponents/dist/Label.js";
import type TextArea from "@ui5/webcomponents/dist/TextArea.js";
import type Dialog from "@ui5/webcomponents/dist/Dialog.js";
import type List from "@ui5/webcomponents/dist/List.js";
import type ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type Title from "@ui5/webcomponents/dist/Title.js";
import type Switch from "@ui5/webcomponents/dist/Switch.js";
import type Icon from "@ui5/webcomponents/dist/Icon.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";

import { DOMAttributes, useRef, Key } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomElement<T> = Partial<T & CustomElementAttrs<T> & { children: any }>;
type CustomElementAttrs<T> = DOMAttributes<T> & { key: Key; ref: ReturnType<typeof useRef<T>>; class: string };

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"ui5-shellbar": CustomElement<ShellBar>;
			"ui5-shellbar-item": CustomElement<ShellBarItem>;
			"ui5-avatar": CustomElement<Avatar>;
			"ui5-tabcontainer": CustomElement<TabContainer>;
			"ui5-tab": CustomElement<Tab>;
			"ui5-input": CustomElement<Input>;
			"ui5-date-picker": CustomElement<DatePicker>;
			"ui5-button": CustomElement<Button>;
			"ui5-panel": CustomElement<Panel>;
			"ui5-label": CustomElement<Label>;
			"ui5-textarea": CustomElement<TextArea>;
			"ui5-dialog": CustomElement<Dialog>;
			"ui5-list": CustomElement<List>;
			"ui5-li": CustomElement<ListItemStandard>;
			"ui5-li-custom": CustomElement<ListItemCustom>;
			"ui5-popover": CustomElement<Popover>;
			"ui5-title": CustomElement<Title>;
			"ui5-switch": CustomElement<Switch>;
			"ui5-icon": CustomElement<Icon>;
		}
	}
}
