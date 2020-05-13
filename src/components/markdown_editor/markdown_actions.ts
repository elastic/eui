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

import {
  EuiMarkdownEditorUiPlugin,
  EuiMarkdownFormatting,
} from './markdown_types';

/**
 * Class for applying styles to a text editor. Accepts the HTML ID for the textarea
 * desired, and exposes the `.do(ACTION)` method for manipulating the text.
 *
 * @class MarkdownActions
 * @param {string} editorID
 */
class MarkdownActions {
  styles: Record<string, EuiMarkdownFormatting>;

  constructor(public editorID: string, uiPlugins: EuiMarkdownEditorUiPlugin[]) {
    /**
     * This object is in the format:
     * [nameOfAction]: {[styles to apply]}
     */
    this.styles = {
      ...uiPlugins.reduce<MarkdownActions['styles']>(
        (mappedPlugins, { name, formatting }) => {
          mappedPlugins[name] = formatting;
          return mappedPlugins;
        },
        {}
      ),
      mdBold: {
        prefix: '**',
        suffix: '**',
        trimFirst: true,
      },
      mdItalic: {
        prefix: '_',
        suffix: '_',
        trimFirst: true,
      },
      mdQuote: {
        prefix: '> ',
        multiline: true,
        surroundWithNewlines: true,
      },
      mdCode: {
        prefix: '`',
        suffix: '`',
        blockPrefix: '```',
        blockSuffix: '```',
      },
      mdLink: {
        prefix: '[',
        suffix: '](url)',
        replaceNext: 'url',
        scanFor: 'https?://',
      },
      mdUl: {
        prefix: '- ',
        multiline: true,
        surroundWithNewlines: true,
      },
      mdOl: {
        prefix: '1. ',
        multiline: true,
        orderedList: true,
      },
    };
  }

  /**
   * .do() accepts a string and retrieves the correlating style object (defined in the
   * constructor). It passes this to applyStyle() that does the text manipulation.
   *
   * @param {string} action
   * @memberof MarkdownActions
   */
  do(action: string) {
    this.applyStyle(this.styles[action]);
  }

  /**
   * Sets the default styling object and then superimposes the changes to make on top of
   * it. Calls the `styleSelectedText` helper function that does the heavy lifting.
   *
   * @param {object} incomingStyle
   * @memberof MarkdownActions
   */
  applyStyle(incomingStyle: object) {
    const defaults = {
      prefix: '',
      suffix: '',
      blockPrefix: '',
      blockSuffix: '',
      multiline: false,
      replaceNext: '',
      prefixSpace: false,
      scanFor: '',
      surroundWithNewlines: false,
      orderedList: false,
      trimFirst: false,
    };

    const outgoingStyle = {
      ...defaults,
      ...incomingStyle,
    };
    const editor = document.getElementById(this.editorID);

    if (editor) {
      editor.focus();
      // @ts-ignore
      styleSelectedText(editor, outgoingStyle);
    }
  }
}

/**
 * The following helper functions and types were copied from the GitHub Markdown Toolbar
 * Element project. The project is MIT-licensed. See it here:
 * https://github.com/github/markdown-toolbar-element
 */

interface Newlines {
  newlinesToAppend: string;
  newlinesToPrepend: string;
}

interface SelectionRange {
  text: string;
  selectionStart?: number;
  selectionEnd?: number;
}

interface StyleArgs {
  prefix: string;
  suffix: string;
  blockPrefix: string;
  blockSuffix: string;
  multiline: boolean;
  replaceNext: string;
  prefixSpace: boolean;
  scanFor: string;
  surroundWithNewlines: boolean;
  orderedList: boolean;
  trimFirst: boolean;
}

function isMultipleLines(string: string): boolean {
  return string.trim().split('\n').length > 1;
}

function repeat(string: string, n: number): string {
  return Array(n + 1).join(string);
}

function wordSelectionStart(text: string, i: number): number {
  let index = i;
  while (
    text[index] &&
    text[index - 1] != null &&
    !text[index - 1].match(/\s/)
  ) {
    index--;
  }
  return index;
}

