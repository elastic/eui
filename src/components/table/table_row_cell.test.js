import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiTableRowCell,
} from './table_row_cell';

import {
  RIGHT_ALIGNMENT,
} from '../../services';

test('renders EuiTableRowCell', () => {
  const component = (
    <EuiTableRowCell {...requiredProps}>
      children
    </EuiTableRowCell>
  );

  expect(render(component)).toMatchSnapshot();
});

describe('align', () => {
  test('defaults to left', () => {
    const component = (
      <EuiTableRowCell />
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('renders right when specified', () => {
    const component = (
      <EuiTableRowCell align={RIGHT_ALIGNMENT} />
    );

    expect(render(component)).toMatchSnapshot();
  });
});

describe('textOnly', () => {
  test('defaults to true', () => {
    const component = (
      <EuiTableRowCell />
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('is rendered when specified', () => {
    const component = (
      <EuiTableRowCell textOnly={false} />
    );

    expect(render(component)).toMatchSnapshot();
  });
});

describe('truncateText', () => {
  test('defaults to false', () => {
    const component = (
      <EuiTableRowCell />
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('is rendered when specified', () => {
    const component = (
      <EuiTableRowCell truncateText={true} />
    );

    expect(render(component)).toMatchSnapshot();
  });
});
