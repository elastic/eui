/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiColorStopThumb } from './color_stop_thumb';

import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

jest.mock('../../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

const onChange = jest.fn();

// Note: Unit/interaction tests can be found in ./color_stops.test

shouldRenderCustomStyles(
  <EuiColorStopThumb
    onChange={onChange}
    stop={0}
    color="#FF0000"
    localMin={0}
    localMax={24}
    globalMin={0}
    globalMax={100}
    colorPickerMode="default"
    isPopoverOpen={true}
    openPopover={() => {}}
    closePopover={() => {}}
    {...requiredProps}
  />,
  { childProps: ['valueInputProps'] }
);

test('renders EuiColorStopThumb', () => {
  const { container } = render(
    <EuiColorStopThumb
      onChange={onChange}
      stop={0}
      color="#FF0000"
      localMin={0}
      localMax={24}
      globalMin={0}
      globalMax={100}
      colorPickerMode="default"
      isPopoverOpen={false}
      openPopover={() => {}}
      closePopover={() => {}}
      {...requiredProps}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('renders swatch-only EuiColorStopThumb', () => {
  const { container } = render(
    <EuiColorStopThumb
      onChange={onChange}
      stop={0}
      color="#FF0000"
      localMin={0}
      localMax={24}
      globalMin={0}
      globalMax={100}
      colorPickerMode="swatch"
      isPopoverOpen={false}
      openPopover={() => {}}
      closePopover={() => {}}
      {...requiredProps}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('renders picker-only EuiColorStopThumb', () => {
  const { container } = render(
    <EuiColorStopThumb
      onChange={onChange}
      stop={0}
      color="#FF0000"
      localMin={0}
      localMax={24}
      globalMin={0}
      globalMax={100}
      colorPickerMode="picker"
      isPopoverOpen={false}
      openPopover={() => {}}
      closePopover={() => {}}
      {...requiredProps}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('renders disabled EuiColorStopThumb', () => {
  const { container } = render(
    <EuiColorStopThumb
      onChange={onChange}
      stop={0}
      color="#FF0000"
      localMin={0}
      localMax={24}
      globalMin={0}
      globalMax={100}
      colorPickerMode="default"
      disabled={true}
      isPopoverOpen={false}
      openPopover={() => {}}
      closePopover={() => {}}
      {...requiredProps}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('renders readOnly EuiColorStopThumb', () => {
  const { container } = render(
    <EuiColorStopThumb
      onChange={onChange}
      stop={0}
      color="#FF0000"
      localMin={0}
      localMax={24}
      globalMin={0}
      globalMax={100}
      colorPickerMode="default"
      readOnly={true}
      isPopoverOpen={false}
      openPopover={() => {}}
      closePopover={() => {}}
      {...requiredProps}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
