import React, { useRef, useEffect } from 'react'
import { ImageParams } from "../image"
import styled from 'styled-components'

const PreviewInner = styled.div`
  max-width: 100%;
  max-height: 100%;
  overflow: scroll;
`

interface Props {
  imageParams: ImageParams,
}

export const Preview = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if(canvasRef.current) {
      const callback = () => {
        const ctx = canvasRef.current?.getContext('2d')

        if(canvasRef.current) {
          canvasRef.current.width = image.width
          canvasRef.current.height = image.height
          ctx?.drawImage(image, 0, 0)
        }

      }

      const image = new Image()
      image.src = props.imageParams.dataUrl
      image.addEventListener("load", callback, false)

      return () => {
        image.removeEventListener('load', callback)
      }
    }
  }, [props.imageParams.dataUrl,  canvasRef.current])

  return (
    <PreviewInner>
      <canvas ref={canvasRef}></canvas>
    </PreviewInner>
  )
}
