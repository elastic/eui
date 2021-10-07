/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import { useDataGridStyleSelector, startingStyles } from './style_selector';

describe('useDataGridStyleSelector', () => {
  describe('styleSelector', () => {
    // Hooks can only be called inside function components
    const MockComponent = () => {
      const [styleSelector] = useDataGridStyleSelector({});
      return <>{styleSelector}</>;
    };

    it('renders a toolbar button/popover allowing users to customize styles', () => {
      const component = shallow(<MockComponent />);
      expect(component).toMatchSnapshot();
    });

    it('renders display density buttons that change grid density on click', () => {
      const component = mount(<MockComponent />);

      // Open popover
      component
        .find('[data-test-subj="dataGridStyleSelectorButton"]')
        .last()
        .simulate('click');

      // Click density 'buttons' (actually hidden radios)
      component.find('[data-test-subj="expanded"]').simulate('change');
      component.find('[data-test-subj="normal"]').simulate('change');
      component.find('[data-test-subj="compact"]').simulate('change');
      expect(component.find('EuiButtonGroup').prop('idSelected')).toEqual(
        'compact'
      );

      // Close popover
      act(() => {
        (component
          .find('[data-test-subj="dataGridStyleSelectorPopover"]')
          .first()
          .prop('closePopover') as Function)();
      });
    });
  });

  describe('gridStyles', () => {
    it('returns an object of grid styles with user overrides', () => {
      const initialStyles = { ...startingStyles, stripes: true };
      const MockComponent = () => {
        const [, gridStyles] = useDataGridStyleSelector(initialStyles);
        return <table {...gridStyles} />;
      };
      const component = shallow(<MockComponent />);

      expect(component).toMatchInlineSnapshot(`
        <table
          border="all"
          cellPadding="m"
          fontSize="m"
          footer="overline"
          header="shade"
          rowHover="highlight"
          stickyFooter={true}
          stripes={true}
        />
      `);
    });
  });
});
