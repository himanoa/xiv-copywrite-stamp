import React from 'react'
import { Uploader } from './uploader'
import { Preview } from './preview'
import { ImageParams } from "../image"
import { Events } from "../event"

interface Props {
  imageParams: ImageParams | null, 
  onUploaded: (imageParams: ImageParams) => void
  listen: (callback: (e: Events) => void) => void
}


export const Previewer = (props: Props) => {
  if(props.imageParams === null) {
    return (
      <Uploader onUploaded={props.onUploaded}/>
    )
  } else if(props.imageParams) {
    return (
      <Preview imageParams={props.imageParams} listen={props.listen}/>
    )
  }
  return <></>
}
