import { none, Option, some } from 'fp-ts/lib/Option';
import { BBox, BBoxCalculator } from './bbox_calculator';

export class CanvasTextBBoxCalculator implements BBoxCalculator {
  private attachedRoot: HTMLElement;
  private offscreenCanvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  // TODO specify styles for text
  // TODO specify how to hide the svg from the current dom view
  // like moving it a -9999999px
  constructor(rootElement?: HTMLElement) {
    this.offscreenCanvas = document.createElement('canvas');
    this.context = this.offscreenCanvas.getContext('2d');
    this.attachedRoot = rootElement || document.documentElement;
    this.attachedRoot.appendChild(this.offscreenCanvas);
  }
  public compute(text: string, fontSize = 16, fontFamily = 'Arial'): Option<BBox> {
    if (!this.context) {
      return none;
    }
    this.context.font = `${fontSize}px ${fontFamily}`;
    const measure = this.context.measureText(text);
    return some({
      width: measure.width,
      height: fontSize,
    });
  }
  public destroy(): void {
    this.attachedRoot.removeChild(this.offscreenCanvas);
  }
}
