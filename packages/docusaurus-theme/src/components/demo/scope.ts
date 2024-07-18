import React from 'react';
import * as EUI from '@elastic/eui';

export const demoScope: Record<string, unknown> = {
  React,
  ...React,
  ...EUI,
};
