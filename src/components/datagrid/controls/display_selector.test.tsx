/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount, ReactWrapper } from 'enzyme';

import { EuiDataGridToolBarVisibilityOptions } from '../data_grid_types';

import { useDataGridDisplaySelector, startingStyles } from './display_selector';

describe('useDataGridDisplaySelector', () => {
  describe('displaySelector', () => {
    // Hooks can only be called inside function components
    const MockComponent = ({
      showDisplaySelector = true as EuiDataGridToolBarVisibilityOptions['showDisplaySelector'],
      gridStyles = {},
      showStyleSelector = undefined as boolean | undefined,
    }) => {
      const [displaySelector] = useDataGridDisplaySelector(
        showDisplaySelector,
        gridStyles,
        showStyleSelector
      );
      return <>{displaySelector}</>;
    };
    const openPopover = (component: ReactWrapper) => {
      component
        .find('[data-test-subj="dataGridDisplaySelectorButton"]')
        .last()
        .simulate('click');
    };
    const closePopover = (component: ReactWrapper) => {
      act(() => {
        (component
          .find('[data-test-subj="dataGridDisplaySelectorPopover"]')
          .first()
          .prop('closePopover') as Function)();
      });
    };

    it('renders a toolbar button/popover allowing users to customize display settings', () => {
      const component = shallow(<MockComponent />);
      expect(component).toMatchSnapshot();
    });

    describe('density', () => {
      const getSelection = (component: ReactWrapper) =>
        component
          .find('EuiButtonGroup[data-test-subj="densityButtonGroup"]')
          .prop('idSelected');

      it('renders display density buttons that change grid density on click', () => {
        const component = mount(<MockComponent />);
        openPopover(component);

        // Click density 'buttons' (actually hidden radios)
        component.find('[data-test-subj="expanded"]').simulate('change');
        expect(getSelection(component)).toEqual('expanded');
        component.find('[data-test-subj="normal"]').simulate('change');
        expect(getSelection(component)).toEqual('normal');
        component.find('[data-test-subj="compact"]').simulate('change');
        expect(getSelection(component)).toEqual('compact');

        // Should have changed the main toolbar icon accordingly
        closePopover(component);
        expect(
          component
            .find('[data-test-subj="dataGridDisplaySelectorButton"]')
            .first()
            .prop('iconType')
        ).toEqual('tableDensityCompact');
      });

      it('hides the density buttongroup if allowDensity is set to false', () => {
        const component = mount(
          <MockComponent showDisplaySelector={{ allowDensity: false }} />
        );
        openPopover(component);

        expect(
          component.find('[data-test-subj="densityButtonGroup"]')
        ).toHaveLength(0);
      });

      // TODO: Deprecate
      it('hides the density buttongroup if showStyleSelector is set to false', () => {
        const component = mount(<MockComponent showStyleSelector={false} />);
        openPopover(component);

        expect(
          component.find('[data-test-subj="densityButtonGroup"]')
        ).toHaveLength(0);
      });
    });
  });

  describe('gridStyles', () => {
    it('returns an object of grid styles with user overrides', () => {
      const initialStyles = { ...startingStyles, stripes: true };
      const MockComponent = () => {
        const [, gridStyles] = useDataGridDisplaySelector(true, initialStyles);
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
