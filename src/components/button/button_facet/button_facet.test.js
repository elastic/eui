import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiButtonFacet } from './button_facet';
import { EuiIcon } from '../../icon';

describe('EuiButtonFacet', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonFacet {...requiredProps}>
        Content
      </EuiButtonFacet>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonFacet isDisabled />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonFacet isLoading />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonFacet isSelected />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('quantity', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonFacet quantity={60} />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('icon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonFacet icon={<EuiIcon type="dot" />} />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiButtonFacet onClick={handler} />
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
