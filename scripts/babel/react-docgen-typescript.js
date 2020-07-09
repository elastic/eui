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

        // props that should be whitelisted even if its from an external module
        const whiteListedProps = ['children', 'className', 'aria-label'];

        // external modules whose props must be whitelisted
        const whiteListedParent = [
          'DragDropContextProps',
          'DraggableProps',
          'DroppableProps',
        ];

        let docgenResults = [];
        try {
          docgenResults = propsParser
            .withDefaultConfig({
              propFilter: (prop, component) =>
                filterProp(
                  prop,
                  component,
                  state,
                  whiteListedProps,
                  whiteListedParent,
                  componentExtends,
                  filename
                ),
              shouldExtractLiteralValuesFromEnum: true,
              shouldRemoveUndefinedFromOptional: true,
              savePropValueAsString: true,
            })
            .parseWithProgramProvider(filename, () => program);
          // eslint-disable-next-line no-empty
        } catch (e) {}

        if (state.get('childrenProp') && state.get('componentName')) {
          getChildrenTypeFromPropTypes(
            path,
            state.get('childrenProp'),
            state.get('componentName'),
            filename
          );
        }

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

/**
 * Filter props to remove props from node modules while keeping those whitelisted
 *
 * @param {*} prop
 * @param {*} state
 * @param {*} whiteListedProps
 * @param {*} whiteListedParent
 * @param {*} componentExtends
 */
function filterProp(
  prop,
  component,
  state,
  whiteListedProps,
  whiteListedParent,
  componentExtends
) {
  if (prop.name === 'children') {
    state.set('childrenProp', prop);
    state.set('componentName', component.name);
  }
  if (whiteListedProps.includes(prop.name)) {
    return true;
  }
  if (prop.parent) {
    //Check if props are extended from other node module
    if (whiteListedParent.includes(prop.parent.name)) return true;
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
}

/**
 * Parser takes type generated for children prop from FunctionComponent PropsWithChildren. Here ast is traversed
 * to find children prop from sourcefile and replace it in docgenInfo
 *
 * @param {*} path
 * @param {*} prop
 * @param {*} componentName
 */
function getChildrenTypeFromPropTypes(path, prop, componentName, filename) {
  if (filename.includes('highlight.tsx')) {
    path.traverse({
      VariableDeclarator: ({ node }) => {
        if (node.id && node.id.name === componentName) {
          if (
            node.id &&
            node.id.typeAnnotation &&
            node.id.typeAnnotation.typeAnnotation &&
            node.id.typeAnnotation.typeAnnotation.typeName &&
            node.id.typeAnnotation.typeAnnotation.typeName.name ===
              'FunctionComponent'
          ) {
            node.id.typeAnnotation.typeAnnotation.typeParameters.params.map(
              param => {
                getChildrenFromInterface(param.typeName.name, path, prop);
              }
            );
          }
        }
      },
    });
  }
}

function getChildrenFromInterface(interfaceName, path, prop) {
  path.traverse({
    TSInterfaceDeclaration: ({ node }) => {
      if (node.id.name === interfaceName) {
        const childrenTypeNode = node.body.body.filter(
          node => node.key && node.key.name === 'children'
        )[0];
        if (childrenTypeNode) {
          getTypeForNode(
            childrenTypeNode.typeAnnotation.typeAnnotation,
            !childrenTypeNode.optional,
            prop
          );
        }
      }
    },
    TSTypeAliasDeclaration: ({ node }) => {
      if (node.id.name === interfaceName) {
        node.typeAnnotation.types.map(type => {
          if (type.members) {
            const childrenTypeNode = node.typeAnnotation.types.members.filter(
              node => node.key.name === 'children'
            )[0];
            if (childrenTypeNode) {
              getTypeForNode(
                childrenTypeNode.typeAnnotation.typeAnnotation,
                !childrenTypeNode.optional,
                prop
              );
            }
          }
        });
      }
    },
  });
}

function getTypeForNode(node, optional, prop) {
  const type = getTypeFromTSTypes(node);
  prop.type.name = type;
  prop.required = optional;
}

function getTypeFromTSTypes(node) {
  switch (node.type) {
    case 'TSStringKeyword':
      return 'string';

    case 'TSNumberKeyword':
      return 'number';

    case 'TSBooleanKeyword':
      return 'boolean';

    case 'TSFunctionType':
      return '() => void';

    case 'TSUnionType':
      const types = node.types.map(node => getTypeFromTSTypes(node));
      return types.join(' | ');
  }
  return 'ReactNode';
}
