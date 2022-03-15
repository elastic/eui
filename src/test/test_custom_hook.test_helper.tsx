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
  const { hook: _, ...args } = props;
  const hook = props.hook ? props.hook(args) : undefined;
  // @ts-ignore the actual div is irrelevant, we just need to inspect the prop for return values
  return <div hook={hook} />;
};

export const testCustomHook = <T,>(
  hook?: Function,
  args?: unknown
): {
  return: T;
  getUpdatedState: () => T;
  updateHookArgs: (args: unknown) => void;
} => {
  const wrapper = mount(<HookWrapper hook={hook} {...args} />);

  const updateHookArgs = (args: any) => wrapper.setProps(args);

  const getHookReturn = (): T => {
    wrapper.update();
    return wrapper.find('div').prop('hook');
  };

  return {
    return: getHookReturn(),
    getUpdatedState: getHookReturn, // Allows consuming tests to get most recent values
    updateHookArgs, // Allows consuming tests to pass updated hook arguments (objects only, no tuples)
  };
};
