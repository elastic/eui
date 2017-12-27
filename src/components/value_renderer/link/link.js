import React from 'react';
import { EuiLink } from '../../link';
import { isFunction } from 'lodash';
import { defaultRenderer } from '../default_renderer';

export const link = (config = {}) => {
  if (!config.onClick) {
    throw Error(`linkRenderer requires a [onClick] setting. This needs to be configured as a function that will be 
      called whenever the rendered link is clicked. It accepts rendered value as argument - [(value) => void]`);
  }
  return (value, ctx = undefined) => {
    const content = config.content || defaultRenderer(value, ctx);
    const resolvedContent = isFunction(content) ? content(value, ctx) : content;
    const onClick = () => config.onClick(value, ctx);
    return <EuiLink type={config.type} color={config.color} onClick={onClick}>{resolvedContent}</EuiLink>;
  };
};
