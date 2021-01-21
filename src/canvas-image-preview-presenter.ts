import { Position } from './event'
import { ImagePreviewPresenter, LoadResult } from "./image-preview-presenter"
import { getDrawTextParameter } from "./draw-text";

export function createCanvasImagePreviewPresenter(
  canvasElement: HTMLCanvasElement | null,
  copyrightDom: HTMLSpanElement | null,
  imageSrc: string
): CanvasImagePreviewPresenter  {
  if(canvasElement === null || copyrightDom === null) {
    throw new Error("CanvasImagePreviewPresenterの生成に失敗しました")
  }

  return new CanvasImagePreviewPresenter(canvasElement, copyrightDom, imageSrc)
}

class CanvasImagePreviewPresenter implements ImagePreviewPresenter {
  private context: CanvasRenderingContext2D | null = null

  constructor(
    private canvasElement: HTMLCanvasElement,
    private copyrightDom: HTMLSpanElement,
    private imageSrc: string
  ) {}

  public async drawCopyright(position: Position) {
    await this.load();
    const textSize = {
      width: this.copyrightDom.offsetWidth,
      height: this.copyrightDom.offsetHeight 
    }
    const canvasSize = {
      width: this.canvasElement.width,
      height: this.canvasElement.height
    }
    const textParams = getDrawTextParameter(this.copyrightDom.innerHTML, position, textSize, canvasSize)
    this.canvasContext().strokeText(textParams.text, textParams.x, textParams.y)
  }

  public load(): Promise<LoadResult> {
    const image = new Image();
    const promise = new Promise<LoadResult>((resolve) => {
      image.addEventListener('load', () => {
        resolve({size: {width: image.width, height: image.height}, image: image})
      })
    })

    promise.then(({image, size}) => {
      console.dir(image)
      this.canvasElement.width = size.width
      this.canvasElement.height = size.height
      this.canvasContext().drawImage(image, 0, 0)
    })
    image.src = this.imageSrc;

    return promise
  }

  private canvasContext(): CanvasRenderingContext2D {
    if(this.context) {
      return this.context
    }

    const ctx = this.canvasElement.getContext('2d')

    if(!ctx) {
      throw new Error("CanvasContextの取得に失敗しました")
    }

    return ctx
  }
}
