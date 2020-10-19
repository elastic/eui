import React, { FunctionComponent } from 'react';
import { DefaultItemAction } from '../../../../../src/components/basic_table/action_types';

// Simulating the `item` generic
type T = {};

export const DefaultItemActionProps: FunctionComponent<DefaultItemAction<
  T
>> = () => <div />;
