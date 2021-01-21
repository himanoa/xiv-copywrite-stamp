import { TextProperty } from './text-property'
import { Size } from "./draw-text";

export type LoadResult =  {
  size: Size,
  image: HTMLImageElement
}

export interface ImagePreviewPresenter {
  drawCopyright(overwriteTextProperty?: TextProperty): void
  load(): Promise<LoadResult>
}
