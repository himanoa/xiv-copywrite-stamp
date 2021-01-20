import { Position } from "./event"

export type DrawTextParameter = {
  text: string;
  x: number
  y: number
}

export type Size = {
  width: number;
  height: number;
}

export const getDrawTextParameter = (text: string, position: Position, textSize: Size, imageSize: Size): DrawTextParameter => {
  const padding = 16;
  console.dir(imageSize)
  console.dir(textSize)
  switch(position) {
    case "upper-left": {
      return { x: 0 + padding, y: 0 + padding, text }
    };
    case "upper-right": {
      return { x: imageSize.width - textSize.width - padding, y: 0 + padding, text }
    };
    case "lower-left": {
      return { x: 0 + padding, y: imageSize.height - textSize.height - padding, text }
    };
    case "lower-right": {
      return { x: imageSize.width - textSize.width - padding, y: imageSize.height - textSize.height - padding, text }
    };
  }
}
