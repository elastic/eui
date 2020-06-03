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

const _ = require('lodash');
const propsParser = require('react-docgen-typescript');

module.exports = function({ types: t }) {
  return {
    visitor: {
      Program: {
        exit(path, state) {
          injectReactDocInfo(path, state, this.file.code, t);
        },
      },
    },
  };
};

function injectReactDocInfo(path, state, code, t) {
  const { filename } = state.file.opts;

  if (filename.includes('index.ts')) return;

  const program = path.scope.getProgramParent().path;
  const whiteListedHtmlProps = ['className'];

  const componentExtends = [];
  let docgenResults = [];

  try {
    const data = propsParser.withCustomConfig('tsconfig.json', {
      propFilter: prop => {
        if (whiteListedHtmlProps.includes(prop.name)) {
          return true;
        }
        if (prop.parent) {
          if (
            prop.parent.name === 'DOMAttributes' &&
            !componentExtends.includes('DOMAttributes')
          ) {
            componentExtends.push('DOMAttributes');
          }
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    }).parse;
    docgenResults = data(filename);
  } catch (e) {
    console.log(e);
  }
  docgenResults.forEach(function(docgenResult) {
    const exportName = docgenResult.displayName;
    docgenResult.extends = componentExtends;
    const docNode = buildObjectExpression(docgenResult, t);
    const docgenInfo = t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.identifier(exportName),
          t.identifier('__docgenInfo')
        ),
        docNode
      )
    );
    program.pushContainer('body', docgenInfo);
  });
}

function buildObjectExpression(obj, t) {
  if (_.isPlainObject(obj)) {
    const children = [];
    for (const key in obj) {
      if (key === 'actualName') continue;
      if (!obj.hasOwnProperty(key) || _.isUndefined(obj[key])) continue;
      children.push(
        t.objectProperty(
          t.stringLiteral(key),
          buildObjectExpression(obj[key], t)
        )
      );
    }
    return t.objectExpression(children);
  } else if (_.isString(obj)) {
    return t.stringLiteral(obj);
  } else if (_.isBoolean(obj)) {
    return t.booleanLiteral(obj);
  } else if (_.isNumber(obj)) {
    return t.numericLiteral(obj);
  } else if (_.isArray(obj)) {
    const children = [];
    obj.forEach(function(val) {
      children.push(buildObjectExpression(val, t));
    });
    // eslint-disable-next-line new-cap
    return t.ArrayExpression(children);
  } else if (_.isNull(obj)) {
    return t.nullLiteral();
  }
}
