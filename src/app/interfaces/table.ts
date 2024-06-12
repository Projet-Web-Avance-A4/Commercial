import { SelectionMode } from "@nextui-org/react";

export interface Options {
    action_code?: string; // May become future implementation for passing HTML code to the table component
    content: string;
    selection_mode?: SelectionMode;
    search_name: string;
    search_uid: string[];
    option_name: string;
    option_uid: string;
    value_option: { name: string; uid: string }[];
}

export interface propsTable {
    columns: { name: string; uid: string }[];
    options: Options
    items: any[];
    INITIAL_VISIBLE_COLUMNS: string[];
}