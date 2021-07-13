/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAvatar, SIZES } from './avatar';

describe('EuiAvatar', () => {
  test('is rendered', () => {
    const component = render(<EuiAvatar name="name" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('allows a name composed entirely of whitespace', () => {
    const component = render(<EuiAvatar name="  " {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('imageUrl', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAvatar name="name" imageUrl="image url" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" iconType="bolt" />);

        expect(component).toMatchSnapshot();
      });

      it('and iconSize is rendered', () => {
        const component = render(
          <EuiAvatar name="name" iconType="bolt" iconSize="xl" />
        );

        expect(component).toMatchSnapshot();
      });

      it('and iconColor is rendered', () => {
        const component = render(
          <EuiAvatar name="name" iconType="bolt" iconColor="primary" />
        );

        expect(component).toMatchSnapshot();
      });

      it('and iconColor as null is rendered', () => {
        const component = render(
          <EuiAvatar name="name" iconType="bolt" iconColor={null} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const component = render(<EuiAvatar name="name" size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('initials', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" initials="lo" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('initialsLength', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" initialsLength={2} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" type="space" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      it('as string is rendered', () => {
        const component = render(<EuiAvatar name="name" color="#000" />);

        expect(component).toMatchSnapshot();
      });

      it('as null is rendered', () => {
        const component = render(<EuiAvatar name="name" color={null} />);

        expect(component).toMatchSnapshot();
      });

      it('as plain is rendered', () => {
        const component = render(<EuiAvatar name="name" color="plain" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" isDisabled={true} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('should throw error if color is not a hex', () => {
    const component = () =>
      render(<EuiAvatar name="name" color="rgba(0,0,0,0)" />);

    expect(component).toThrowErrorMatchingSnapshot();
  });
});
