import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Preview } from './preview'
import { UploadState } from '../state'

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
  const [uploadedState, setUploadedState] = useState<UploadState>('not-uploaded')

  const onUploaded = useCallback(() => {
    setUploadedState('uploaded')
  }, [setUploadedState])

  return (
    <ContentInner>
      <div className="preview">
        <Preview onUploaded={onUploaded} state={uploadedState} />
      </div>
      <div className="properties-form">
      </div>
    </ContentInner>
  )
}
