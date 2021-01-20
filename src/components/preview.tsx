import React, { useRef, useEffect } from 'react'
import { ImageParams } from "../image"
import { isChangeCopyrightPosition  } from "../event"
import { getDrawTextParameter } from "../draw-text";
import styled from 'styled-components';

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
    props.listen((e) => {
      const copyrightDom = copyrightRef.current
      const canvas = canvasRef.current

      if(copyrightDom && canvas && isChangeCopyrightPosition(e)) {
        const textSize = {
          width: copyrightDom.offsetWidth,
          height: copyrightDom.offsetHeight 
        }
        const canvasSize = {
          width: canvas.width,
          height: canvas.height
        }

        const params = getDrawTextParameter(COPYRIGHT, e.position, textSize, canvasSize)

        const ctx = canvasRef.current?.getContext('2d')
        const image = new Image()
        image.src = props.imageParams.dataUrl
        ctx?.drawImage(image, 0, 0)
        ctx?.strokeText(params.text, params.x, params.y)
      }
    })
  }, [props.listen, canvasRef.current, copyrightRef.current])

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
  }, [props.imageParams.dataUrl, canvasRef.current])

  return (
    <PreviewInner>
      <canvas ref={canvasRef}></canvas>
      <span ref={copyrightRef}>{COPYRIGHT}</span>
    </PreviewInner>
  )
}
