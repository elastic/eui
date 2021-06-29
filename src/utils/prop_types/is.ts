/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { isNil } from '../../services/predicate';

export const is = <T>(expectedValue: any) => {
  const validator = (props: T, propName: keyof T, componentName: string) => {
    const compName = componentName || 'ANONYMOUS';
    const value = props[propName];
    if (value !== expectedValue) {
      return new Error(`[${propName}] property in [${compName}] component is expected to equal [${expectedValue}] but
         [${value}] was provided instead.`);
    }
    return null;
  };

  validator.isRequired = (
    props: T,
    propName: keyof T,
    componentName: string
  ) => {
    const compName = componentName || 'ANONYMOUS';
    const value = props[propName];
    if (isNil(value)) {
      return new Error(
        `[${propName}] property in [${compName}] component is required but seems to be missing`
      );
    }
    return validator(props, propName, componentName);
  };

  return validator;
};
