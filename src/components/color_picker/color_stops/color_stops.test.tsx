import React from 'react';
import { render } from 'enzyme';

import { EuiColorStops } from './color_stops';

import { requiredProps } from '../../../test';

jest.mock('../../portal', () => ({
  // @ts-ignore
  EuiPortal: ({ children }) => children,
}));

const onChange = jest.fn();

const colorStopsArray = [
  { stop: 0, color: '#FF0000' },
  { stop: 25, color: '#00FF00' },
  { stop: 35, color: '#0000FF' },
];

test('renders EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders compressed EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      compressed={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders readOnly EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders fullWidth EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders disabled EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      disabled={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders fixed stop EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      stopType="fixed"
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders empty EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});
