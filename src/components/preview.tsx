import React, { useRef, useEffect } from 'react'
import { ImageParams } from "../image"
import { Events, isChangeCopyrightPosition  } from "../event"
import { getDrawTextParameter } from "../draw-text";
import styled from 'styled-components';
import { Emitter, DefaultEvents } from "nanoevents"

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
  emitter: Emitter<DefaultEvents>
}

const COPYRIGHT = "(C) 2010 SQUARE ENIX CO., LTD. All Rights Reserve"

export const Preview = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const copyrightRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    props.emitter.on("ChangeCopyrightPosition", (e) => {
      console.log("hello")
      const copyrightDom = copyrightRef.current
      const canvas = canvasRef.current
      if(copyrightDom && canvas && isChangeCopyrightPosition(e)) {
        const textSize = {
          width: parseInt(window.getComputedStyle(copyrightDom).width, 10),
          height: parseInt(window.getComputedStyle(copyrightDom).width, 10)
        }
        const canvasSize = {
          width: canvas.width,
          height: canvas.height
        }

        const params = getDrawTextParameter(COPYRIGHT, e.position, textSize, canvasSize)

        const ctx = canvasRef.current?.getContext('2d')
        console.dir(params)
        ctx?.strokeText(params.text, params.x, params.y)
      }
    })
  }, [props.emitter, canvasRef.current, copyrightRef.current])

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
