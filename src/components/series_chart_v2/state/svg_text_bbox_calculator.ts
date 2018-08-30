// not sure where to specify this, required for tests
declare global {
  interface SVGElement {
    getBBox(): SVGRect;
  }
}

export class SvgTextBBoxCalculator {
  public svgElem: SVGSVGElement;
  public textElem: SVGTextElement;
  public attachedRoot: HTMLElement;
  public textNode: Text;
  // TODO specify styles for text
  // TODO specify how to hide the svg from the current dom view
  // like moving it a -9999999px
  constructor(rootElement?: HTMLElement) {
    const xmlns = 'http://www.w3.org/2000/svg';
    this.svgElem = document.createElementNS(xmlns, 'svg');
    this.textElem = document.createElementNS(xmlns, 'text');
    this.textElem.setAttribute('class', 'euiSeriesChartAxis_tickLabel');

    this.svgElem.appendChild(this.textElem);
    this.textNode = document.createTextNode('');
    this.textElem.appendChild(this.textNode);
    this.attachedRoot = rootElement || document.documentElement;
    this.attachedRoot.appendChild(this.svgElem);
  }
  public compute(text: string): SVGRect {
    this.textNode.textContent = text;
    // this.textElem.setAttribute('transform', 'rotate(-90)');
    // TODO possible transformation
    return this.textElem.getBoundingClientRect() as SVGRect;
  }
  public destroy(): void {
    this.attachedRoot.removeChild(this.svgElem);
  }
}
