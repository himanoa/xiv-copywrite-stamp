import { isPosition, Position } from "./text-property";

const events = ["ChangeCopyrightPosition"] as const;

export type Events = typeof events[number];

export const isEvents = (e: string): e is Events => {
  if (events.includes(e as any)) {
    return true;
  }
  return false;
};

export type ChangeCopyrightConfigPayload = {
  position: Position;
  fontSize: number;
};
export type ChangeCopyrightPositionListener = (
  c: ChangeCopyrightConfigPayload
) => void;

export const isChangeCopyrightConfig = (
  e: any
): e is ChangeCopyrightConfigPayload => {
  if (isPosition(e.position)) {
    return true;
  }
  return false;
};
