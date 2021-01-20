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
  switch(position) {
    case "upper-left": {
      return { x: 0, y: 0, text }
    };
    case "upper-right": {
      return { x: imageSize.width - textSize.width, y: 0, text }
    };
    case "lower-left": {
      return { x: 0, y: imageSize.height - textSize.height, text }
    };
    case "lower-right": {
      return { x: imageSize.width - textSize.width, y: imageSize.height - textSize.height, text }
    };
  }
}
