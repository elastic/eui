import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';
import { requiredProps, findTestSubject } from '../../../test';

import { EuiTabbedContent } from './tabbed_content';

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => {
    return () => 42;
  },
}));

const elasticsearchTab = {
  id: 'es',
  name: `Elasticsearch`,
  content: <p>Elasticsearch content</p>,
};

const kibanaTab = {
  id: 'kibana',
  name: `Kibana`,
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
        const onTabClickHandler = sinon.stub();
        const component = mount(
          <EuiTabbedContent onTabClick={onTabClickHandler} tabs={tabs} />
        );
        findTestSubject(component, 'kibanaTab').simulate('click');
        sinon.assert.calledOnce(onTabClickHandler);
        sinon.assert.calledWith(onTabClickHandler, kibanaTab);
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
  });

  describe('behavior', () => {
    test(`when selected tab state isn't controlled by the owner, select the first tab by default`, () => {
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

      component
        .find('EuiTab[id="kibana"] button')
        .first()
        .simulate('click');

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
