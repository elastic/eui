/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import {
  renderHook,
  render,
  screen,
  waitForEuiPopoverClose,
  waitForEuiPopoverOpen,
} from '../../../test/rtl';
import { keys } from '../../../services';

import {
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridRowHeightsOptions,
} from '../data_grid_types';

import { useDataGridDisplaySelector, startingStyles } from './display_selector';
import userEvent from '@testing-library/user-event';

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
      it('renders row height buttons that toggle betwen undefined, auto, and lineCount', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent />
        );

        openPopover(container);
        expect(
          baseElement.querySelector('[data-test-subj="lineCountNumber"]')
        ).not.toBeInTheDocument();

        await waitFor(() => {
          userEvent.click(getByTestSubject('auto'));
        });

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'auto'
        );
      });

      it('calls the rowHeightsOptions.onChange callback on user change', async () => {
        const onRowHeightChange = jest.fn();
        const { container, getByTestSubject } = render(
          <MockComponent
            rowHeightsOptions={{ lineHeight: '3', onChange: onRowHeightChange }}
          />
        );

        openPopover(container);
        await waitFor(() => {
          userEvent.click(getByTestSubject('auto'));
        });

        expect(onRowHeightChange).toHaveBeenCalledWith({
          rowHeights: {},
          defaultHeight: 'auto',
          lineHeight: '3',
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
      });

      describe('convertRowHeightsOptionsToSelection', () => {
        test('auto', () => {
          const { container, baseElement } = render(
            <MockComponent rowHeightsOptions={{ defaultHeight: 'auto' }} />
          );
          openPopover(container);

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
            'auto'
          );
        });

        test('lineCount', () => {
          const { container, baseElement } = render(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 3 } }}
            />
          );
          openPopover(container);

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
            'lineCount'
          );
        });

        test('undefined', () => {
          const { container, baseElement } = render(
            <MockComponent rowHeightsOptions={undefined} />
          );
          openPopover(container);

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
            'undefined'
          );
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
        const { container, baseElement, rerender } = render(
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
          'lineCount'
        );
      });

      it('correctly resets row height to initial developer-passed state', async () => {
        const { container, baseElement, getByTestSubject } = render(
          <MockComponent rowHeightsOptions={{ defaultHeight: undefined }} />
        );
        openPopover(container);

        expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
          'undefined'
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
          'undefined'
        );
      });

      describe('lineCount', () => {
        const getLineCountNumber = (element: HTMLElement) =>
          element
            .querySelector(
              'input[type="range"][data-test-subj="lineCountNumber"]'
            )!
            .getAttribute('value');

        const setLineCountNumber = (element: HTMLElement, number: number) => {
          const input = element.querySelector(
            'input[type="range"][data-test-subj="lineCountNumber"]'
          ) as HTMLInputElement;

          fireEvent.input(input, { target: { value: number.toString() } });
        };

        it('conditionally displays a line count number input when the lineCount button is selected', async () => {
          const { container, baseElement, getByTestSubject } = render(
            <MockComponent />
          );
          openPopover(container);

          expect(
            baseElement.querySelector('[data-test-subj="lineCountNumber"]')
          ).not.toBeInTheDocument();

          await waitFor(() => {
            userEvent.click(getByTestSubject('lineCount'));
          });

          expect(getSelection(baseElement, 'rowHeightButtonGroup')).toEqual(
            'lineCount'
          );

          expect(
            baseElement.querySelector('[data-test-subj="lineCountNumber"]')
          ).toBeInTheDocument();
        });

        it('displays the defaultHeight.lineCount passed in by the developer', () => {
          const { container, baseElement } = render(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 5 } }}
            />
          );
          openPopover(container);

          expect(getLineCountNumber(baseElement)).toEqual('5');
        });

        it('defaults to a lineCount of 2 when no developer settings have been passed', async () => {
          const { container, baseElement, getByTestSubject } = render(
            <MockComponent />
          );
          openPopover(container);

          await waitFor(() => userEvent.click(getByTestSubject('lineCount')));

          expect(getLineCountNumber(baseElement)).toEqual('2');
        });

        it('increments the rowHeightOptions line count number', () => {
          const { container, baseElement } = render(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 1 } }}
            />
          );
          openPopover(container);

          setLineCountNumber(baseElement, 3);

          expect(getLineCountNumber(baseElement)).toEqual('3');
        });

        it('sets the min value for the text input if an invalid number is passed', () => {
          const { container, baseElement } = render(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 2 } }}
            />
          );
          openPopover(container);

          const assertInvalidNumber = (value: number) => {
            setLineCountNumber(baseElement, value);

            const input = baseElement.querySelector(
              'input[type="number"]'
            ) as HTMLInputElement;

            expect(input.value).toEqual(input.min);
          };

          assertInvalidNumber(0);
          assertInvalidNumber(-50);
        });

        it('the text input is invalid and does not update the grid display if an invalid number is passed', () => {
          const onChange = jest.fn();

          const { container, baseElement } = render(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 2 }, onChange }}
            />
          );
          openPopover(container);

          const assertInvalidNumber = (value: number) => {
            const input = baseElement.querySelector(
              'input[type="number"]'
            ) as HTMLInputElement;

            input.value = value.toString();
            expect(input.value).toEqual(value.toString());

            expect(input).toBeInvalid();
            expect(onChange).not.toHaveBeenCalled();
          };

          assertInvalidNumber(0);
          assertInvalidNumber(-50);
        });

        it('correctly resets lineCount to initial developer-passed state', async () => {
          const { container, baseElement, getByTestSubject } = render(
            <MockComponent
              rowHeightsOptions={{ defaultHeight: { lineCount: 3 } }}
            />
          );
          openPopover(container);
          expect(getLineCountNumber(baseElement)).toEqual('3');

          setLineCountNumber(baseElement, 5);
          expect(getLineCountNumber(baseElement)).toEqual('5');

          await waitFor(() =>
            userEvent.click(getByTestSubject('resetDisplaySelector'))
          );

          expect(getLineCountNumber(baseElement)).toEqual('3');
        });
      });
    });

    describe('reset button', () => {
      it('renders a reset button only when the user changes from the current settings', async () => {
        // const component = mount(<MockComponent gridStyles={startingStyles} />);
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

      it('hides the reset button even after changes if allowResetButton is false', async () => {
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

        // Should hide the reset button again after the popover was reopened
        closePopover(container);
        await waitForEuiPopoverClose();
        openPopover(container);
        await waitForEuiPopoverOpen();

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
        setRowHeight('undefined');
        expect(getOutput()).toEqual({
          rowHeights: {},
          defaultHeight: undefined,
        });
      });
      it('does not override other rowHeightsOptions properties', () => {
        render(
          <MockComponent initialRowHeightsOptions={{ lineHeight: '2em' }} />
        );
        setRowHeight('lineCount');
        expect(getOutput()).toEqual({
          lineHeight: '2em',
          defaultHeight: { lineCount: 2 },
          rowHeights: {},
        });
      });
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
