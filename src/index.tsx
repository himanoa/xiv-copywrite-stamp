import React from 'react'
import ReactDOM from 'react-dom'
import { Content } from './components/content'

const elm = document.getElementById("root");

if(elm){
  ReactDOM.render(<Content />, elm)
}
