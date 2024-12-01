/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render, waitForEuiToolTipVisible } from '../../test/rtl';

import { EuiListGroupItem, SIZES, COLORS } from './list_group_item';

describe('EuiListGroupItem', () => {
  shouldRenderCustomStyles(<EuiListGroupItem label="Label" />);
  shouldRenderCustomStyles(
    <EuiListGroupItem
      label="Label"
      iconType="user"
      extraAction={{ iconType: 'star', 'aria-label': 'label' }}
    />,
    {
      childProps: ['iconProps', 'extraAction'],
      skip: { parentTest: true },
    }
  );
  shouldRenderCustomStyles(
    <EuiListGroupItem
      label="Label"
      toolTipText="Tooltip"
      showToolTip
      data-test-subj="trigger"
    />,
    {
      childProps: ['toolTipProps', 'toolTipProps.anchorProps'],
      skip: { parentTest: true },
      renderCallback: async ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
      },
    }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiListGroupItem label="Label" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiListGroupItem label="Label" size={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiListGroupItem label="Label" color={color} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('isActive', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" isActive />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" isDisabled />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" iconType="empty" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" icon={<span />} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('showToolTip', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" showToolTip />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('wrapText', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" wrapText />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem
            label="Label"
            extraAction={{
              iconType: 'empty',
              alwaysShow: true,
              'aria-label': 'label',
            }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with showToolTip', () => {
        const { getByTestSubject } = render(
          <EuiListGroupItem
            label="Label"
            showToolTip
            extraAction={{
              iconType: 'empty',
              alwaysShow: true,
              'aria-label': 'label',
              'data-test-subj': 'extraAction',
            }}
          />
        );

        expect(getByTestSubject('extraAction')).toBeInTheDocument();
      });

      test('can be disabled', () => {
        const { getByTestSubject } = render(
          <EuiListGroupItem
            label="Label"
            extraAction={{
              iconType: 'empty',
              isDisabled: true,
              'aria-label': 'label',
              'data-test-subj': 'extraAction',
            }}
          />
        );

        expect(getByTestSubject('extraAction')).toBeDisabled();
      });
    });

    describe('href', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" href="#" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with rel', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" href="#" rel="noreferrer" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('external', () => {
      test('is rendered', () => {
        const { getByText } = render(
          <EuiListGroupItem label="Label" href="#" external />
        );
        expect(getByText('(external)')).toBeInTheDocument();
      });

      test('target `_blank` renders external icon', () => {
        const { getByText } = render(
          <EuiListGroupItem label="Label" href="#" target="_blank" />
        );
        expect(
          getByText('(external, opens in a new tab or window)')
        ).toBeInTheDocument();
      });
    });

    describe('onClick', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="Label" onClick={() => {}} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('href and onClick', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="" onClick={() => {}} href="#" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('style', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiListGroupItem label="" style={{ color: 'red' }} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('toolTipProps', () => {
      test('renders custom tooltip props', async () => {
        const { getByTestSubject } = render(
          <EuiListGroupItem
            label="Label"
            toolTipText="Tooltip"
            showToolTip
            data-test-subj="trigger"
            toolTipProps={{
              'data-test-subj': 'tooltip',
            }}
          />
        );
        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
        expect(getByTestSubject('tooltip')).toBeInTheDocument();
      });
    });
  });

  test('renders a disabled button even if provided an href', () => {
    const { container } = render(
      <EuiListGroupItem label="Label" isDisabled href="#" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a disabled button even if provided an href', () => {
    const { container } = render(
      <EuiListGroupItem label="Label" isDisabled href="#" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('throws a warning', () => {
    const oldConsoleError = console.warn;
    let consoleStub: jest.Mock;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because EUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.
      console.warn = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.warn = oldConsoleError;
    });

    test('if both iconType and icon are provided but still renders', () => {
      const { container } = render(
        <EuiListGroupItem label="" iconType="empty" icon={<span />} />
      );

      expect(consoleStub).toHaveBeenCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        '`iconType` and `icon` were passed'
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
