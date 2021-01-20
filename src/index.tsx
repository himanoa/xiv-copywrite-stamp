import React from 'react'
import ReactDOM from 'react-dom'
import { Classes, Intent, Spinner } from "@blueprintjs/core";
import { Content } from './components/content'

const elm = document.getElementById("root");

if(elm){
  ReactDOM.render(<Content />, elm)
}
