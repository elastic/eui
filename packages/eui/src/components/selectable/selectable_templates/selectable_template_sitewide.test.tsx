/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, waitForEuiPopoverOpen } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableTemplateSitewide } from './selectable_template_sitewide';
import { EuiSelectableTemplateSitewideOption } from './selectable_template_sitewide_option';

const options: EuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Basic data application',
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Application',
        type: 'application',
      },
    ],
    url: 'welcome-dashboards',
    ...requiredProps,
    'data-test-subj': 'test-this',
  },
  {
    label: 'Platform with deployment highlighted',
    icon: {
      type: 'user',
    },
    meta: [
      {
        text: 'Account',
        type: 'platform',
      },
      {
        text: 'personal-databoard',
        type: 'deployment',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: 'Other metas',
    searchableLabel: 'Totally custom with pink metadata',
    icon: {
      type: 'warning',
      color: 'accent',
    },
    meta: [
      {
        text: 'Article',
        type: 'article',
      },
      {
        text: 'Case',
        type: 'case',
      },
      {
        text: 'Text',
      },
      {
        text: 'I have a custom type',
        type: 'PINK',
      },
    ],
  },
];

describe('EuiSelectableTemplateSitewide', () => {
  shouldRenderCustomStyles(
    <EuiSelectableTemplateSitewide options={options} />,
    { childProps: ['popoverProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiSelectableTemplateSitewide options={options} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('popoverProps is rendered', () => {
      const { container } = render(
        <EuiSelectableTemplateSitewide
          options={options}
          popoverProps={{ className: 'customPopoverClass' }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('popoverTitle is rendered', () => {
      const { container } = render(
        <EuiSelectableTemplateSitewide
          options={options}
          popoverTitle={<>Title</>}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('popoverFooter is rendered', () => {
      const { container } = render(
        <EuiSelectableTemplateSitewide
          options={options}
          popoverFooter={<>Footer</>}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('popoverButton', () => {
      // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
      beforeAll(() => (window.innerWidth = 670));
      afterAll(() => 1024); // reset to jsdom's default

      const button = (
        <button data-test-subj="mobilePopoverButton">Button</button>
      );

      test('is rendered', () => {
        const { container } = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={button}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with popoverButtonBreakpoints m', () => {
        const { getByTestSubject } = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={button}
            popoverButtonBreakpoints={['xs', 's', 'm']}
          />
        );

        expect(getByTestSubject('mobilePopoverButton')).toBeInTheDocument();
      });

      test('is not rendered with popoverButtonBreakpoints xs', () => {
        const { queryByTestSubject } = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={button}
            popoverButtonBreakpoints={['xs']}
          />
        );

        expect(
          queryByTestSubject('mobilePopoverButton')
        ).not.toBeInTheDocument();
      });

      test('toggles the selectable popover for keyboard users', async () => {
        const { getByTestSubject } = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={<div>{button}</div>}
          />
        );
        // fireEvent doesn't seem to work: https://github.com/testing-library/user-event/issues/179#issuecomment-1125146667
        getByTestSubject('mobilePopoverButton').focus();
        await waitFor(() => userEvent.keyboard('{enter}'));
        waitForEuiPopoverOpen();

        expect(getByTestSubject('euiSelectableList')).toBeInTheDocument();
      });

      test('toggles the selectable popover even when a wrapper exists around the button', () => {
        const { getByTestSubject } = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={<>{button}</>}
          />
        );
        fireEvent.click(getByTestSubject('mobilePopoverButton'));
        waitForEuiPopoverOpen();

        expect(getByTestSubject('euiSelectableList')).toBeInTheDocument();
      });
    });
  });
});
