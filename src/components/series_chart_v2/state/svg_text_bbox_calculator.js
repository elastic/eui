export class SvgTextBBoxCalculator {
  // TODO specify styles for text
  // TODO specify how to hide the svg from the current dom view
  // like moving it a -9999999px
  constructor(rootElement) {
    const xmlns = 'http://www.w3.org/2000/svg';
    this.svgElem = document.createElementNS(xmlns, 'svg');
    this.textElem = document.createElementNS(xmlns, 'text');
    this.textElem.setAttribute('class', 'euiSeriesChartAxis_tickLabel');
    this.svgElem.appendChild(this.textElem);

    this.attachedRoot = rootElement || document.documentElement;
    this.attachedRoot.appendChild(this.svgElem);
  }
  compute(text) {
    this.initTextNode();
    this.textNode.textContent = text;
    return this.textElem.getBBox();
  }
  initTextNode(text) {
    if (!this.textNode) {
      this.textNode = document.createTextNode(text);
      this.textElem.appendChild(this.textNode);
    }
  }
  destroy() {
    this.attachedRoot.removeChild(this.svgElem);
  }
}