function wordSelectionEnd(text: string, i: number, multiline: boolean): number {
  let index = i;
  const breakpoint = multiline ? /\n/ : /\s/;
  while (text[index] && !text[index].match(breakpoint)) {
    index++;
  }
  return index;
}

let canInsertText: boolean | null = null;

/**
 * Note that we're using the native HTMLTextAreaElement.set() method to play nicely with
 * React's synthetic event system. We fallback to a brute force way of doing it if the
 * above doesn't work. Although all modern browsers, including IE, seem to be fine:
 * https://hustle.bizongo.in/simulate-react-on-change-on-controlled-components-baa336920e04
 */
function insertText(
  textarea: HTMLTextAreaElement,
  { text, selectionStart, selectionEnd }: SelectionRange
) {
  const originalSelectionStart = textarea.selectionStart;
  const before = textarea.value.slice(0, originalSelectionStart);
  const after = textarea.value.slice(textarea.selectionEnd);
  const inputEvent = new Event('input', { bubbles: true });

  if (canInsertText === null || canInsertText === true) {
    canInsertText = true;

    const nativeInputValueSetter =
      // @ts-ignore
      Object.getOwnPropertyDescriptor(
        // @ts-ignore
        window.HTMLTextAreaElement.prototype,
        'value'
      ).set;
    try {
      // @ts-ignore
      nativeInputValueSetter.call(textarea, before + text + after);

      textarea.dispatchEvent(inputEvent);
    } catch (error) {
      canInsertText = false;
    }
  }

  if (!canInsertText) {
    // If calling [HTMLTextAreaElement.set()] fails, just brute-force it
    textarea.value = before + text + after;
    textarea.dispatchEvent(inputEvent);
  }

  if (selectionStart != null && selectionEnd != null) {
    textarea.setSelectionRange(selectionStart, selectionEnd);
  } else {
    textarea.setSelectionRange(originalSelectionStart, textarea.selectionEnd);
  }
}

function styleSelectedText(
  textarea: HTMLTextAreaElement,
  styleArgs: StyleArgs
) {
  const text = textarea.value.slice(
    textarea.selectionStart,
    textarea.selectionEnd
  );

  let result;
  if (styleArgs.orderedList) {
    result = orderedList(textarea);
  } else if (styleArgs.multiline && isMultipleLines(text)) {
    result = multilineStyle(textarea, styleArgs);
  } else {
    result = blockStyle(textarea, styleArgs);
  }

  insertText(textarea, result);
}

function expandSelectedText(
  textarea: HTMLTextAreaElement,
  prefixToUse: string,
  suffixToUse: string,
  multiline: boolean = false
): string {
  if (textarea.selectionStart === textarea.selectionEnd) {
    textarea.selectionStart = wordSelectionStart(
      textarea.value,
      textarea.selectionStart
    );
    textarea.selectionEnd = wordSelectionEnd(
      textarea.value,
      textarea.selectionEnd,
      multiline
    );
  } else {
    const expandedSelectionStart = textarea.selectionStart - prefixToUse.length;
    const expandedSelectionEnd = textarea.selectionEnd + suffixToUse.length;
    const beginsWithPrefix =
      textarea.value.slice(expandedSelectionStart, textarea.selectionStart) ===
      prefixToUse;
    const endsWithSuffix =
      textarea.value.slice(textarea.selectionEnd, expandedSelectionEnd) ===
      suffixToUse;
    if (beginsWithPrefix && endsWithSuffix) {
      textarea.selectionStart = expandedSelectionStart;
      textarea.selectionEnd = expandedSelectionEnd;
    }
  }
  return textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
}

