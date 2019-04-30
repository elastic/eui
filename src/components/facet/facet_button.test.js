import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFacetButton } from './facet_button';
import { EuiIcon } from '../icon';

describe('EuiFacetButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFacetButton {...requiredProps}>Content</EuiFacetButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton isDisabled>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton isLoading>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton isSelected>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('quantity', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton quantity={60}>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFacetButton icon={<EuiIcon type="dot" />}>Content</EuiFacetButton>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiFacetButton onClick={handler}>Content</EuiFacetButton>
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
