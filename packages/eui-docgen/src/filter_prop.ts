import type { PropItem } from 'react-docgen-typescript';

const reactElementTypeExpanded =
  'ReactElement<any, string | JSXElementConstructor<any>>';

const reactNodeTypeExpanded =
  /(string \| number \| boolean \| {} \| ReactElement \| ReactNodeArray \| ReactPortal)( \| \({} & string\).+\(ReactPortal & string\))?/g;

/**
 * For types declared as (key of HTMLElements) all the HTML Element types will appear. This creates a large
 * list of types. To avoid this we could check if the props the props include the first few keys of HTMLElements
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

// props that should be allowed even if its from an external module
const allowedProps = ['children', 'className', 'aria-label'];

// external modules whose props must be allowed
const allowedParents = [
  'AutoSizerProps',
  'DragDropContextProps',
  'DraggableProps',
  'DroppableProps',
  'RefAttributes',
];

// components/types that should allow all props, even from external modules
const allowedComponents = ['EuiDataGridVirtualizationOptions'];

/**
 * Filter props to remove props from node modules while keeping those whitelisted
 */
export const filterProp = (
  prop: PropItem,
  component: any,
  componentExtends: Record<string, string[]>
) => {
  if (allowedProps.includes(prop.name)) {
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
    const propValueArray = prop.type.value.map((type: any) => type.value);
    const found = intrinsicValuesRaw.every(
      (value) => propValueArray.indexOf(value) >= 0
    );
    if (found) {
      prop.type.name = 'any HTML Element';
    }
  }

  if (prop.parent) {
    // Check if props are extended from other node module
    if (allowedParents.includes(prop.parent.name)) return true;

    if (!componentExtends[component.name]) {
      componentExtends[component.name] = [];
    }
    if (!componentExtends[component.name].includes(prop.parent.name)) {
      componentExtends[component.name].push(prop.parent.name);
    }

    if (allowedProps.includes(prop.name)) {
      return true;
    }

    if (allowedComponents.includes(component.name)) return true;
    if (prop.parent.fileName.includes('@elastic/charts')) return true;
    return !prop.parent.fileName.includes('node_modules');
  }

  return true;
};
