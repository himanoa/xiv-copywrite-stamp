export type Events = ChangeCopyrightPosition 

export type Position = "upper-left" | "upper-right" | "lower-left" | "lower-right"

export type ChangeCopyrightPosition = {
  eventType: "ChangeCopyrightPosition",
  position: Position 
}

export const isPosition = (position: string): position is Position => {
  switch(position) {
    case 'upper-left': {
      return true;
    };
    case 'uppper-right': {
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

export type Emitter = (e: Events) => void

export const changeCopyrightPosition = (deps: {
  emit: Emitter
}) => (v: string) => {
  if(isPosition(v)) {
    deps.emit({
      eventType: "ChangeCopyrightPosition",
      position: v
    })
  } else {
    throw new Error(`${v}は許容されたPositionではありません`)
  }
}
