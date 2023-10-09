/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  charat,
  DECLARATION,
  hash,
  indexof,
  MOZ,
  replace,
  strlen,
  WEBKIT,
  type Element,
} from 'stylis';

// This is a heavily modified version of Emotion's default `prefixer` plugin
// (mostly removing unnecessary prefixes), which is in turn a modified version
// of stylis's default prefixer.
// @see https://github.com/emotion-js/emotion/blob/main/packages/cache/src/prefixer.js
/* eslint-disable prefer-template */

/**
 * This is a stylis plugin which handles auto-prefixing CSS output by Emotion.
 *
 * *Please note*: EUI/Elastic targets latest evergreen browsers for support only.
 * @see https://www.elastic.co/support/matrix#matrix_browsers
 */
export const euiStylisPrefixer = (element: Element) => {
  if (element.length > -1)
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length);
          break;
      }
};

const prefix = (value: Element['value'], length: Element['length']): string => {
  switch (hash(value, length)) {
    /**
     * `-webkit` prefixes
     */
    // user-select - https://caniuse.com/mdn-css_properties_user-select - needed by Safari
    case 4246:
    // text-decoration - https://caniuse.com/text-decoration - iOS Safari is the main one that needs this
    case 5572:
    // text-size-adjust - https://caniuse.com/text-size-adjust - iOS Safari
    case 2756:
    // box-decoration-break - https://caniuse.com/css-boxdecorationbreak - Chrome & Safari
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite - Chrome
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip
    case 4215:
    // print-color-adjust - https://caniuse.com/css-color-adjust - Chrome
    case 2282:
      return WEBKIT + value + value;

    /**
     * Intrinsic/extrinsic sizing value prefixes
     * `stretch` alternatives needed by Chrome & Firefox - https://caniuse.com/intrinsic-width
     */
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6)
        switch (charat(value, length + 1)) {
          // (f)ill-available
          case 102:
            if (~indexof(value, 'fill-available')) {
              return replace(
                value,
                /(.+:)(.+)-([^]+)/,
                '$1' +
                  WEBKIT +
                  '$2-$3' +
                  '$1' +
                  MOZ +
                  (charat(value, length + 3) === 108 ? '$3' : '$2-$3')
              );
            }
          // (s)tretch
          case 115:
            if (~indexof(value, 'stretch')) {
              return (
                prefix(replace(value, 'stretch', 'fill-available'), length) +
                value
              );
            }
        }
      break;
  }

  return value;
};
