function createHiddenTextElement(text: string): HTMLSpanElement {
  const textElement = document.createElement('span');
  textElement.textContent = text;
  // @ts-ignore .all is a real property - https://drafts.csswg.org/css-cascade/#all-shorthand
  textElement.style.all = 'unset';
  // prevents scrolling to the end of the page
  textElement.style.position = 'fixed';
  textElement.style.top = '0';
  textElement.style.clip = 'rect(0, 0, 0, 0)';
  // used to preserve spaces and line breaks
  textElement.style.whiteSpace = 'pre';
  // do not inherit user-select (it may be `none`)
  textElement.style.webkitUserSelect = 'text';
  // @ts-ignore this one doesn't appear in the TS definitions for some reason
  textElement.style.MozUserSelect = 'text';
  textElement.style.msUserSelect = 'text';
  textElement.style.userSelect = 'text';
  return textElement;
}

export function copyToClipboard(text: string): boolean {
  let isCopied = true;
  const range = document.createRange();
  const selection = window.getSelection();
  const elementToBeCopied = createHiddenTextElement(text);

  document.body.appendChild(elementToBeCopied);
  range.selectNode(elementToBeCopied);
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }

  if (!document.execCommand('copy')) {
    isCopied = false;
    // tslint:disable-next-line:no-console
    console.warn('Unable to copy to clipboard.');
  }

  if (selection) {
    if (typeof selection.removeRange === 'function') {
      selection.removeRange(range);
    } else {
      selection.removeAllRanges();
    }
  }

  document.body.removeChild(elementToBeCopied);

  return isCopied;
}
