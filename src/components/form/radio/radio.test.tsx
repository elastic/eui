import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiRadio } from './radio';

describe('EuiRadio', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRadio id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('checked is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} checked />
      );

      expect(component).toMatchSnapshot();
    });

    test('label is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} label={<span>Label</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('value is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} value={'bobbins'} />
      );

      expect(component).toMatchSnapshot();
    });

    test('disabled is rendered', () => {
      const component = render(
        <EuiRadio id="id" onChange={() => {}} disabled />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
