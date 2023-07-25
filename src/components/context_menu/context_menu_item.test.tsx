/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiContextMenuItem, SIZES } from './context_menu_item';

describe('EuiContextMenuItem', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiContextMenuItem {...requiredProps}>Hello</EuiContextMenuItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiContextMenuItem icon={<span className="euiIcon fa-user" />} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('disabled', () => {
      test('is rendered', () => {
        const { container } = render(<EuiContextMenuItem disabled />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(<EuiContextMenuItem size={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('onClick', () => {
      test('renders a button', () => {
        const { container } = render(
          <EuiContextMenuItem {...requiredProps} onClick={() => {}} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test("isn't called upon instantiation", () => {
        const onClickHandler = jest.fn();

        shallow(<EuiContextMenuItem onClick={onClickHandler} />);

        expect(onClickHandler).not.toHaveBeenCalled();
      });

      test('is called when the item is clicked', () => {
        const onClickHandler = jest.fn();

        const component = shallow(
          <EuiContextMenuItem onClick={onClickHandler} />
        );

        component.simulate('click');

        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      test('is not called when the item is clicked but set to disabled', () => {
        const onClickHandler = jest.fn();

        const component = mount(
          <EuiContextMenuItem disabled onClick={onClickHandler} />
        );

        component.simulate('click');

        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });

    describe('href', () => {
      test('renders a link', () => {
        const { container } = render(
          <EuiContextMenuItem {...requiredProps} href="url" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('rel', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiContextMenuItem {...requiredProps} href="url" rel="help" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('target', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiContextMenuItem {...requiredProps} href="url" target="_blank" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('hasPanel', () => {
      test('is rendered', () => {
        const { container } = render(<EuiContextMenuItem hasPanel />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
