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
/* eslint-disable @typescript-eslint/no-var-requires */

const propsParser = require('react-docgen-typescript');
const template = require('@babel/template');
const ts = require('typescript');
const glob = require('glob');
const util = require('util');

const files = [
  ...glob.sync('src/**/*.{ts,tsx}', { absolute: true }),
  ...glob.sync('src-docs/**/*.{ts,tsx}', { absolute: true }),
];

const options = {
  jsx: ts.JsxEmit.React,
};

const program = ts.createProgram(files, options);

module.exports = function() {
  return {
    pre() {
      this.fileProcessed = false;
    },
    visitor: {
      Program(path, state) {
        const { filename } = state.file.opts;

        if (this.fileProcessed) return;

        this.fileProcessed = true;

        // find if components extends types from other modules
        const componentExtends = [];

        const whiteListedProps = ['children', 'className', 'aria-label'];

        let docgenResults = [];
        try {
          docgenResults = propsParser
            .withDefaultConfig({
              propFilter: prop => {
                if (whiteListedProps.includes(prop.name)) return true;
                if (prop.parent) {
                  if (
                    prop.parent.name === 'DOMAttributes' &&
                    !componentExtends.includes('DOMAttributes')
                  ) {
                    componentExtends.push('DOMAttributes');
                  }
                  if (prop.name.includes(whiteListedProps)) {
                    return true;
                  }
                  return !prop.parent.fileName.includes('node_modules');
                }
                return true;
              },
              shouldExtractLiteralValuesFromEnum: true,
              shouldRemoveUndefinedFromOptional: true,
              savePropValueAsString: true,
            })
            .parseWithProgramProvider(filename, () => program);
          // eslint-disable-next-line no-empty
        } catch (e) {}

        if (docgenResults.length === 0) return;
        docgenResults.forEach(function(docgenResult) {
          const exportName = docgenResult.displayName;

          if (!exportName) return;
          docgenResult.extends = componentExtends;
          path.node.body.push(
            template.default.ast(`          
            try{  
            ${exportName}.__docgenInfo = ${util.inspect(docgenResult, {
              showHidden: false,
              depth: null,
              maxArrayLength: null,
            })}
          } catch(e) {}
          `)
          );
        });
      },
    },
  };
};
