/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Represents a processed component prop with its metadata
 */
export type ProcessedComponentProp = {
  /** Name of the prop */
  name: string;
  /** Description of the prop */
  description: string;
  /** Whether the prop is required */
  isRequired?: boolean;
  /** Type information for the prop */
  type?: {
    name: string;
    raw?: string;
    [key: string]: any; // Allow for additional type metadata
  };
  /** Default value of the prop */
  defaultValue?: string;
  /** Allow additional properties that might be needed in the future */
  [key: string]: any;
};

/**
 * Represents a type extension with display name and potentially other information
 */
export type ExtendedType = {
  /** Display name of the type being extended */
  displayName: string;
  /** Any additional metadata about the extended type */
  [key: string]: any;
};

/**
 * Represents a processed component with its metadata
 */
export type ProcessedComponent = {
  /** Display name of the component */
  displayName: string;
  /** Props of the component as a record of prop name to prop details */
  props: Record<string, ProcessedComponentProp>;
  /** Types that this component extends */
  extends: ExtendedType[];
  /** Allow additional properties that might be needed in the future */
  [key: string]: any;
};
