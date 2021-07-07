/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps, findTestSubject } from '../../../test';

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
  content: <p>Kibana content</p>,
};

const tabs = [elasticsearchTab, kibanaTab];

describe('EuiTabbedContent', () => {
  test('is rendered with required props and tabs', () => {
    const component = render(
      <EuiTabbedContent {...requiredProps} tabs={tabs} />
    );
    expect(component).toMatchSnapshot();
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
        const component = render(
          <EuiTabbedContent selectedTab={kibanaTab} tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('initialSelectedTab', () => {
      test('renders a selected tab', () => {
        const component = render(
          <EuiTabbedContent initialSelectedTab={kibanaTab} tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('can be small', () => {
        const component = render(<EuiTabbedContent size="s" tabs={tabs} />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be condensed', () => {
        const component = render(
          <EuiTabbedContent display="condensed" tabs={tabs} />
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('autoFocus', () => {
      AUTOFOCUS.forEach((focusType) => {
        test(`${focusType} is rendered`, () => {
          const component = render(
            <EuiTabbedContent autoFocus={focusType} tabs={tabs} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('behavior', () => {
    test("when selected tab state isn't controlled by the owner, select the first tab by default", () => {
      const component = render(<EuiTabbedContent tabs={tabs} />);
      expect(component).toMatchSnapshot();
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

      expect(component).toMatchSnapshot();
    });
  });
});
