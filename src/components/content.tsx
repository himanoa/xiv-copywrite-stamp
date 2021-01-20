import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Previewer } from './previewer'
import { ImageParams } from '../image'

const ContentInner = styled.div`
  flex: 1;
  flex-direction: row;

  .preview {
    max-width: 50vw;
  }

  .properties-form {
    max-width: 50vw;
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
      <div className="properties-form">
      </div>
    </ContentInner>
  )
}
