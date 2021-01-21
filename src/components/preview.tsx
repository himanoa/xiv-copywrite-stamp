import React, { useRef, useEffect, useMemo } from 'react'
import { ImageParams } from "../image"
import { isChangeCopyrightPosition  } from "../event"
import { getDrawTextParameter } from "../draw-text";
import styled from 'styled-components';
import { createCanvasImagePreviewPresenter } from '../canvas-image-preview-presenter'

const PreviewInner = styled.div`
  max-width: 100%;
  max-height: 100%;
  overflow: scroll;
  span {
    visibility: hidden;
  }
`

interface Props {
  imageParams: ImageParams,
  listen: (cb: (e: any) => void) => void
}

const COPYRIGHT = "(C) 2010 SQUARE ENIX CO., LTD. All Rights Reserve"

export const Preview = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const copyrightRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const canvasImagePreviewPresenter = createCanvasImagePreviewPresenter(
      canvasRef.current,
      copyrightRef.current,
      props.imageParams.dataUrl
    )

    canvasImagePreviewPresenter.load().then(({size}) => {
      if(canvasRef.current) {
        canvasRef.current.width = size.width
        canvasRef.current.height = size.height
      }
    })

    props.listen((e) => {
      canvasImagePreviewPresenter?.drawCopyright(e.position)
    })
  }, [canvasRef.current, copyrightRef.current])

  return (
    <PreviewInner>
      <canvas ref={canvasRef}></canvas>
      <span ref={copyrightRef}>{COPYRIGHT}</span>
    </PreviewInner>
  )
}