function newlinesToSurroundSelectedText(
  textarea: HTMLTextAreaElement
): Newlines {
  const beforeSelection = textarea.value.slice(0, textarea.selectionStart);
  const afterSelection = textarea.value.slice(textarea.selectionEnd);

  const breaksBefore = beforeSelection.match(/\n*$/);
  const breaksAfter = afterSelection.match(/^\n*/);
  const newlinesBeforeSelection = breaksBefore ? breaksBefore[0].length : 0;
  const newlinesAfterSelection = breaksAfter ? breaksAfter[0].length : 0;

  let newlinesToAppend;
  let newlinesToPrepend;

  if (beforeSelection.match(/\S/) && newlinesBeforeSelection < 2) {
    newlinesToAppend = repeat('\n', 2 - newlinesBeforeSelection);
  }

  if (afterSelection.match(/\S/) && newlinesAfterSelection < 2) {
    newlinesToPrepend = repeat('\n', 2 - newlinesAfterSelection);
  }

  if (newlinesToAppend == null) {
    newlinesToAppend = '';
  }

  if (newlinesToPrepend == null) {
    newlinesToPrepend = '';
  }

  return { newlinesToAppend, newlinesToPrepend };
}

function blockStyle(
  textarea: HTMLTextAreaElement,
  arg: StyleArgs
): SelectionRange {
  let newlinesToAppend;
  let newlinesToPrepend;

  const {
    prefix,
    suffix,
    blockPrefix,
    blockSuffix,
    replaceNext,
    prefixSpace,
    scanFor,
    surroundWithNewlines,
  } = arg;
  const originalSelectionStart = textarea.selectionStart;
  const originalSelectionEnd = textarea.selectionEnd;

  let selectedText = textarea.value.slice(
    textarea.selectionStart,
    textarea.selectionEnd
  );
  let prefixToUse =
    isMultipleLines(selectedText) && blockPrefix.length > 0
      ? `${blockPrefix}\n`
      : prefix;
  let suffixToUse =
    isMultipleLines(selectedText) && blockSuffix.length > 0
      ? `\n${blockSuffix}`
      : suffix;

  if (prefixSpace) {
    const beforeSelection = textarea.value[textarea.selectionStart - 1];
    if (
      textarea.selectionStart !== 0 &&
      beforeSelection != null &&
      !beforeSelection.match(/\s/)
    ) {
      prefixToUse = ` ${prefixToUse}`;
    }
  }
  selectedText = expandSelectedText(
    textarea,
    prefixToUse,
    suffixToUse,
    arg.multiline
  );
  let selectionStart = textarea.selectionStart;
  let selectionEnd = textarea.selectionEnd;
  const hasReplaceNext =
    replaceNext.length > 0 &&
    suffixToUse.indexOf(replaceNext) > -1 &&
    selectedText.length > 0;
  if (surroundWithNewlines) {
    const ref = newlinesToSurroundSelectedText(textarea);
    newlinesToAppend = ref.newlinesToAppend;
    newlinesToPrepend = ref.newlinesToPrepend;
    prefixToUse = newlinesToAppend + prefix;
    suffixToUse += newlinesToPrepend;
  }

  if (
    selectedText.startsWith(prefixToUse) &&
    selectedText.endsWith(suffixToUse)
  ) {
    const replacementText = selectedText.slice(
      prefixToUse.length,
      selectedText.length - suffixToUse.length
    );
    if (originalSelectionStart === originalSelectionEnd) {
      let position = originalSelectionStart - prefixToUse.length;
      position = Math.max(position, selectionStart);
      position = Math.min(position, selectionStart + replacementText.length);
      selectionStart = selectionEnd = position;
    } else {
      selectionEnd = selectionStart + replacementText.length;
    }
    return { text: replacementText, selectionStart, selectionEnd };
  } else if (!hasReplaceNext) {
    let replacementText = prefixToUse + selectedText + suffixToUse;
    selectionStart = originalSelectionStart + prefixToUse.length;
    selectionEnd = originalSelectionEnd + prefixToUse.length;
    const whitespaceEdges = selectedText.match(/^\s*|\s*$/g);
    if (arg.trimFirst && whitespaceEdges) {
      const leadingWhitespace = whitespaceEdges[0] || '';
      const trailingWhitespace = whitespaceEdges[1] || '';
      replacementText =
        leadingWhitespace +
        prefixToUse +
        selectedText.trim() +
        suffixToUse +
        trailingWhitespace;
      selectionStart += leadingWhitespace.length;
      selectionEnd -= trailingWhitespace.length;
    }
    return { text: replacementText, selectionStart, selectionEnd };
  } else if (scanFor.length > 0 && selectedText.match(scanFor)) {
    suffixToUse = suffixToUse.replace(replaceNext, selectedText);
    const replacementText = prefixToUse + suffixToUse;
    selectionStart = selectionEnd = selectionStart + prefixToUse.length;
    return { text: replacementText, selectionStart, selectionEnd };
  } else {
    const replacementText = prefixToUse + selectedText + suffixToUse;
    selectionStart =
      selectionStart +
      prefixToUse.length +
      selectedText.length +
      suffixToUse.indexOf(replaceNext);
    selectionEnd = selectionStart + replaceNext.length;
    return { text: replacementText, selectionStart, selectionEnd };
  }
}

