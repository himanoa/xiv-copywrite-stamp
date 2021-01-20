const events = [
  "ChangeCopyrightPosition"
] as const

export type Events = typeof events[number]

export const isEvents = (e: string): e is Events => {
  if(events.includes(e as any)) {
    return true
  }
  return false
}

export type Position = "upper-left" | "upper-right" | "lower-left" | "lower-right"


export type ChangeCopyrightPositionPayload = {
  position: Position 
}
export type ChangeCopyrightPositionListener = (c: ChangeCopyrightPositionPayload) => void

export const isChangeCopyrightPosition = (e: any): e is ChangeCopyrightPositionPayload => {
  if(isPosition(e.position)) {
    return true
  } 
  return false;
}

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

export const changeCopyrightPosition = (deps: {
  emit: (params: ChangeCopyrightPositionPayload) => void
}) => (v: string) => {
  if(isPosition(v)) {
    deps.emit({
      position: v
    })
  } else {
    throw new Error(`${v}は許容されたPositionではありません`)
  }
}

