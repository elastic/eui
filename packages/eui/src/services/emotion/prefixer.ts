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
    /************************************************************
     * `-webkit` prefixes
     ************************************************************/

    /**
     * user-select
     * Safari needs the -webkit prefix as of August 2025
     * @see https://caniuse.com/mdn-css_properties_user-select
     */
    case 4246:

    /**
     * text-decoration
     * iOS Safari needs the -webkit prefix as of August 2025
     * @see https://caniuse.com/text-decoration
     */
    case 5572:

    /**
     * text-size-adjust
     * iOS Safari needs the -webkit prefix as of August 2025
     * @see https://caniuse.com/text-size-adjust
     */
    case 2756:

    /**
     * box-decoration-break
     * Safari needs the -webkit prefix as of August 2025
     * @see https://caniuse.com/css-boxdecorationbreak
     */
    case 3005:

    /**
     * mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite
     * @see https://caniuse.com/css-masks
     * TODO: Remove as this is natively supported since November 2023
     */
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:

    /**
     * print-color-adjust
     * Chromium-based browsers need the -webkit prefix as of August 2025
     * @see https://caniuse.com/css-color-adjust
     */
    case 2282:
      return WEBKIT + value + value;

    /**
     * background-clip
     * @see https://caniuse.com/background-clip-text
     * TODO: Remove as this is natively supported since November 2023
     */
    case 4215:
      if (~indexof(value, 'text')) {
        return WEBKIT + value + value;
      }

    /************************************************************
     * Intrinsic/extrinsic sizing value prefixes
     ************************************************************/

    /**
     * width
     * @see https://caniuse.com/intrinsic-width
     */
    case 8116:

    /**
     * height
     * @see https://caniuse.com/intrinsic-width
     */
    case 7059:

    /**
     * inline-size
     * @see https://caniuse.com/intrinsic-width
     */
    case 5753:

    /**
     * block-size
     * @see https://caniuse.com/intrinsic-width
     */
    case 5535:

    /**
     * min-width
     * @see https://caniuse.com/intrinsic-width
     */
    case 5445:

    /**
     * min-height
     * @see https://caniuse.com/intrinsic-width
     */
    case 5701:

    /**
     * min-inline-size
     * @see https://caniuse.com/intrinsic-width
     */
    case 4933:

    /**
     * min-block-size
     * @see https://caniuse.com/intrinsic-width
     */
    case 4677:

    /**
     * max-width
     * @see https://caniuse.com/intrinsic-width
     */
    case 5533:

    /**
     * max-height
     * @see https://caniuse.com/intrinsic-width
     */
    case 5789:

    /**
     * max-inline-size
     * @see https://caniuse.com/intrinsic-width
     */
    case 5021:

    /**
     * max-block-size
     * @see https://caniuse.com/intrinsic-width
     */
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6) {
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
      }
      break;
  }

  return value;
};