function multilineStyle(textarea: HTMLTextAreaElement, arg: StyleArgs) {
  const { prefix, suffix, surroundWithNewlines } = arg;
  let text = textarea.value.slice(
    textarea.selectionStart,
    textarea.selectionEnd
  );
  let selectionStart = textarea.selectionStart;
  let selectionEnd = textarea.selectionEnd;
  const lines = text.split('\n');
  const undoStyle = lines.every(
    line => line.startsWith(prefix) && line.endsWith(suffix)
  );

  if (undoStyle) {
    text = lines
      .map(line => line.slice(prefix.length, line.length - suffix.length))
      .join('\n');
    selectionEnd = selectionStart + text.length;
  } else {
    text = lines.map(line => prefix + line + suffix).join('\n');
    if (surroundWithNewlines) {
      const {
        newlinesToAppend,
        newlinesToPrepend,
      } = newlinesToSurroundSelectedText(textarea);
      selectionStart += newlinesToAppend.length;
      selectionEnd = selectionStart + text.length;
      text = newlinesToAppend + text + newlinesToPrepend;
    }
  }

  return { text, selectionStart, selectionEnd };
}

function orderedList(textarea: HTMLTextAreaElement): SelectionRange {
  const orderedListRegex = /^\d+\.\s+/;
  const noInitialSelection = textarea.selectionStart === textarea.selectionEnd;
  let selectionEnd;
  let selectionStart;
  let text = textarea.value.slice(
    textarea.selectionStart,
    textarea.selectionEnd
  );
  let textToUnstyle = text;
  let lines = text.split('\n');
  let startOfLine;
  let endOfLine;
  if (noInitialSelection) {
    const linesBefore = textarea.value
      .slice(0, textarea.selectionStart)
      .split(/\n/);
    startOfLine =
      textarea.selectionStart - linesBefore[linesBefore.length - 1].length;
    endOfLine = wordSelectionEnd(textarea.value, textarea.selectionStart, true);
    textToUnstyle = textarea.value.slice(startOfLine, endOfLine);
  }
  const linesToUnstyle = textToUnstyle.split('\n');
  const undoStyling = linesToUnstyle.every(line => orderedListRegex.test(line));

  if (undoStyling) {
    lines = linesToUnstyle.map(line => line.replace(orderedListRegex, ''));
    text = lines.join('\n');
    if (noInitialSelection && startOfLine && endOfLine) {
      const lengthDiff = linesToUnstyle[0].length - lines[0].length;
      selectionStart = selectionEnd = textarea.selectionStart - lengthDiff;
      textarea.selectionStart = startOfLine;
      textarea.selectionEnd = endOfLine;
    }
  } else {
    lines = (function() {
      let i;
      let len;
      let index;
      const results = [];
      for (index = i = 0, len = lines.length; i < len; index = ++i) {
        const line = lines[index];
        results.push(`${index + 1}. ${line}`);
      }
      return results;
    })();
    text = lines.join('\n');
    const {
      newlinesToAppend,
      newlinesToPrepend,
    } = newlinesToSurroundSelectedText(textarea);
    selectionStart = textarea.selectionStart + newlinesToAppend.length;
    selectionEnd = selectionStart + text.length;
    if (noInitialSelection) selectionStart = selectionEnd;
    text = newlinesToAppend + text + newlinesToPrepend;
  }

  return { text, selectionStart, selectionEnd };
}

export default MarkdownActions;
