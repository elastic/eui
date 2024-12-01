/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiAvatar, SIZES, CASING } from './avatar';

describe('EuiAvatar', () => {
  shouldRenderCustomStyles(<EuiAvatar name="name" />);

  test('is rendered', () => {
    const { container } = render(<EuiAvatar name="name" {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('allows a name composed entirely of whitespace', () => {
    const { container } = render(<EuiAvatar name="  " {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('imageUrl', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAvatar name="name" imageUrl="image-url.gif" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<EuiAvatar name="name" iconType="bolt" />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('and iconSize is rendered', () => {
        const { container } = render(
          <EuiAvatar name="name" iconType="bolt" iconSize="xl" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('and iconColor is rendered', () => {
        const { container } = render(
          <EuiAvatar name="name" iconType="bolt" iconColor="primary" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('and iconColor as null is rendered', () => {
        const { container } = render(
          <EuiAvatar name="name" iconType="bolt" iconColor={null} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(<EuiAvatar name="name" size={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('casing', () => {
      CASING.forEach((casing) => {
        it(`${casing} is rendered`, () => {
          const { container } = render(
            <EuiAvatar name="name" casing={casing} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('initials', () => {
      it('is rendered', () => {
        const { container } = render(<EuiAvatar name="name" initials="lo" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('initialsLength', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAvatar name="name" initialsLength={2} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const { container } = render(<EuiAvatar name="name" type="space" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      it('as string is rendered', () => {
        const { container } = render(<EuiAvatar name="name" color="#000" />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('as null is rendered', () => {
        const { container } = render(<EuiAvatar name="name" color={null} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('as plain is rendered', () => {
        const { container } = render(<EuiAvatar name="name" color="plain" />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('as subdued is rendered', () => {
        const { container } = render(<EuiAvatar name="name" color="subdued" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAvatar name="name" isDisabled={true} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  test('should throw error if color is not a hex', () => {
    const component = () =>
      render(<EuiAvatar name="name" color="rgba(0,0,0,0)" />);

    expect(component).toThrow(
      'EuiAvatar needs to pass a valid color. This can either be a three or six character hex value'
    );
  });
});
