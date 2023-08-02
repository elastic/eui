/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useMemo } from 'react';
import { EuiHighlight } from '../../highlight';
import { EuiComboBoxTruncation } from '../types';
import classNames from 'classnames';

interface TruncatedLabelProps {
  label: string;
  search: string;
  font: string;
  defaultComboboxWidth: number;
  strict: boolean | undefined;
  className: string | undefined;
  truncation: EuiComboBoxTruncation;
}

const separator = `…`;
const LABEL_VISIBLE_LENGTH = 8; // empirically found?
const COMBOBOX_PADDINGS = 40; // empirically found?

const createContext = () =>
  document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;

// extracted from getTextWidth for performance
let context: CanvasRenderingContext2D | null = null;

const getTextWidth = (text: string, font: string) => {
  if (context == null) {
    context = createContext();
  }
  const ctx = context;
  ctx.font = font;
  const metrics = ctx.measureText(text);
  return metrics.width;
};

const truncateLabel = (
  width: number,
  font: string,
  label: string,
  approximateLength: number,
  labelFn: (label: string, length: number) => string
) => {
  let output = labelFn(label, approximateLength);
  const initialApproximateLength = approximateLength;

  while (getTextWidth(output, font) > width) {
    approximateLength = approximateLength - 1;
    const newOutput = labelFn(label, approximateLength);
    if (newOutput === output) {
      break;
    }
    output = newOutput;
  }
  console.log({ label, output, initialApproximateLength, approximateLength });
  return output;
};

function getLabelFn(
  label: string,
  search: string,
  searchPosition: number,
  approximateLen: number
) {
  if (!search || searchPosition === -1) {
    return (text: string, length: number) =>
      `${text.substring(0, LABEL_VISIBLE_LENGTH)}${separator}${text.substring(
        text.length - (length - LABEL_VISIBLE_LENGTH)
      )}`;
  }
  if (searchPosition === 0) {
    // search phrase at the beginning
    return (text: string, length: number) =>
      `${text.substring(0, length)}${separator}`;
  }
  if (approximateLen > label.length - searchPosition) {
    // search phrase close to the end or at the end
    return (text: string, length: number) =>
      `${separator}${text.substring(text.length - length)}`;
  }
  // search phrase is in the middle
  return (text: string, length: number) =>
    `${separator}${text.substring(searchPosition, length)}${separator}`;
}

export const TruncatedLabel = function ({
  label,
  strict,
  className,
  search,
  font,
  defaultComboboxWidth,
  truncation,
}: TruncatedLabelProps) {
  const textWidth = useMemo(() => getTextWidth(label, font), [label, font]);
  const usableWidth = defaultComboboxWidth - COMBOBOX_PADDINGS;

  // Use CSS truncation when available
  if (textWidth < usableWidth || truncation === 'end') {
    return (
      <EuiHighlight
        search={search}
        strict={strict}
        className={classNames(className, 'euiComboBoxOption-truncationEnd')}
      >
        {label}
      </EuiHighlight>
    );
  }

  const searchPosition = label.indexOf(search);
  const approximateLen = Math.round((usableWidth * label.length) / textWidth);
  const labelFn = getLabelFn(label, search, searchPosition, approximateLen);

  const outputLabel = truncateLabel(
    usableWidth,
    font,
    label,
    approximateLen,
    labelFn
  );

  return (
    <EuiHighlight search={search} strict={strict} className={className}>
      {outputLabel}
    </EuiHighlight>
  );
};
