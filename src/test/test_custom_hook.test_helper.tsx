/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';

export const HookWrapper = (props: { hook?: Function }) => {
  const hook = props.hook ? props.hook() : undefined;
  // @ts-ignore the actual div is irrelevant, we just need to inspect the prop for return values
  return <div hook={hook} />;
};

export const testCustomHook = <T,>(hook?: Function): T => {
  const wrapper = mount(<HookWrapper hook={hook} />);
  const hookValues: T = wrapper.find('div').prop('hook');

  return hookValues;
};
