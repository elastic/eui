import { ComponentDoc, PropItem } from 'react-docgen-typescript';

export interface ProcessedComponentExtends {
  displayName: string;
}

export interface ProcessedComponentPropType {
  /**
   * Type name
   */
  name: string;
  /**
   * Raw type representation
   */
  raw?: string;
}

export interface ProcessedComponentProp {
  /**
   * Prop name
   */
  name: string;
  /**
   * Prop description from JSDoc. May contain Commonmark formatting.
   */
  description: string;
  /**
   * Whether the prop is required or optional
   */
  isRequired: boolean;
  /**
   * The stringified default value of the prop.
   */
  defaultValue?: string;
  /**
   * Prop type
   */
  type?: ProcessedComponentPropType;
}

export interface ProcessedComponent {
  /**
   * Relative path to the component
   */
  path: string;
  /**
   * Display name of the component
   */
  displayName: string;
  /**
   * Component props
   */
  props: Record<string, any>;
  /**
   * A list of all types the props type is extending from
   */
  extends: Array<ProcessedComponentExtends>;
}

export interface ProcessComponent {
  componentDoc: ComponentDoc;
  filePath: string;
  componentExtends: Array<string>;
}

export const processComponent = ({ componentDoc, filePath, componentExtends }: ProcessComponent): ProcessedComponent => {
  const props: Record<string, ProcessedComponentProp> = {};
  for (const [propName, prop] of Object.entries(componentDoc.props)) {
    props[propName] = processProp(prop);
  }

  return {
    displayName: componentDoc.displayName,
    path: filePath,
    extends: componentExtends.map((displayName) => ({
      displayName,
    })),
    props,
  };
};

const processProp = (prop: PropItem): ProcessedComponentProp => {
  // The type for `PropItem['defaultValue']` says it's `any` but actually
  // the react-docgen-typescript internally defines it as { value: any } object.
  // The default value can either come from a code-based default value or JSDoc.
  let defaultValue: string | undefined;
  if (
    prop.defaultValue &&
    typeof prop.defaultValue === 'object' &&
    typeof prop.defaultValue.value === 'string'
  ) {
    defaultValue = prop.defaultValue.value;
  }

  return {
    name: prop.name,
    description: prop.description,
    isRequired: prop.required,
    defaultValue,
    type: {
      name: prop.type.name,
      raw: prop.type.raw,
    },
  };
};
