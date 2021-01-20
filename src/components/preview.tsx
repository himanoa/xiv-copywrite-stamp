import React from 'react'
import { UploadState } from "../state"
import { Button, Card, Elevation, Classes } from "@blueprintjs/core"
import styled from 'styled-components'


interface Props {
  state: UploadState
  onUploaded: () => void
}

const CardContentInner = styled.div`
  text-align: center;
`
const CardContent = () => {
  return (
    <CardContentInner>
      <p >ドラッグ&ドロップで画像を選択できます</p>
    </CardContentInner>
  )
}

export const Preview = (props: Props) => {
  if(props.state === 'not-uploaded') {
    return (
      <div>
        <Card interactive={true}>
          <CardContent />
        </Card>
      </div>
    )
  } else if(props.state === 'uploaded') {
    return (
      <Card>
      </Card>
    )
    return <div></div>
  }
  return <>開発者向け: サポートされていない状態です</>
}
