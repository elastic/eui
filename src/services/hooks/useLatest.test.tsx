/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { mount } from 'enzyme';
import React, { MutableRefObject, useEffect } from 'react';
import { useLatest } from './useLatest';

describe('useLatest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates the ref value but not the ref identity on render', () => {
    const onRefChange = jest.fn();
    const onRefCurrentValueChange = jest.fn();

    const wrapper = mount(
      <MockComponent
        onRefChange={onRefChange}
        onRefCurrentValueChange={onRefCurrentValueChange}
        value="first"
      />
    );

    expect(onRefChange).toHaveBeenCalledTimes(1);
    expect(onRefChange).toHaveBeenLastCalledWith({ current: 'first' });
    expect(onRefCurrentValueChange).toHaveBeenCalledTimes(1);
    expect(onRefCurrentValueChange).toHaveBeenLastCalledWith('first');

    wrapper.setProps({ value: 'second' });

    expect(onRefChange).toHaveBeenCalledTimes(1); // the ref's identity has not changed
    expect(onRefCurrentValueChange).toHaveBeenCalledTimes(2);
    expect(onRefCurrentValueChange).toHaveBeenLastCalledWith('second');
  });
});

const MockComponent = ({
  value,
  onRefChange,
  onRefCurrentValueChange,
}: {
  value: string;
  onRefChange: (ref: MutableRefObject<string | null>) => void;
  onRefCurrentValueChange: (currentValue: string | null) => void;
}) => {
  const valueRef = useLatest(value);

  useEffect(() => {
    onRefChange(valueRef);
  }, [onRefChange, valueRef]);

  useEffect(() => {
    onRefCurrentValueChange(valueRef.current);
    // we're intentionally looking into the ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRefCurrentValueChange, valueRef.current]);

  return null;
};
