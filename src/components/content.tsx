import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Previewer } from './previewer'
import { PropertyEditor } from './property-editor'
import { ImageParams } from '../image'

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

  const onUploaded = useCallback((imageParams: ImageParams) => {
    setImageParams(imageParams)
  }, [setImageParams])

  return (
    <ContentInner>
      <div className="preview">
        <Previewer onUploaded={onUploaded} imageParams={imageParams}/>
      </div>
      <div className="property-editor">
        <PropertyEditor />
      </div>
    </ContentInner>
  )
}
