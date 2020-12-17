/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
  // @ts-ignore this one doesn't appear in the TS definitions for some reason
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
