import React from 'react';
import * as EUI from '@elastic/eui';

export const demoDefaultScope: Record<string, unknown> = {
  // React
  React,
  ...React,

  // EUI exports
  ...EUI,
};
