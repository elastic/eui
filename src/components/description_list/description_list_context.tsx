/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import {
  EuiDescriptionListProps,
  EuiDescriptionListChildTypes,
} from './description_list_types';

type EuiDescriptionListContextValues = Required<
  Pick<EuiDescriptionListProps, 'textStyle' | 'align' | 'rowGutterSize'> & {
    type: EuiDescriptionListChildTypes;
  }
> & {
  compressed?: EuiDescriptionListProps['compressed'];
};

export const contextDefaults: EuiDescriptionListContextValues = {
  type: 'row',
  textStyle: 'normal',
  align: 'left',
  rowGutterSize: 's',
};

export const EuiDescriptionListContext =
  createContext<EuiDescriptionListContextValues>(contextDefaults);
