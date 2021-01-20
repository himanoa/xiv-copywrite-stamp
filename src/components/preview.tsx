import React, { useRef, useEffect } from 'react'
import { Card } from "@blueprintjs/core"
import { ImageParams } from "../image"

interface Props {
  imageParams: ImageParams,
}

export const Preview = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if(canvasRef.current) {
      const callback = () => {
        const ctx = canvasRef.current?.getContext('2d')
        ctx?.drawImage(image, 0, 0)
      }

      const image = new Image()
      image.src = props.imageParams.dataUrl
      image.width = props.imageParams.width
      image.height = props.imageParams.height
      image.addEventListener("load", callback, false)

      return () => {
        image.removeEventListener('load', callback)
      }
    }
  }, [props.imageParams.width, props.imageParams.height, props.imageParams.dataUrl,  canvasRef.current])

  return (
    <Card>
      <canvas ref={canvasRef}></canvas>
    </Card>
  )
}
