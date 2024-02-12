/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps, findTestSubject } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

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
        const component = mount(
          <EuiTabbedContent onTabClick={onTabClickHandler} tabs={tabs} />
        );
        findTestSubject(component, 'kibanaTab').simulate('click');
        expect(onTabClickHandler).toBeCalledTimes(1);
        expect(onTabClickHandler).toBeCalledWith(kibanaTab);
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
    test("when selected tab state isn't controlled by the owner, select the first tab by default", () => {
      const { container } = render(<EuiTabbedContent tabs={tabs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('when uncontrolled, the selected tab should update if it receives new content', () => {
      const tabs = [
        elasticsearchTab,
        {
          ...kibanaTab,
        },
      ];
      const component = mount(<EuiTabbedContent tabs={tabs} />);

      component.find('EuiTab[id="kibana"] button').first().simulate('click');

      component.setProps({
        tabs: [
          elasticsearchTab,
          {
            ...kibanaTab,
            content: <p>updated Kibana content</p>,
          },
        ],
      });

      expect(component.render()).toMatchSnapshot();
    });
  });
});
