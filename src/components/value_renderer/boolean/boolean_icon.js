import React from 'react';
import { EuiIcon } from '../../icon';

export const createBooleanIconRenderer = (config = {}) => {
  const iconConfig = { yes: 'check', no: 'empty', color: 'default', ...config };
  return (value) => {
    if (value) {
      return <EuiIcon type={iconConfig.yes} color={iconConfig.color} size="m" />;
    }
    return <EuiIcon type={iconConfig.no} color={iconConfig.color} size="m" />;
  };
};

export const booleanIcon = createBooleanIconRenderer();
booleanIcon.with = (config) => createBooleanIconRenderer(config);
