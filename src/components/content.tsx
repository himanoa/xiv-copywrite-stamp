import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Previewer } from './previewer'
import { PropertyEditor } from './property-editor'
import { ImageParams } from '../image'
import { createNanoEvents } from 'nanoevents'
import { isEvents, ChangeCopyrightPositionListener } from '../event'

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
    eventListener.emit("ChangeCopyrightPosition", e)
  }, [eventListener.emit])

  const listen = useCallback((e) => {
    return (c: ChangeCopyrightPositionListener) => eventListener.on("ChangeCopyrightPosition", c)
  }, [eventListener.on])

  return (
    <ContentInner>
      <div className="preview">
        <Previewer onUploaded={onUploaded} imageParams={imageParams} listen={listen}/>
      </div>
      <div className="property-editor">
        <PropertyEditor emit={emit}/>
      </div>
    </ContentInner>
  )
}
