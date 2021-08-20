/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Plugin } from 'unified';
import { RemarkTokenizer } from '../../markdown_types';

export const SpacerParser: Plugin = function SpacerParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  const tokenizeSpacer: RemarkTokenizer = function tokenizeSpacer(
    eat,
    value,
    silent
  ) {
    if (value.startsWith('!{spacer') === false) return false;

    console.log('spacer', value, value.length, '!{spacer'.length);

    const nextChar = value[8];

    if (nextChar !== '{' && nextChar !== '}') return false; // this isn't actually a spacer

    if (silent) {
      return true;
    }

    // is there a configuration?
    const hasConfiguration = nextChar === '{';

    let match = '!{spacer';
    let configuration = {};

    if (hasConfiguration) {
      let configurationString = '';

      let openObjects = 0;

      for (let i = 8; i < value.length; i++) {
        const char = value[i];
        if (char === '{') {
          openObjects++;
          configurationString += char;
        } else if (char === '}') {
          openObjects--;
          if (openObjects === -1) {
            break;
          }
          configurationString += char;
        } else {
          configurationString += char;
        }
      }

      match += configurationString;
      try {
        configuration = JSON.parse(configurationString);
      } catch (e) {
        const now = eat.now();
        this.file.fail(`Unable to parse spacer JSON configuration: ${e}`, {
          line: now.line,
          column: now.column + 8,
        });
      }
    }

    match += '}';

    return eat(match)({
      type: 'spacerPlugin',
      ...configuration,
    });
  };

  tokenizers.spacer = tokenizeSpacer;
  methods.splice(methods.indexOf('text'), 0, 'spacer');
};
