/* eslint-disable @typescript-eslint/no-var-requires */

const gc = require('expose-gc/function');
const propsParser = require('react-docgen-typescript');
const template = require('@babel/template');
const ts = require('typescript');
const glob = require('glob');
const util = require('util');
const { SyntaxKind } = require('typescript');
const chokidar = require('chokidar');

const { NODE_ENV, CI, WEBPACK_DEV_SERVER } = process.env;
const isDevelopment = WEBPACK_DEV_SERVER === 'true' && CI == null;
const bypassWatch = NODE_ENV === 'puppeteer' || NODE_ENV === 'production';

/**
 * To support extended props from tsx files.
 */
const programOptions = {
  jsx: ts.JsxEmit.React,
};
let program;
function buildProgram() {
  const files = [
    ...glob.sync('src/**/!(*.test).{ts,tsx}', { absolute: true }),
    ...glob.sync('src-docs/**/!(*.test).{ts,tsx}', { absolute: true }),
  ];
  program = null;
  gc();
  program = ts.createProgram(files, programOptions);
}
buildProgram();

if (isDevelopment && !bypassWatch) {
  chokidar
    .watch(['./src/**/*.(ts|tsx)', './src-docs/**/*.(ts|tsx)'], {
      ignoreInitial: true, // don't emit `add` event during file discovery
      ignored: ['__snapshots__', /\.test\./],
    })
    .on('add', buildProgram)
    .on('change', buildProgram);
}

