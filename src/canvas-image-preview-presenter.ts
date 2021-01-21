import { ImagePreviewPresenter, LoadResult } from "./image-preview-presenter"
import { getDrawTextParameter, Size } from "./draw-text";
import { defaultProperty, TextProperty } from './text-property'

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
  private canvasElement: HTMLCanvasElement
  private copyrightDom: HTMLSpanElement
  private imageSrc: string
  private textProperty: TextProperty

  constructor(
    canvasElement: HTMLCanvasElement,
    copyrightDom: HTMLSpanElement,
    imageSrc: string
  ) {
    this.canvasElement = canvasElement
    this.copyrightDom = copyrightDom
    this.imageSrc = imageSrc
    this.textProperty = defaultProperty()
  }

  public async drawCopyright(overwriteTextProperty?: TextProperty) {
    this.textProperty = {...this.textProperty, ...overwriteTextProperty}
    await this.load();
    const textSize = this.computeTextSize(this.textProperty.fontSize) 
    const canvasSize = {
      width: this.canvasElement.width,
      height: this.canvasElement.height
    }
    const textParams = getDrawTextParameter(this.copyrightDom.innerHTML, this.textProperty.position, textSize, canvasSize)
    const ctx = this.canvasContext()
    ctx.font = `${this.textProperty.fontSize}px sans-serif`
    ctx.fillText(textParams.text, textParams.x, textParams.y)
  }

  public load(): Promise<LoadResult> {
    const image = new Image();
    const promise = new Promise<LoadResult>((resolve) => {
      image.addEventListener('load', () => {
        resolve({size: {width: image.width, height: image.height}, image: image})
      })
    })

    promise.then(({image, size}) => {
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

  private computeTextSize(fontSize: number): Size {
    this.copyrightDom.style["fontFamily"] = "sans-serif" 
    this.copyrightDom.style["fontSize"] = `${fontSize}px`
    return {
      width: this.copyrightDom.offsetWidth,
      height: this.copyrightDom.offsetHeight 
    }
  }
}
