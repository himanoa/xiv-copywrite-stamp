export type Position = "upper-left" | "upper-right" | "lower-left" | "lower-right"

export const isPosition = (position: string): position is Position => {
  switch(position) {
    case 'upper-left': {
      return true;
    };
    case 'upper-right': {
      return true;
    };
    case 'lower-left': {
      return true;
    }
    case 'lower-right': {
      return true;
    }
  }
  return false;
}

export type TextProperty = {
  fontSize: number,
  position: Position 
}

export const defaultProperty = (): TextProperty => {
  return {
    fontSize: 14,
    position: 'upper-left' 
  }
}
