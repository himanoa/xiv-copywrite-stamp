import { Position } from './event'
import { ImagePreviewPresenter } from "./image-preview-presenter"
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
  constructor(
    private canvasElement: HTMLCanvasElement,
    private copyrightDom: HTMLSpanElement,
    private imageSrc: string
  ) {}

  public async drawCopyright(position: Position) {
    await this.clear();
    const textSize = {
      width: this.copyrightDom.offsetWidth,
      height: this.copyrightDom.offsetHeight 
    }
    const canvasSize = {
      width: this.canvasElement.width,
      height: this.canvasElement.height
    }
    const textParams = getDrawTextParameter(this.copyrightDom.innerText, position, textSize, canvasSize)
    this.canvasContext().strokeText(textParams.text, textParams.x, textParams.y)
  }

  public clear(): Promise<undefined> {
    const image = new Image();
    const promise = new Promise<undefined>((resolve) => {
      image.addEventListener('load', () => {
        this.canvasElement.width = image.width
        this.canvasElement.width = image.height
        this.canvasContext().drawImage(image, 0, 0)
        resolve(undefined)
      })
    })
    image.src = this.imageSrc;
    return promise
  }

  private canvasContext(): CanvasRenderingContext2D {
    const ctx = this.canvasElement.getContext('2d')
    if(!ctx) {
      throw new Error("CanvasContextの取得に失敗しました")
    }
    return ctx
  }
}
