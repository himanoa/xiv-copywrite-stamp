import React from 'react'
import { UploadState } from "../state"
import { Card } from "@blueprintjs/core"
import { Uploader } from './uploader'

interface Props {
  state: UploadState
  onUploaded: (dataUrl: string) => void
}


export const Preview = (props: Props) => {
  if(props.state === 'not-uploaded') {
    return (
      <Uploader onUploaded={props.onUploaded}/>
    )
  } else if(props.state === 'uploaded') {
    return (
      <Card>
      </Card>
    )
  }
  return <>開発者向け: サポートされていない状態です</>
}
