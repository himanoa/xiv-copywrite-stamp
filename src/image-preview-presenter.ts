import { Position } from './text-property'
import { Size } from "./draw-text";

export type LoadResult =  {
  size: Size,
  image: HTMLImageElement
}

export interface ImagePreviewPresenter {
  drawCopyright(position: Position, color: 'black' | 'white'): void
  load(): Promise<LoadResult>
}
