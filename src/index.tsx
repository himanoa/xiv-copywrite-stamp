import React from "react";
import ReactDOM from "react-dom";
import { Page } from "./components/page";
import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

const elm = document.getElementById("root");

if (elm) {
  ReactDOM.render(<Page />, elm);
}
