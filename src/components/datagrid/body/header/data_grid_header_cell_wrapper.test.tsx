/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { keys } from '../../../../services';
import { DataGridFocusContext } from '../../data_grid_context';

import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

describe('EuiDataGridHeaderCellWrapper', () => {
  const requiredProps = {
    id: 'someColumn',
    index: 0,
    headerIsInteractive: true,
    children: <button data-euigrid-tab-managed="true" />,
  };

  const focusContext = {
    setFocusedCell: jest.fn(),
    onFocusUpdate: jest.fn(),
  };
  const mountWithContext = (props = {}, isFocused = true) => {
    (focusContext.onFocusUpdate as jest.Mock).mockImplementation(
      (_, callback) => callback(isFocused) // allows us to mock isFocused state
    );
    return mount(
      <DataGridFocusContext.Provider value={focusContext}>
        <EuiDataGridHeaderCellWrapper {...requiredProps} {...props} />
      </DataGridFocusContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mountWithContext();
    expect(component).toMatchInlineSnapshot(`
      <EuiDataGridHeaderCellWrapper
        headerIsInteractive={true}
        id="someColumn"
        index={0}
      >
        <div
          className="euiDataGridHeaderCell"
          data-test-subj="dataGridHeaderCell-someColumn"
          role="columnheader"
          style={Object {}}
          tabIndex={-1}
        >
          <button
            data-euigrid-tab-managed="true"
          />
        </div>
      </EuiDataGridHeaderCellWrapper>
    `);
  });

  it('renders width, className, and arbitrary props', () => {
    const component = mountWithContext({
      width: 30,
      className: 'euiDataGridHeaderCell--test',
      'aria-label': 'test',
    });
    expect(component.find('[data-test-subj="dataGridHeaderCell-someColumn"]'))
      .toMatchInlineSnapshot(`
      <div
        aria-label="test"
        className="euiDataGridHeaderCell euiDataGridHeaderCell--test"
        data-test-subj="dataGridHeaderCell-someColumn"
        role="columnheader"
        style={
          Object {
            "width": "30px",
          }
        }
        tabIndex={-1}
      >
        <button
          data-euigrid-tab-managed="true"
        />
      </div>
    `);
  });

  describe('focus behavior', () => {
    it('warns when a header cell contains multiple interactive children', () => {
      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementationOnce(() => {}); // Silence expected warning

      mountWithContext({
        children: (
          <div>
            <button data-euigrid-tab-managed="true" />
            <button data-euigrid-tab-managed="true" />
            <button data-euigrid-tab-managed="true" />
          </div>
        ),
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'EuiDataGridHeaderCell expects at most 1 tabbable element, 3 found instead'
      );
    });

    describe('events', () => {
      // Reusable assertions for DRYness
      const expectCellFocused = (headerCell: Element) => {
        expect(document.activeElement).toEqual(headerCell);
        expect(headerCell.getAttribute('tabIndex')).toEqual('0');
      };
      const expectCellChildrenFocused = (headerCell: Element) => {
        expect(document.activeElement).toEqual(
          headerCell.querySelector('[data-euigrid-tab-managed]')
        );
        expect(headerCell.getAttribute('tabIndex')).toEqual('-1');
      };
      const expectCellNotFocused = (headerCell: Element) => {
        expect(document.activeElement).toBeInstanceOf(HTMLBodyElement);
        expect(headerCell.getAttribute('tabIndex')).toEqual('-1');
      };

      describe('keyup', () => {
        test('enter key sets isCellEntered to true (which focuses the first interactive child in the header cell)', () => {
          const headerCell = mountWithContext().getDOMNode();
          act(() => {
            headerCell.dispatchEvent(
              new KeyboardEvent('keyup', { key: keys.ENTER })
            );
          });
          expectCellChildrenFocused(headerCell);
        });

        test('escape key sets isCellEntered to false and focuses the header cell div', () => {
          const headerCell = mountWithContext().getDOMNode();
          act(() => {
            headerCell.dispatchEvent(
              new KeyboardEvent('keyup', { key: keys.ESCAPE })
            );
          });
          expectCellFocused(headerCell);
        });

        test('F2 key toggles between cell child focus and cell focus', () => {
          const headerCell = mountWithContext().getDOMNode();
          act(() => {
            headerCell.dispatchEvent(
              new KeyboardEvent('keyup', { key: keys.F2 })
            );
          });
          expectCellFocused(headerCell);
          act(() => {
            headerCell.dispatchEvent(
              new KeyboardEvent('keyup', { key: keys.F2 })
            );
          });
          expectCellChildrenFocused(headerCell);
        });
      });

      describe('focus', () => {
        // Mock requestAnimationFrame
        beforeEach(() => {
          jest
            .spyOn(window, 'requestAnimationFrame')
            .mockImplementation((cb: Function) => cb());
        });
        afterEach(() => {
          jest.restoreAllMocks();
        });

        describe('when header is not interactive', () => {
          it('does not focus in on the cell', () => {
            const headerCell = mountWithContext(
              { headerIsInteractive: false },
              false
            ).getDOMNode();
            act(() => {
              headerCell.dispatchEvent(new FocusEvent('focusin'));
            });
            expectCellNotFocused(headerCell);
          });
        });

        describe('when header is interactive', () => {
          it('calls setFocusedCell when not already focused', () => {
            const headerCell = mountWithContext({}, false).getDOMNode();
            act(() => {
              headerCell.dispatchEvent(new FocusEvent('focusin'));
            });
            expect(focusContext.setFocusedCell).toHaveBeenCalled();
          });

          it('focuses the interactive cell children when present', () => {
            const headerCell = mountWithContext().getDOMNode();
            act(() => {
              headerCell.dispatchEvent(new FocusEvent('focusin'));
            });
            expectCellChildrenFocused(headerCell);
          });

          it('focuses the cell when no interactive children are present', () => {
            const headerCell = mountWithContext({
              children: <div />,
            }).getDOMNode();
            act(() => {
              headerCell.dispatchEvent(new FocusEvent('focusin'));
            });
            expectCellFocused(headerCell);
          });
        });

        describe('focus out', () => {
          it('waits for the cell/children to lose focus first', () => {
            const headerCell = mountWithContext({}, true).getDOMNode();
            act(() => {
              headerCell.dispatchEvent(new FocusEvent('focusin'));
            });
            expectCellChildrenFocused(headerCell);

            act(() => {
              headerCell.dispatchEvent(new FocusEvent('focusout'));
            });
            // Focus hasn't moved away yet
            expectCellChildrenFocused(headerCell);
          });

          it('sets isCellEntered to false once the cell/children are no longer focused', () => {
            const headerCell = mountWithContext({}, false).getDOMNode();

            // Slightly cheating the test setup here; headerCell starts out not focused
            expectCellNotFocused(headerCell);
            act(() => {
              headerCell.dispatchEvent(new FocusEvent('focusout'));
            });

            // Focus is lost & isCellCentered false should set children to tabIndex -1
            expect(headerCell.querySelector('[tabIndex="-1"]')).not.toBeNull();
            expect(headerCell.querySelector('[tabIndex="0"]')).toBeNull();
          });
        });
      });
    });
  });
});
