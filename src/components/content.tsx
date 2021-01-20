import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Previewer } from './previewer'
import { PropertyEditor } from './property-editor'
import { ImageParams } from '../image'
import { createNanoEvents, DefaultEvents, Emitter } from 'nanoevents'
import { ChangeCopyrightPositionListener } from '../event'

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

let listener: Emitter<DefaultEvents> | null = null
const eventListener = (): Emitter<DefaultEvents> => {
  if(listener === null) {
    return listener = createNanoEvents()
  }
  return listener
}
export const Content = () => {
  const [imageParams, setImageParams] = useState<ImageParams | null>(null)

  const onUploaded = useCallback((imageParams: ImageParams) => {
    setImageParams(imageParams)
  }, [setImageParams])

  const emit = useCallback((e: any) => {
    eventListener().emit("ChangeCopyrightPosition", e)
  }, [eventListener])

  const listen = useMemo(() => {
    const listener = eventListener()
    return listener.on.bind(listener, "ChangeCopyrightPosition")
  }, [eventListener])

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
