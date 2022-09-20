/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FC } from 'react';
import { Query } from '../query';

/**
 * The props that are passed down to the custom component
 */
export interface CustomComponentProps {
  query: Query;
  onChange?: (query: Query) => void;
}

export interface CustomComponentFilterConfigType<
  T extends CustomComponentProps = CustomComponentProps
> {
  type: 'custom_component';
  component: React.ComponentType<T>;
  available?: () => boolean;
}

export interface CustomComponentFilterProps<
  T extends CustomComponentProps = CustomComponentProps
> {
  index: number;
  config: CustomComponentFilterConfigType<T>;
  query: Query;
  onChange?: (query: Query) => void;
}

export const CustomComponentFilter: FC<CustomComponentFilterProps> = (
  props
) => {
  const { component: CustomComponent } = props.config;
  return <CustomComponent query={props.query} onChange={props.onChange} />;
};
