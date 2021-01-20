export type Events = ChangeCopyrightPosition 

export type Position = "upper-left" | "upper-right" | "lower-left" | "lower-right"

export type ChangeCopyrightPosition = {
  eventType: "ChangeCopyrightPosition",
  position: Position 
}
