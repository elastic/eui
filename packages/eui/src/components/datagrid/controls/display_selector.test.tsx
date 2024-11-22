/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  renderHook,
  render,
  screen,
  waitForEuiPopoverClose,
  waitForEuiPopoverOpen,
} from '../../../test/rtl';
import { testOnReactVersion } from '../../../test/internal';
import { keys } from '../../../services';

import {
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridDisplaySelectorCustomRender,
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
    const openPopover = (element: HTMLElement) => {
      const trigger = Array.from(
        element.querySelectorAll(
          '[data-test-subj="dataGridDisplaySelectorButton"]'
        )
      ).reverse()[0];

      act(() => userEvent.click(trigger));
    };

    const closePopover = (element: HTMLElement) => {
      const popover = element.querySelector(
        '[data-test-subj="dataGridDisplaySelectorPopover"]'
      )!;

      act(() => {
        fireEvent.keyDown(popover, { key: keys.ESCAPE });
      });
    };

    const getSelection = (element: HTMLElement, groupId: string) => {
      const selection = element.querySelector(
        `[data-test-subj="${groupId}"] [aria-pressed="true"]`
      );

      return selection ? selection.getAttribute('data-test-subj') : null;
    };

    it('renders a toolbar button/popover allowing users to customize display settings', () => {
      const { getByTestSubject, baseElement } = render(<MockComponent />);
      fireEvent.click(getByTestSubject('dataGridDisplaySelectorButton'));
      expect(baseElement).toMatchSnapshot();
    });

    it('does not render if all valid sub-options are disabled', () => {
      const { container } = render(
        <MockComponent
          showDisplaySelector={{
            allowDensity: false,
            allowRowHeight: false,
          }}
        />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('allows consumers to customize render order via a render prop', () => {
      const customRender: EuiDataGridDisplaySelectorCustomRender = ({
        densityControl,
        rowHeightControl,
      }) => {
        return (
          <div data-test-subj="customRender">
            <div>Hello world</div>
            {densityControl}
            <div>Mock custom control</div>
            {rowHeightControl}
          </div>
        );
      };
      const { getByTestSubject } = render(
        <MockComponent showDisplaySelector={{ customRender }} />
      );
      fireEvent.click(getByTestSubject('dataGridDisplaySelectorButton'));
      expect(getByTestSubject('customRender')).toContainHTML(
        'Mock custom control'
      );
      expect(getByTestSubject('customRender')).toMatchSnapshot();
    });

    describe('density', () => {
      it('renders display density buttons that change grid density on click', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent />
        );
        openPopover(container);

        await waitFor(() => {
          userEvent.click(getByTestSubject('expanded'));
        });
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'expanded'
        );

        await waitFor(() => {
          userEvent.click(getByTestSubject('normal'));
        });
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'normal'
        );

        await waitFor(() => {
          userEvent.click(getByTestSubject('compact'));
        });
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'compact'
        );
      });

      it('calls the gridStyles.onDensityChange callback on user change', async () => {
        const onDensityChange = jest.fn();
        const { container, getByTestSubject } = render(
          <MockComponent
            gridStyles={{ stripes: true, onChange: onDensityChange }}
          />
        );

        openPopover(container);

        await waitFor(() => {
          userEvent.click(getByTestSubject('expanded'));
        });

        expect(onDensityChange).toHaveBeenCalledWith({
          stripes: true,
          fontSize: 'l',
          cellPadding: 'l',
        });
      });
    });

    it('hides the density buttongroup if allowDensity is set to false', () => {
      const { container, baseElement } = render(
        <MockComponent showDisplaySelector={{ allowDensity: false }} />
      );
      openPopover(container);

      expect(
        baseElement.querySelector('[data-test-subj="densityButtonGroup"]')
      ).not.toBeInTheDocument();
    });

    describe('convertGridStylesToSelection', () => {
      it('should set compact state if both fontSize and cellPadding are s', () => {
        const { container, baseElement } = render(
          <MockComponent gridStyles={{ fontSize: 's', cellPadding: 's' }} />
        );
        openPopover(container);
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'compact'
        );
      });

      it('should set normal state if both fontSize and cellPadding are m', () => {
        const { container, baseElement } = render(
          <MockComponent gridStyles={{ fontSize: 'm', cellPadding: 'm' }} />
        );
        openPopover(container);
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'normal'
        );
      });

      it('should set compact state if both fontSize and cellPadding are l', () => {
        const { container, baseElement } = render(
          <MockComponent gridStyles={{ fontSize: 'l', cellPadding: 'l' }} />
        );
        openPopover(container);
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'expanded'
        );
      });

      it('should not select any buttons if fontSize and cellPadding do not match a set density state', () => {
        const { container, baseElement } = render(
          <MockComponent gridStyles={{ fontSize: 'l', cellPadding: 's' }} />
        );
        openPopover(container);
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(null);
      });

      it('updates grid density whenever new developer styles are passed in', () => {
        const { container, baseElement, rerender } = render(
          <MockComponent gridStyles={{ fontSize: 'l', cellPadding: 'l' }} />
        );
        openPopover(container);
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'expanded'
        );

        rerender(
          <MockComponent gridStyles={{ fontSize: 's', cellPadding: 's' }} />
        );

        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'compact'
        );
      });

      it('correctly resets density to initial developer-passed state', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent gridStyles={{ fontSize: 'l', cellPadding: 'l' }} />
        );
        openPopover(container);
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'expanded'
        );

        await waitFor(() => {
          userEvent.click(getByTestSubject('compact'));
        });
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'compact'
        );

        await waitFor(() => {
          userEvent.click(getByTestSubject('resetDisplaySelector'));
        });
        expect(getSelection(baseElement, 'densityButtonGroup')).toEqual(
          'expanded'
        );
      });
    });

    describe('row height', () => {
      it('renders auto/static row height buttons and a lineCount input', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent />
        );
        openPopover(container);

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'static'
        );
        expect(getByTestSubject('static')).toHaveTextContent('Static');
        expect(getByTestSubject('lineCountNumber')).toHaveValue(1);
      });

      it('renders a "Max" label instead of "Static" if autoBelowLineCount is true', async () => {
        const { container, getByTestSubject } = render(
          <MockComponent rowHeightsOptions={{ autoBelowLineCount: true }} />
        );
        openPopover(container);

        expect(getByTestSubject('static')).toHaveTextContent('Max');
      });

      it('calls the rowHeightsOptions.onChange callback on user change', async () => {
        const onRowHeightChange = jest.fn();
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent
            rowHeightsOptions={{ lineHeight: '3', onChange: onRowHeightChange }}
          />
        );
        openPopover(container);

        // line count
        fireEvent.change(getByTestSubject('lineCountNumber'), {
          target: { value: 2 },
        });
        expect(getByTestSubject('lineCountNumber')).toHaveValue(2);
        expect(onRowHeightChange).toHaveBeenCalledWith({
          lineHeight: '3',
          rowHeights: {},
          defaultHeight: { lineCount: 2 },
        });

        // undefined
        fireEvent.change(getByTestSubject('lineCountNumber'), {
          target: { value: 1 },
        });
        expect(onRowHeightChange).toHaveBeenCalledWith({
          lineHeight: '3',
          rowHeights: {},
          defaultHeight: undefined,
        });

        // auto
        await waitFor(() => {
          userEvent.click(getByTestSubject('auto'));
        });
        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'auto'
        );

        expect(onRowHeightChange).toHaveBeenCalledWith({
          lineHeight: '3',
          rowHeights: {},
          defaultHeight: 'auto',
        });
      });

      it('hides the row height buttongroup if allowRowHeight is set to false', () => {
        const { container, baseElement } = render(
          <MockComponent showDisplaySelector={{ allowRowHeight: false }} />
        );
        openPopover(container);

        expect(
          baseElement.querySelector('[data-test-subj="rowHeightButtonGroup"]')
        ).not.toBeInTheDocument();
        expect(
          baseElement.querySelector('[data-test-subj="lineCountNumber"]')
        ).not.toBeInTheDocument();
      });

      describe('convertRowHeightsOptionsToSelection', () => {
        test('auto', () => {
          const { container, baseElement, getByTestSubject } = render(
            <MockComponent rowHeightsOptions={{ defaultHeight: 'auto' }} />
          );
          openPopover(container);

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
            'auto'
          );
          expect(getByTestSubject('lineCountNumber')).toBeDisabled();
          expect(getByTestSubject('lineCountNumber')).toHaveValue(1);
        });

        test('lineCount', () => {
          const { container, baseElement, getByTestSubject } = render(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 3 } }}
            />
          );
          openPopover(container);

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
            'static'
          );
          expect(getByTestSubject('lineCountNumber')).not.toBeDisabled();
          expect(getByTestSubject('lineCountNumber')).toHaveValue(3);
        });

        test('undefined', () => {
          const { container, baseElement, getByTestSubject } = render(
            <MockComponent rowHeightsOptions={undefined} />
          );
          openPopover(container);

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
            'static'
          );
          expect(getByTestSubject('lineCountNumber')).not.toBeDisabled();
          expect(getByTestSubject('lineCountNumber')).toHaveValue(1);
        });

        test('height should not select any buttons', () => {
          const { container, baseElement } = render(
            <MockComponent rowHeightsOptions={{ defaultHeight: 36 }} />
          );
          openPopover(container);

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toBe(null);
        });
      });

      it('updates row height whenever new developer settings are passed in', () => {
        const { container, baseElement, getByTestSubject, rerender } = render(
          <MockComponent rowHeightsOptions={{ defaultHeight: 'auto' }} />
        );
        openPopover(container);

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'auto'
        );

        rerender(
          <MockComponent
            rowHeightsOptions={{ defaultHeight: { lineCount: 3 } }}
          />
        );

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'static'
        );
        expect(getByTestSubject('lineCountNumber')).toHaveValue(3);
      });

      it('correctly resets row height to initial developer-passed state', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent rowHeightsOptions={{ defaultHeight: undefined }} />
        );
        openPopover(container);

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'static'
        );

        await waitFor(() => {
          userEvent.click(getByTestSubject('auto'));
        });

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'auto'
        );

        await waitFor(() => {
          userEvent.click(getByTestSubject('resetDisplaySelector'));
        });

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'static'
        );
      });
    });

    describe('reset button', () => {
      it('renders a reset button only when the user changes from the current settings', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent gridStyles={startingStyles} />
        );
        openPopover(container);
        expect(
          container.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).not.toBeInTheDocument();

        await waitFor(() => {
          userEvent.click(getByTestSubject('expanded'));
          userEvent.click(getByTestSubject('auto'));
        });

        expect(
          baseElement.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).toBeInTheDocument();

        // Should show the reset button again after the popover was reopened
        closePopover(container);
        await waitForEuiPopoverClose();
        openPopover(container);
        await waitForEuiPopoverOpen();

        expect(
          baseElement.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).toBeInTheDocument();

        // Should hide the reset button again after it's been clicked
        await waitFor(() => {
          userEvent.click(getByTestSubject('resetDisplaySelector'));
        });
        expect(
          baseElement.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).not.toBeInTheDocument();
      });

      it('hides the reset button if the user changes display settings back to the initial settings', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent gridStyles={startingStyles} />
        );
        openPopover(container);

        await waitFor(() => {
          userEvent.click(getByTestSubject('expanded'));
          userEvent.click(getByTestSubject('auto'));
        });

        expect(
          baseElement.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).toBeInTheDocument();

        await waitFor(() => {
          userEvent.click(getByTestSubject('normal'));
          userEvent.click(getByTestSubject('static'));
        });

        expect(
          container.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).not.toBeInTheDocument();
      });

      it('does not render the reset button if allowResetButton is false', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent
            showDisplaySelector={{
              allowResetButton: false,
            }}
            gridStyles={startingStyles}
          />
        );
        openPopover(container);
        expect(
          baseElement.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).not.toBeInTheDocument();

        await waitFor(() => {
          userEvent.click(getByTestSubject('expanded'));
          userEvent.click(getByTestSubject('auto'));
        });
        expect(
          baseElement.querySelector('[data-test-subj="resetDisplaySelector"]')
        ).not.toBeInTheDocument();
      });
    });

    describe('additionalDisplaySettings', () => {
      it('renders custom content if additionalDisplaySettings is defined', () => {
        const { container, getByTestSubject } = render(
          <MockComponent
            showDisplaySelector={{
              additionalDisplaySettings: (
                <div data-test-subj="test-custom">Custom content</div>
              ),
            }}
          />
        );
        openPopover(container);
        expect(getByTestSubject('test-custom')).toMatchInlineSnapshot(`
                <div
                  data-test-subj="test-custom"
                >
                  Custom content
                </div>
              `);
      });
    });
  });

  describe('gridStyles', () => {
    it('returns an object of grid styles with user overrides', () => {
      const initialStyles = { ...startingStyles, stripes: true };
      const [, gridStyles] = renderHook(() =>
        useDataGridDisplaySelector(true, initialStyles, {})
      ).result.current;
      expect(gridStyles).toMatchInlineSnapshot(`
              {
                "border": "all",
                "cellPadding": "m",
                "fontSize": "m",
                "footer": "overline",
                "header": "shade",
                "rowHover": "highlight",
                "stickyFooter": true,
                "stripes": true,
              }
            `);
    });

    it('updates gridStyles when consumers pass in new settings', () => {
      const { result, rerender } = renderHook(
        ({ gridStyles }) => useDataGridDisplaySelector(true, gridStyles),
        { initialProps: { gridStyles: startingStyles } }
      );
      expect(result.current[1].border).toEqual('all');

      rerender({ gridStyles: { ...startingStyles, border: 'none' } });
      expect(result.current[1].border).toEqual('none');
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
    const setRowHeight = (buttonGroupId: string) => {
      fireEvent.click(screen.getByTestSubject('dataGridDisplaySelectorButton'));
      waitForEuiPopoverOpen();
      fireEvent.click(screen.getByTestSubject(buttonGroupId));
    };
    const getOutput = () => {
      return JSON.parse(screen.getByTestSubject('output').textContent!);
    };

    describe('returns an object of rowHeightsOptions with user overrides', () => {
      it('overrides `rowHeights` and `defaultHeight`', () => {
        render(
          <MockComponent
            initialRowHeightsOptions={{
              rowHeights: { 0: 100 },
              defaultHeight: 50,
            }}
          />
        );
        setRowHeight('static');
        expect(getOutput()).toEqual({
          rowHeights: {},
          defaultHeight: undefined,
        });
      });

      it('does not override other rowHeightsOptions properties', () => {
        render(
          <MockComponent initialRowHeightsOptions={{ lineHeight: '2em' }} />
        );
        setRowHeight('auto');
        expect(getOutput()).toEqual({
          lineHeight: '2em',
          defaultHeight: 'auto',
          rowHeights: {},
        });
      });

      // Skipping React 16/17. For some reason, this test succeeds when run with `.only`
      // but fails when run with the rest of the tests in this describe block 🤷
      testOnReactVersion('18')(
        'updates rowHeightsOptions when consumers pass in new settings',
        () => {
          const initialRowHeightsOptions: EuiDataGridRowHeightsOptions = {
            defaultHeight: 'auto',
          };
          const { result, rerender } = renderHook(
            ({ rowHeightsOptions }) =>
              useDataGridDisplaySelector(
                true,
                startingStyles,
                rowHeightsOptions
              ),
            { initialProps: { rowHeightsOptions: initialRowHeightsOptions } }
          );
          expect(result.current[2].defaultHeight).toEqual('auto');

          rerender({ rowHeightsOptions: { defaultHeight: { lineCount: 2 } } });
          expect(result.current[2].defaultHeight).toEqual({ lineCount: 2 });
        }
      );
    });

    it('handles undefined initialRowHeightsOptions', () => {
      render(<MockComponent initialRowHeightsOptions={undefined} />);
      expect(getOutput()).toEqual({});

      setRowHeight('auto');

      expect(getOutput()).toEqual({
        defaultHeight: 'auto',
        rowHeights: {},
      });
    });
  });
});
