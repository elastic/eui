/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';

import {
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridRowHeightsOptions,
} from '../data_grid_types';

import { useDataGridDisplaySelector, startingStyles } from './display_selector';

describe('useDataGridDisplaySelector', () => {
  describe('displaySelector', () => {
    // Hooks can only be called inside function components
    const MockComponent = ({
      showDisplaySelector = true as EuiDataGridToolBarVisibilityOptions['showDisplaySelector'],
      gridStyles = {},
      rowHeightsOptions = undefined as EuiDataGridRowHeightsOptions | undefined,
    }) => {
      const [displaySelector] = useDataGridDisplaySelector(
        showDisplaySelector,
        gridStyles,
        rowHeightsOptions
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

    it('does not render if all valid sub-options are disabled', () => {
      const component = shallow(
        <MockComponent
          showDisplaySelector={{
            allowDensity: false,
            allowRowHeight: false,
          }}
        />
      );
      expect(component.text()).toEqual('');
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

      describe('convertGridStylesToSelection (loading initial state from passed gridStyles', () => {
        it('should set compact state if both fontSize and cellPadding are s', () => {
          const component = mount(
            <MockComponent gridStyles={{ fontSize: 's', cellPadding: 's' }} />
          );
          openPopover(component);
          expect(getSelection(component)).toEqual('compact');
        });

        it('should set normal state if both fontSize and cellPadding are m', () => {
          const component = mount(
            <MockComponent gridStyles={{ fontSize: 'm', cellPadding: 'm' }} />
          );
          openPopover(component);
          expect(getSelection(component)).toEqual('normal');
        });

        it('should set compact state if both fontSize and cellPadding are l', () => {
          const component = mount(
            <MockComponent gridStyles={{ fontSize: 'l', cellPadding: 'l' }} />
          );
          openPopover(component);
          expect(getSelection(component)).toEqual('expanded');
        });

        it('should not select any buttons if fontSize and cellPadding do not match a set density state', () => {
          const component = mount(
            <MockComponent gridStyles={{ fontSize: 'l', cellPadding: 's' }} />
          );
          openPopover(component);
          expect(getSelection(component)).toEqual('');
        });
      });
    });

    describe('row height', () => {
      const getSelection = (component: ReactWrapper) =>
        component
          .find('EuiButtonGroup[data-test-subj="rowHeightButtonGroup"]')
          .prop('idSelected');

      it('renders row height buttons that toggle betwen undefined, auto, and lineCount', () => {
        const component = mount(<MockComponent />);
        openPopover(component);
        expect(getSelection(component)).toEqual('undefined');

        component.find('[data-test-subj="auto"]').simulate('change');
        expect(getSelection(component)).toEqual('auto');
      });

      it('hides the row height buttongroup if allowRowHeight is set to false', () => {
        const component = mount(
          <MockComponent showDisplaySelector={{ allowRowHeight: false }} />
        );
        openPopover(component);

        expect(
          component.find('[data-test-subj="rowHeightButtonGroup"]')
        ).toHaveLength(0);
      });

      describe('convertRowHeightsOptionsToSelection (loading initial state from passed rowHeightsOptions)', () => {
        test('auto', () => {
          const component = mount(
            <MockComponent rowHeightsOptions={{ defaultHeight: 'auto' }} />
          );
          openPopover(component);
          expect(getSelection(component)).toEqual('auto');
        });

        test('lineCount', () => {
          const component = mount(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 3 } }}
            />
          );
          openPopover(component);
          expect(getSelection(component)).toEqual('lineCount');
        });

        test('undefined', () => {
          const component = mount(
            <MockComponent rowHeightsOptions={undefined} />
          );
          openPopover(component);
          expect(getSelection(component)).toEqual('undefined');
        });

        test('height should not select any buttons', () => {
          const component1 = mount(
            <MockComponent rowHeightsOptions={{ defaultHeight: 36 }} />
          );
          openPopover(component1);
          expect(getSelection(component1)).toEqual('');

          const component2 = mount(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { height: 36 } }}
            />
          );
          openPopover(component2);
          expect(getSelection(component2)).toEqual('');
        });
      });

      describe('lineCount', () => {
        const getLineCountNumber = (component: ReactWrapper) =>
          component
            .find('EuiRange[data-test-subj="lineCountNumber"]')
            .prop('value');
        const setLineCountNumber = (component: ReactWrapper, number: number) =>
          component
            .find('input[type="range"][data-test-subj="lineCountNumber"]')
            .simulate('change', { target: { value: number } });

        it('conditionally displays a line count number input when the lineCount button is selected', () => {
          const component = mount(<MockComponent />);
          openPopover(component);
          expect(
            component.find('[data-test-subj="lineCountNumber"]').exists()
          ).toBe(false);

          component.find('[data-test-subj="lineCount"]').simulate('change');
          expect(getSelection(component)).toEqual('lineCount');

          expect(
            component.find('[data-test-subj="lineCountNumber"]').exists()
          ).toBe(true);
        });

        it('displays the defaultHeight.lineCount passed in by the developer', () => {
          const component = mount(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 5 } }}
            />
          );
          openPopover(component);

          expect(getLineCountNumber(component)).toEqual(5);
        });

        it('defaults to a lineCount of 2 when no developer settings have been passed', () => {
          const component = mount(<MockComponent />);
          openPopover(component);
          component.find('[data-test-subj="lineCount"]').simulate('change');

          expect(getLineCountNumber(component)).toEqual(2);
        });

        it('increments the rowHeightOptions line count number', () => {
          const component = mount(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 1 } }}
            />
          );
          openPopover(component);

          setLineCountNumber(component, 3);
          expect(getLineCountNumber(component)).toEqual(3);
        });

        it('does not allow zero or negative line count values', () => {
          const component = mount(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 2 } }}
            />
          );
          openPopover(component);

          setLineCountNumber(component, 0);
          expect(getLineCountNumber(component)).toEqual(2);

          setLineCountNumber(component, -50);
          expect(getLineCountNumber(component)).toEqual(2);
        });
      });
    });
  });

  describe('gridStyles', () => {
    it('returns an object of grid styles with user overrides', () => {
      const initialStyles = { ...startingStyles, stripes: true };
      const MockComponent = () => {
        const [, gridStyles] = useDataGridDisplaySelector(
          true,
          initialStyles,
          {}
        );
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

  describe('rowHeightsOptions', () => {
    // Test helpers
    const MockComponent = ({
      initialRowHeightsOptions = undefined as
        | EuiDataGridRowHeightsOptions
        | undefined,
    }) => {
      const [displaySelector, , rowHeightsOptions] = useDataGridDisplaySelector(
        true,
        {},
        initialRowHeightsOptions
      );
      return (
        <>
          {displaySelector}
          <div data-test-subj="output">{JSON.stringify(rowHeightsOptions)}</div>
        </>
      );
    };
    const diveIntoEuiI18n = (component: ShallowWrapper) => {
      return (component
        .find('EuiI18n')
        .last()
        .renderProp('children') as Function)(['', '', '', '']);
    };
    const setRowHeight = (component: ShallowWrapper, selection = '') => {
      diveIntoEuiI18n(component)
        .find('[data-test-subj="rowHeightButtonGroup"]')
        .simulate('change', selection);
    };
    const setLineCount = (component: ShallowWrapper, lineCount = 1) => {
      diveIntoEuiI18n(component)
        .find('[data-test-subj="lineCountNumber"]')
        .simulate('change', { target: { value: lineCount } });
    };
    const getOutput = (component: ShallowWrapper) => {
      return JSON.parse(component.find('[data-test-subj="output"]').text());
    };

    describe('returns an object of rowHeightsOptions with user overrides', () => {
      it('overrides `rowHeights` and `defaultHeight`', () => {
        const component = shallow(
          <MockComponent
            initialRowHeightsOptions={{
              rowHeights: { 0: 100 },
              defaultHeight: 50,
            }}
          />
        );

        setRowHeight(component, 'undefined');

        expect(getOutput(component)).toEqual({
          rowHeights: {},
          defaultHeight: undefined,
        });
      });

      it('does not override other rowHeightsOptions properties', () => {
        const component = shallow(
          <MockComponent initialRowHeightsOptions={{ lineHeight: '2em' }} />
        );

        setRowHeight(component, 'lineCount');
        setLineCount(component, 5);

        expect(getOutput(component)).toEqual({
          lineHeight: '2em',
          defaultHeight: { lineCount: 5 },
          rowHeights: {},
        });
      });
    });

    it('handles undefined initialRowHeightsOptions', () => {
      const component = shallow(
        <MockComponent initialRowHeightsOptions={undefined} />
      );
      expect(getOutput(component)).toEqual({});

      setRowHeight(component, 'auto');

      expect(getOutput(component)).toEqual({
        defaultHeight: 'auto',
        rowHeights: {},
      });
    });
  });
});
