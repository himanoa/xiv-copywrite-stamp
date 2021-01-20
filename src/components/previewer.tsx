import React from 'react'
import { Uploader } from './uploader'
import { Preview } from './preview'
import { ImageParams } from "../image"
import { Events } from "../event"
import { Emitter, DefaultEvents } from "nanoevents"

interface Props {
  imageParams: ImageParams | null, 
  onUploaded: (imageParams: ImageParams) => void
  emitter: Emitter<DefaultEvents>
}


export const Previewer = (props: Props) => {
  if(props.imageParams === null) {
    return (
      <Uploader onUploaded={props.onUploaded}/>
    )
  } else if(props.imageParams) {
    return (
      <Preview imageParams={props.imageParams} emitter={props.emitter}/>
    )
  }
  return <></>
}
