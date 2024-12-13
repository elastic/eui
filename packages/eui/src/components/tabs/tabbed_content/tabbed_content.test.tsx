/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiTabbedContent, AUTOFOCUS } from './tabbed_content';

const elasticsearchTab = {
  id: 'es',
  name: 'Elasticsearch',
  content: <p>Elasticsearch content</p>,
};

const kibanaTab = {
  id: 'kibana',
  name: <strong>Kibana</strong>,
  'data-test-subj': 'kibanaTab',
  className: 'kibanaTab',
  content: <p>Kibana content</p>,
  prepend: 'prepend',
  append: 'append',
};

const tabs = [elasticsearchTab, kibanaTab];

describe('EuiTabbedContent', () => {
  shouldRenderCustomStyles(<EuiTabbedContent tabs={tabs} />);

  test('is rendered with required props and tabs', () => {
    const { container } = render(
      <EuiTabbedContent {...requiredProps} tabs={tabs} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('onTabClick', () => {
      test('is called when a tab is clicked', () => {
        const onTabClickHandler = jest.fn();
        const { getByTestSubject } = render(
          <EuiTabbedContent onTabClick={onTabClickHandler} tabs={tabs} />
        );
        fireEvent.click(getByTestSubject('kibanaTab'));
        expect(onTabClickHandler).toHaveBeenCalledTimes(1);
        expect(onTabClickHandler).toHaveBeenCalledWith(kibanaTab);
      });
    });

    describe('selectedTab', () => {
      test('renders a selected tab', () => {
        const { container } = render(
          <EuiTabbedContent selectedTab={kibanaTab} tabs={tabs} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('initialSelectedTab', () => {
      test('renders a selected tab', () => {
        const { container } = render(
          <EuiTabbedContent initialSelectedTab={kibanaTab} tabs={tabs} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('can be small', () => {
        const { container } = render(<EuiTabbedContent size="s" tabs={tabs} />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('autoFocus', () => {
      AUTOFOCUS.forEach((focusType) => {
        test(`${focusType} is rendered`, () => {
          const { container } = render(
            <EuiTabbedContent autoFocus={focusType} tabs={tabs} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });

  describe('behavior', () => {
    describe('when selectedTab state is uncontrolled', () => {
      it('selects the first tab by default', () => {
        const { getAllByRole } = render(<EuiTabbedContent tabs={tabs} />);
        const tabElements = getAllByRole('tab');
        expect(tabElements[0]).toHaveAttribute('aria-selected', 'true');
        expect(tabElements[1]).toHaveAttribute('aria-selected', 'false');
      });
    });

    it("does not reset the existing selected tab if the tab's contents update", () => {
      const { rerender, getAllByRole, getByTestSubject } = render(
        <EuiTabbedContent tabs={[elasticsearchTab, { ...kibanaTab }]} />
      );

      fireEvent.click(getByTestSubject('kibanaTab'));
      expect(getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');

      rerender(
        <EuiTabbedContent
          tabs={[
            elasticsearchTab,
            { ...kibanaTab, content: <p>pdated Kibana content</p> },
          ]}
        />
      );
      expect(getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('resets the selected tab to the first if the `tabs` content completely changes', () => {
      const { rerender, getAllByRole, getByTestSubject } = render(
        <EuiTabbedContent tabs={tabs} />
      );

      fireEvent.click(getByTestSubject('kibanaTab'));
      expect(getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');

      rerender(
        <EuiTabbedContent
          tabs={[
            {
              id: 'hello',
              name: 'New tab 1',
              content: <p>Hello</p>,
            },
            {
              id: 'world',
              name: 'New tab 2',
              content: <p>World</p>,
            },
          ]}
        />
      );
      expect(getAllByRole('tab')[0]).toHaveAttribute('aria-selected', 'true');
    });
  });
});