module.exports = function ({ types }) {
  return {
    pre() {
      this.fileProcessed = false;
    },
    visitor: {
      Program: {
        enter: function visitNode(path, state) {
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
            'RefAttributes',
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
                    componentExtends
                  ),
                shouldExtractLiteralValuesFromEnum: true,
                shouldRemoveUndefinedFromOptional: true,
                savePropValueAsString: true,
              })
              .parseWithProgramProvider(filename, () => program);
            // eslint-disable-next-line no-empty
          } catch (e) {}

          /**
           * react-docgen-typescript takes type of children from PropsWithChildren of FunctionComponent,
           * For our case we need our custom types to replace them.
           */
          if (state.get('childrenProp') && state.get('componentName')) {
            getChildrenTypeFromPropTypes(
              state.get('childrenProp'),
              state.get('componentName'),
              program,
              filename
            );
          }

          if (docgenResults.length !== 0) {
            docgenResults.forEach(function (docgenResult) {
              const exportName = docgenResult.displayName;
              docgenResult.extendedInterfaces = componentExtends;
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
          }

          // get all the exported types and interfaces of all the files to the state remove their exported
          // declarations in the exit stage
          if (!state.get('exportedTypes')) {
            let allExportedTypes = [];
            program.getSourceFiles().forEach((source) => {
              const exportedTypes = source
                .getChildAt(0)
                .getChildren()
                .filter((child) => {
                  if (
                    child.kind !== SyntaxKind.InterfaceDeclaration &&
                    child.kind !== SyntaxKind.TypeAliasDeclaration
                  )
                    return false;
                  // verify this interface is exported
                  const isExported =
                    child.modifiers &&
                    child.modifiers.reduce((isExported, modifier) => {
                      if (isExported) return isExported;
                      if (modifier.kind === SyntaxKind.ExportKeyword)
                        return true;
                      return false;
                    }, false);
                  return isExported;
                })
                .map((type) => type.name.escapedText);
              allExportedTypes = [...allExportedTypes, ...exportedTypes];
            });
            state.set('exportedTypes', allExportedTypes);
          }
        },
        exit: function exitProgram(path, state) {
          // remove any exported identifiers that are TS types or interfaces
          // this prevents TS-only identifiers from leaking into ES code
          path.traverse({
            ExportNamedDeclaration: (nodePath) => {
              const specifiers = nodePath.get('specifiers');
              const typeDefinitions = state.get('exportedTypes');
              const source = nodePath.get('source');
              specifiers.forEach((specifierPath) => {
                if (types.isExportSpecifier(specifierPath)) {
                  const {
                    node: { local },
                  } = specifierPath;
                  if (types.isIdentifier(local)) {
                    const { name } = local;
                    if (typeDefinitions.includes(name)) {
                      // this is a locally-known value
                      specifierPath.remove();
                    } else if (types.isStringLiteral(source)) {
                      const libraryName = source.get('value').node;
                      const isRelativeSource = libraryName.startsWith('.');
                      if (isRelativeSource === false) {
                        // comes from a 3rd-party library
                        // best way to reliably check if this is
                        // a type or value is to require the
                        // library and check its exports
                        const library = require(libraryName);
                        if (library.hasOwnProperty(name) === false) {
                          specifierPath.remove();
                        }
                      }
                    }
                  }
                }
              });
            },
          });
        },
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

  if (prop.type.name === 'ReactText') {
    // if prop type is string | number typescript takes it as ReactText if HTMLAttributes are extended
    // in the interface in that case replace it with "string | number"
    prop.type.name = 'string | number';
  } else if (prop.type.name === 'Primitive') {
    // "Primitive" comes from src/services/sort/comparators.ts
    // TypeScript sees its overlap with `boolean | number | string` and decides to name the type union
    prop.type.name = 'boolean | number | string';
  }

  // if prop.type is ReactElement it will be expanded to show all the  supported
  // react element types that makes the list too long in this case we could show
  // it as ReactElement
  prop.type.name = prop.type.name.replace(
    reactElementTypeExpanded,
    'ReactElement'
  );
  prop.type.name = prop.type.name.replace(reactNodeTypeExpanded, 'ReactNode');

  // prop.type is key of HTMLElement then all the html attributes will be shown
  // in that case we could only show it as any HTML Elements
  if (prop.type.name === 'enum') {
    const propValueArray = prop.type.value.map((type) => type.value);
    const found = intrinsicValuesRaw.every(
      (value) => propValueArray.indexOf(value) >= 0
    );
    if (found) {
      prop.type.name = 'any HTML Element';
    }
  }

  if (prop.parent) {
    //Check if props are extended from other node module
    if (whiteListedParent.includes(prop.parent.name)) return true;
    if (!componentExtends.includes(prop.parent.name)) {
      componentExtends.push(prop.parent.name);
    }
    if (prop.name.includes(whiteListedProps)) {
      return true;
    }
    if (prop.parent.fileName.includes('@elastic/charts')) return true;
    return !prop.parent.fileName.includes('node_modules');
  }
  return true;
}

/**
 * Parser takes type generated for children prop from PropsWithChildren. Here
 * children prop is parsed from the interface used the component by reusing
 * typescript program.
 *
 * @param {*} initialProp
 * @param {*} componentName
 * @param {*} program
 * @param {*} filename
 */

function getChildrenTypeFromPropTypes(
  initialProp,
  componentName,
  program,
  filename
) {
  const source = program.getSourceFile(filename);
  const checker = program.getTypeChecker();

  // Get the symbol property of the source file
  const moduleSymbol = checker.getSymbolAtLocation(source);

  // Components must be mostly exported.
  const components = checker.getExportsOfModule(moduleSymbol);

  /**
   * A single file may contain many components. Filter the component whose children prop
   * has to be updated
   */
  const componentToParse = components.filter(
    (component) => component.escapedName === componentName
  )[0];

  /**
   * If there are no declarations, then there will be no interfaces.
   */
  if (
    !!componentToParse.declarations &&
    componentToParse.declarations.length === 0
  ) {
    return null;
  }

  const declaration =
    componentToParse.valueDeclaration ||
    (componentToParse.declarations && componentToParse.declarations[0]);

  // get Type of the component symbol
  const type = checker.getTypeOfSymbolAtLocation(componentToParse, declaration);

  // For stateless components there will be callSignatures.
  const callSignatures = type.getCallSignatures();
  if (callSignatures && callSignatures.length) {
    for (const sig of callSignatures) {
      const params = sig.getParameters();
      // if there are no parameters then there will be no props
      if (params.length === 0) {
        continue;
      }
      const propsParam = params[0];
      if (propsParam.name === 'props') {
        replaceProp(propsParam, checker, initialProp);
      }
    }
  } else {
    // For for statefull components there will be constructSignatures.
    const constructSignatures = type.getConstructSignatures();
    if (constructSignatures && constructSignatures.length) {
      for (const sig of constructSignatures) {
        const instanceType = sig.getReturnType();
        const props = instanceType.getProperty('props');
        if (props.valueDeclaration) {
          replaceProp(props, checker, initialProp);
        }
      }
    }
  }
}

/**
 * Replace children prop type and required from information from interface
 *
 * @param {*} props
 * @param {*} checker
 * @param {*} initialProp
 */
function replaceProp(props, checker, initialProp) {
  const propsType = checker.getTypeOfSymbolAtLocation(
    props,
    props.valueDeclaration
  );
  // get all the props of the interface
  const propTypes = propsType.getProperties();
  // filter to get the children prop
  const childrenProp = propTypes.filter(
    (prop) => prop.getName() === 'children'
  )[0];
  /**
   * get the first declaration of the props, skip if children prop is from DOMAttributes,
   * propsWithChildren declaration only occurs last
   */
  const prop = childrenProp.declarations.filter(
    (declarations) => declarations.parent.symbol.name !== 'DOMAttributes'
  )[0];
  if (prop) {
    prop.symbol.parent.members.forEach((value, key) => {
      if (key === 'children') {
        const propType = checker.getTypeOfSymbolAtLocation(
          value,
          value.valueDeclaration
        );
        const type = checker.typeToString(propType);
        initialProp.required = !prop.questionToken;
        initialProp.type.name = type.replace(' | undefined', '');
        initialProp.type.name = initialProp.type.name.replace(
          reactElementTypeExpanded,
          'ReactElement'
        );
        initialProp.type.name = initialProp.type.name.replace(
          reactNodeTypeExpanded,
          'ReactNode'
        );
      }
    });
  }
}

/**
 * For types declared as (key of HTMLElements) all the HTML Element types will appear. This creates a large
 * list of types. To avoid this we could check if the props the props include the firse few keys of HTMLElements
 */
const intrinsicValuesRaw = [
  '"a"',
  '"abbr"',
  '"address"',
  '"animate"',
  '"animateMotion"',
  '"animateTransform"',
  '"area"',
  '"article"',
  '"aside"',
  '"audio"',
];

/**
 * Replace ReactElement and ReactNode expanded types with ReactElement and ReactNode
 */
const reactElementTypeExpanded =
  'ReactElement<any, string | ((props: any) => ReactElement<any, string | ... | (new (props: any) => Component<any, any, any>)>) | (new (props: any) => Component<any, any, any>)>';

const reactNodeTypeExpanded =
  'string | number | boolean | {} | ReactElement<any, string | ((props: any) => ReactElement<any, string | ... | (new (props: any) => Component<any, any, any>)>) | (new (props: any) => Component<...>)> | ... 5 more ... | (ReactPortal & string)';
