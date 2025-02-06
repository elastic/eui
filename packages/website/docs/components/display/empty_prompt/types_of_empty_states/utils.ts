import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

import { TYPES_OF_USE_CASES, UseCaseTypeKeys } from './use_cases';

function isReactComponent(type: any): type is React.ComponentType {
  return (
    typeof type === 'function' || (typeof type === 'object' && type !== null)
  );
}

// Because of how `EuiPage*` components are named, we need to manually remove the pre-pended underscore
function getDisplayName(node: React.ReactNode): string {
  let name = 'Unknown';

  if (React.isValidElement(node)) {
    const component = node.type;

    if (isReactComponent(component)) {
      const componentName =
        component.displayName || component.name || 'Unknown';

      name = componentName.startsWith('_')
        ? componentName.substring(1)
        : componentName;
    } else if (typeof component === 'string') {
      name = component;
    }
  }

  return name;
}

export function convertToJsxString(element: React.ReactNode) {
  return reactElementToJSXString(element, {
    displayName: getDisplayName,
  });
}

export function isUseCaseTypeKey(value: string): value is UseCaseTypeKeys {
  return Object.keys(TYPES_OF_USE_CASES).includes(value);
}
