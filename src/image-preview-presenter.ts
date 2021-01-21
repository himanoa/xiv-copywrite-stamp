import { Position } from './event'

export interface ImagePreviewPresenter {
  drawCopyright(position: Position, color: 'black' | 'white'): void
  clear(): void
}
