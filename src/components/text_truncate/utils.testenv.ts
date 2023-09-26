/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TruncationUtils as _TruncationUtils } from './utils';

export class CanvasTextUtils {
  constructor(_: any) {}

  computeFontFromElement = (_: HTMLElement) => '';

  textWidth = 0;

  currentText = '';
  setTextToCheck = (text: string) => {
    this.currentText = text;
  };
}

export class TruncationUtils extends _TruncationUtils {
  constructor(props: ConstructorParameters<typeof _TruncationUtils>[0]) {
    super(props);
  }

  // Jest perf optimization - since there's no meaningful truncation we can make
  // without meaningful width calculations, just return the full untruncated text
  truncateStart = (_?: number) => this.fullText;
  truncateEnd = (_?: number) => this.fullText;
  truncateStartEndAtPosition = (_?: number) => this.fullText;
  truncateStartEndAtMiddle = () => this.fullText;
  truncateMiddle = () => this.fullText;
}
