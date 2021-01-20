import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Previewer } from './previewer'
import { PropertyEditor } from './property-editor'
import { ImageParams } from '../image'
import { createNanoEvents } from 'nanoevents'
import { isEvents } from '../event'

const ContentInner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  div {
    max-width: 50vw;
    padding: 4px;
  }

  .preview {
    width: 50vw;
  }

  .property-editor {
    width: 50vw;
  }
`

export const Content = () => {
  const [imageParams, setImageParams] = useState<ImageParams | null>(null)

  const eventListener = createNanoEvents()
  const onUploaded = useCallback((imageParams: ImageParams) => {
    setImageParams(imageParams)
  }, [setImageParams])

  const emit = useCallback((e: any) => {
    if(isEvents(e)) {
      eventListener.emit(e)
    } else {
      throw new Error(`不明なオブジェクトです`)
    }
  }, [eventListener.emit])

  return (
    <ContentInner>
      <div className="preview">
        <Previewer onUploaded={onUploaded} imageParams={imageParams}/>
      </div>
      <div className="property-editor">
        <PropertyEditor emit={emit}/>
      </div>
    </ContentInner>
  )
}
