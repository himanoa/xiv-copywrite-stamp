import { Position } from "./text-property";

export type DrawTextParameter = {
  text: string;
  x: number;
  y: number;
  baseLine: CanvasTextBaseline;
};

export type Size = {
  width: number;
  height: number;
};

export const getDrawTextParameter = (
  text: string,
  position: Position,
  textSize: Size,
  imageSize: Size
): DrawTextParameter => {
  const padding = 8;
  switch (position) {
    case "upper-left": {
      return {
        x: 0 + padding,
        y: 0 + textSize.height / 2 + padding,
        baseLine: "bottom",
        text,
      };
    }
    case "upper-right": {
      return {
        x: imageSize.width - textSize.width - padding,
        y: 0 + textSize.height / 2 + padding,
        baseLine: "bottom",
        text,
      };
    }
    case "lower-left": {
      return {
        x: 0 + padding,
        y: imageSize.height - textSize.height / 2,
        baseLine: "top",
        text,
      };
    }
    case "lower-right": {
      return {
        x: imageSize.width - textSize.width - padding,
        y: imageSize.height - textSize.height / 2,
        baseLine: "top",
        text,
      };
    }
  }
};
