/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableListItem, PADDING_SIZES } from './selectable_list_item';

describe('EuiSelectableListItem', () => {
  test('is rendered', () => {
    const { container } = render(<EuiSelectableListItem {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('checked', () => {
      const checkedValues = ['on', 'mixed', undefined] as const;

      checkedValues.forEach((value) => {
        test(`${value}`, () => {
          const { container } = render(
            <EuiSelectableListItem checked={value} />
          );
          expect(container.firstChild).toMatchSnapshot();
        });
      });

      const exclusionCheckedValues = ['on', 'off', 'mixed', undefined] as const;

      describe('& allowExclusions', () => {
        exclusionCheckedValues.forEach((value) => {
          test(`${value}`, () => {
            const { container } = render(
              <EuiSelectableListItem allowExclusions checked={value} />
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });

      const searchableCheckedValues = ['on', undefined] as const;

      describe('& searchable', () => {
        searchableCheckedValues.forEach((value) => {
          test(`${value}`, () => {
            const { container } = render(
              <EuiSelectableListItem searchable checked={value} />
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });
    });

    describe('role and aria-checked behavior', () => {
      it('automatically handles `aria-checked` state for valid roles', () => {
        const { getByRole } = render(
          <EuiSelectableListItem role="menuitemcheckbox" checked="on" />
        );

        expect(getByRole('menuitemcheckbox')).toHaveAttribute(
          'aria-checked',
          'true'
        );
      });

      it('does not render `aria-checked` for roles that cannot be checked', () => {
        const { getByRole } = render(
          <EuiSelectableListItem role="button" checked="on" />
        );

        expect(getByRole('button')).not.toHaveAttribute('aria-checked');
      });

      it('does not set `aria-checked="mixed"` for roles that cannot be mixed', () => {
        const { getByRole } = render(
          <EuiSelectableListItem role="radio" checked="mixed" />
        );

        expect(getByRole('radio')).toHaveAttribute('aria-checked', 'false');
      });
    });

    test('showIcons can be turned off', () => {
      const { container } = render(<EuiSelectableListItem showIcons={false} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isFocused', () => {
      const { container } = render(<EuiSelectableListItem isFocused />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled', () => {
      const { container } = render(<EuiSelectableListItem disabled />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('prepend', () => {
      const { container } = render(
        <EuiSelectableListItem prepend={<span />} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('append', () => {
      const { container } = render(<EuiSelectableListItem append={<span />} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiSelectableListItem paddingSize={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('textWrap', () => {
      test('can be "wrap"', () => {
        const { container } = render(<EuiSelectableListItem textWrap="wrap" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onFocusBadge', () => {
      test('can be true', () => {
        const { container } = render(
          <EuiSelectableListItem onFocusBadge={true} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('can be custom', () => {
        const { container } = render(
          <EuiSelectableListItem
            onFocusBadge={{
              children: 'Custom',
              iconType: 'bolt',
            }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
