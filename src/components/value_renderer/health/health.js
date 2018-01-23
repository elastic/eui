import React from 'react';
import { EuiHealth } from '../../health';
import { isFunction } from 'lodash';
import { defaultRenderer } from '../default_renderer';

export const health = (config = {}) => {
  if (!config.color) {
    throw Error(`healthRenderer requires a [color] setting. This setting determines the health color that will be
      used based on the passed in value.`);
  }
  return (value, ctx = undefined) => {
    const content = config.content || defaultRenderer(value, ctx);
    const resolvedContent = isFunction(content) ? content(value, ctx) : content;
    const color = config.color(value, ctx);
    return <EuiHealth color={color}>{resolvedContent}</EuiHealth>;
  };
};
