import React from 'react'
import ReactDOM from 'react-dom'
import { Classes, Intent, Spinner } from "@blueprintjs/core";

const elm = document.getElementById("root");

if(elm){
  ReactDOM.render(<Spinner className={Classes.SMALL} intent={Intent.PRIMARY}/>, elm)
}
