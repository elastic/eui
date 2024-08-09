/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';

import { DataGridFocusContext } from '../../utils/focus';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';

import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

describe('EuiDataGridHeaderCellWrapper', () => {
  const requiredProps = {
    id: 'someColumn',
    index: 0,
    hasActionsPopover: true,
    children: <button />,
  };

  const mountWithContext = (props = {}, isFocused = true) => {
    (mockFocusContext.onFocusUpdate as jest.Mock).mockImplementation(
      (_, callback) => callback(isFocused) // allows us to mock isFocused state
    );
    return mount(
      <DataGridFocusContext.Provider value={mockFocusContext}>
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
        hasActionsPopover={true}
        id="someColumn"
        index={0}
      >
        <div
          className="euiDataGridHeaderCell"
          data-gridcell-column-id="someColumn"
          data-gridcell-column-index={0}
          data-gridcell-row-index="-1"
          data-gridcell-visible-row-index="-1"
          data-test-subj="dataGridHeaderCell-someColumn"
          onFocus={[Function]}
          role="columnheader"
          style={{}}
          tabIndex={0}
        >
          <HandleInteractiveChildren
            cellEl={
              <div
                class="euiDataGridHeaderCell"
                data-gridcell-column-id="someColumn"
                data-gridcell-column-index="0"
                data-gridcell-row-index="-1"
                data-gridcell-visible-row-index="-1"
                data-test-subj="dataGridHeaderCell-someColumn"
                role="columnheader"
                tabindex="0"
              >
                <div
                  data-focus-guard="true"
                  style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                  tabindex="-1"
                />
                <div
                  data-focus-lock-disabled="disabled"
                >
                  <button
                    data-euigrid-tab-managed="true"
                    tabindex="-1"
                  />
                  <p
                    aria-live="assertive"
                    class="emotion-euiScreenReaderOnly"
                  >
                    Press the Enter key to interact with this cell's contents.
                  </p>
                </div>
                <div
                  data-focus-guard="true"
                  style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                  tabindex="-1"
                />
              </div>
            }
            onInteractiveChildrenFound={[Function]}
            renderFocusTrap={true}
            updateCellFocusContext={[Function]}
          >
            <FocusTrappedChildren
              cellEl={
                <div
                  class="euiDataGridHeaderCell"
                  data-gridcell-column-id="someColumn"
                  data-gridcell-column-index="0"
                  data-gridcell-row-index="-1"
                  data-gridcell-visible-row-index="-1"
                  data-test-subj="dataGridHeaderCell-someColumn"
                  role="columnheader"
                  tabindex="0"
                >
                  <div
                    data-focus-guard="true"
                    style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                    tabindex="-1"
                  />
                  <div
                    data-focus-lock-disabled="disabled"
                  >
                    <button
                      data-euigrid-tab-managed="true"
                      tabindex="-1"
                    />
                    <p
                      aria-live="assertive"
                      class="emotion-euiScreenReaderOnly"
                    >
                      Press the Enter key to interact with this cell's contents.
                    </p>
                  </div>
                  <div
                    data-focus-guard="true"
                    style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                    tabindex="-1"
                  />
                </div>
              }
            >
              <EuiFocusTrap
                clickOutsideDisables={true}
                disabled={true}
                onDeactivation={[Function]}
              >
                <EuiFocusTrapClass
                  clickOutsideDisables={true}
                  crossFrame={false}
                  disabled={true}
                  gapMode="padding"
                  noIsolation={true}
                  onDeactivation={[Function]}
                  returnFocus={true}
                  scrollLock={false}
                >
                  <ForwardRef
                    crossFrame={false}
                    enabled={false}
                    noIsolation={true}
                    onClickOutside={[Function]}
                    onDeactivation={[Function]}
                    returnFocus={true}
                    scrollLock={false}
                  >
                    <ForwardRef
                      crossFrame={false}
                      enabled={false}
                      noIsolation={true}
                      onClickOutside={[Function]}
                      onDeactivation={[Function]}
                      returnFocus={true}
                      scrollLock={false}
                      sideCar={[Function]}
                    >
                      <ForwardRef(FocusLockUI)
                        as={
                          {
                            "$$typeof": Symbol(react.forward_ref),
                            "classNames": {
                              "fullWidth": "width-before-scroll-bar",
                              "zeroRight": "right-scroll-bar-position",
                            },
                            "defaultProps": {
                              "enabled": true,
                              "inert": false,
                              "removeScrollBar": true,
                            },
                            "render": [Function],
                          }
                        }
                        autoFocus={true}
                        crossFrame={false}
                        disabled={true}
                        lockProps={
                          {
                            "allowPinchZoom": undefined,
                            "as": undefined,
                            "enabled": false,
                            "gapMode": undefined,
                            "inert": undefined,
                            "shards": undefined,
                            "sideCar": [Function],
                            "style": undefined,
                          }
                        }
                        noFocusGuards={false}
                        persistentFocus={false}
                        returnFocus={true}
                        sideCar={[Function]}
                      >
                        <div
                          data-focus-guard={true}
                          key="guard-first"
                          style={
                            {
                              "height": "0px",
                              "left": "1px",
                              "overflow": "hidden",
                              "padding": 0,
                              "position": "fixed",
                              "top": "1px",
                              "width": "1px",
                            }
                          }
                          tabIndex={-1}
                        />
                        <ForwardRef
                          data-focus-lock-disabled="disabled"
                          enabled={false}
                          inert={false}
                          onBlur={[Function]}
                          onFocus={[Function]}
                          removeScrollBar={true}
                          sideCar={[Function]}
                        >
                          <div
                            data-focus-lock-disabled="disabled"
                            onBlur={[Function]}
                            onFocus={[Function]}
                            onScrollCapture={[Function]}
                            onTouchMoveCapture={[Function]}
                            onWheelCapture={[Function]}
                          >
                            <button />
                            <EuiScreenReaderOnly>
                              <p
                                aria-live="assertive"
                                css="unknown styles"
                                key="null"
                              >
                                <Insertion
                                  cache={
                                    {
                                      "insert": [Function],
                                      "inserted": {
                                        "gb1zbv-euiScreenReaderOnly": true,
                                      },
                                      "key": "css",
                                      "nonce": undefined,
                                      "registered": {},
                                      "sheet": StyleSheet {
                                        "_alreadyInsertedOrderInsensitiveRule": true,
                                        "_insertTag": [Function],
                                        "before": null,
                                        "container": <head>
                                          <style
                                            data-emotion="css"
                                            data-s=""
                                          >
                                            
                                            .emotion-euiScreenReaderOnly{position:absolute;inset-block-start:auto;inset-inline-start:-10000px;inline-size:1px;block-size:1px;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;margin:-1px;}
                                          </style>
                                        </head>,
                                        "ctr": 1,
                                        "insertionPoint": undefined,
                                        "isSpeedy": false,
                                        "key": "css",
                                        "nonce": undefined,
                                        "prepend": undefined,
                                        "tags": [
                                          <style
                                            data-emotion="css"
                                            data-s=""
                                          >
                                            
                                            .emotion-euiScreenReaderOnly{position:absolute;inset-block-start:auto;inset-inline-start:-10000px;inline-size:1px;block-size:1px;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;margin:-1px;}
                                          </style>,
                                        ],
                                      },
                                    }
                                  }
                                  isStringTag={true}
                                  serialized={
                                    {
                                      "map": undefined,
                                      "name": "gb1zbv-euiScreenReaderOnly",
                                      "next": undefined,
                                      "styles": ";
        /* Take the element out of the layout */
        position: absolute;
        /* Keep it vertically inline */
        inset-block-start: auto;
        /* Chrome requires a left value, and Selenium (used by Kibana's FTR) requires an off-screen position for its .getVisibleText() to not register SR-only text */
        inset-inline-start: -10000px;
        /* The element must have a size (for some screen readers) */
        
          inline-size: 1px;
          block-size: 1px;
        
        /* But reduce the visible size to nothing */
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        /* And ensure no overflows occur */
        overflow: hidden;
        /* Chrome requires the negative margin to not cause overflows of parent containers */
        margin: -1px;
      ;label:euiScreenReaderOnly;;;",
                                      "toString": [Function],
                                    }
                                  }
                                />
                                <p
                                  aria-live="assertive"
                                  className="emotion-euiScreenReaderOnly"
                                >
                                  <EuiI18n
                                    default="Press the Enter key to interact with this cell's contents."
                                    token="euiDataGridCell.focusTrapEnterPrompt"
                                  >
                                    Press the Enter key to interact with this cell's contents.
                                  </EuiI18n>
                                </p>
                              </p>
                            </EuiScreenReaderOnly>
                          </div>
                        </ForwardRef>
                        <div
                          data-focus-guard={true}
                          style={
                            {
                              "height": "0px",
                              "left": "1px",
                              "overflow": "hidden",
                              "padding": 0,
                              "position": "fixed",
                              "top": "1px",
                              "width": "1px",
                            }
                          }
                          tabIndex={-1}
                        />
                      </ForwardRef(FocusLockUI)>
                    </ForwardRef>
                  </ForwardRef>
                </EuiFocusTrapClass>
              </EuiFocusTrap>
            </FocusTrappedChildren>
          </HandleInteractiveChildren>
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
        data-gridcell-column-id="someColumn"
        data-gridcell-column-index={0}
        data-gridcell-row-index="-1"
        data-gridcell-visible-row-index="-1"
        data-test-subj="dataGridHeaderCell-someColumn"
        onFocus={[Function]}
        role="columnheader"
        style={
          {
            "width": "30px",
          }
        }
        tabIndex={0}
      >
        <HandleInteractiveChildren
          cellEl={
            <div
              aria-label="test"
              class="euiDataGridHeaderCell euiDataGridHeaderCell--test"
              data-gridcell-column-id="someColumn"
              data-gridcell-column-index="0"
              data-gridcell-row-index="-1"
              data-gridcell-visible-row-index="-1"
              data-test-subj="dataGridHeaderCell-someColumn"
              role="columnheader"
              style="width: 30px;"
              tabindex="0"
            >
              <div
                data-focus-guard="true"
                style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                tabindex="-1"
              />
              <div
                data-focus-lock-disabled="disabled"
              >
                <button
                  data-euigrid-tab-managed="true"
                  tabindex="-1"
                />
                <p
                  aria-live="assertive"
                  class="emotion-euiScreenReaderOnly"
                >
                  Press the Enter key to interact with this cell's contents.
                </p>
              </div>
              <div
                data-focus-guard="true"
                style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                tabindex="-1"
              />
            </div>
          }
          onInteractiveChildrenFound={[Function]}
          renderFocusTrap={true}
          updateCellFocusContext={[Function]}
        >
          <FocusTrappedChildren
            cellEl={
              <div
                aria-label="test"
                class="euiDataGridHeaderCell euiDataGridHeaderCell--test"
                data-gridcell-column-id="someColumn"
                data-gridcell-column-index="0"
                data-gridcell-row-index="-1"
                data-gridcell-visible-row-index="-1"
                data-test-subj="dataGridHeaderCell-someColumn"
                role="columnheader"
                style="width: 30px;"
                tabindex="0"
              >
                <div
                  data-focus-guard="true"
                  style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                  tabindex="-1"
                />
                <div
                  data-focus-lock-disabled="disabled"
                >
                  <button
                    data-euigrid-tab-managed="true"
                    tabindex="-1"
                  />
                  <p
                    aria-live="assertive"
                    class="emotion-euiScreenReaderOnly"
                  >
                    Press the Enter key to interact with this cell's contents.
                  </p>
                </div>
                <div
                  data-focus-guard="true"
                  style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
                  tabindex="-1"
                />
              </div>
            }
          >
            <EuiFocusTrap
              clickOutsideDisables={true}
              disabled={true}
              onDeactivation={[Function]}
            >
              <EuiFocusTrapClass
                clickOutsideDisables={true}
                crossFrame={false}
                disabled={true}
                gapMode="padding"
                noIsolation={true}
                onDeactivation={[Function]}
                returnFocus={true}
                scrollLock={false}
              >
                <ForwardRef
                  crossFrame={false}
                  enabled={false}
                  noIsolation={true}
                  onClickOutside={[Function]}
                  onDeactivation={[Function]}
                  returnFocus={true}
                  scrollLock={false}
                >
                  <ForwardRef
                    crossFrame={false}
                    enabled={false}
                    noIsolation={true}
                    onClickOutside={[Function]}
                    onDeactivation={[Function]}
                    returnFocus={true}
                    scrollLock={false}
                    sideCar={[Function]}
                  >
                    <ForwardRef(FocusLockUI)
                      as={
                        {
                          "$$typeof": Symbol(react.forward_ref),
                          "classNames": {
                            "fullWidth": "width-before-scroll-bar",
                            "zeroRight": "right-scroll-bar-position",
                          },
                          "defaultProps": {
                            "enabled": true,
                            "inert": false,
                            "removeScrollBar": true,
                          },
                          "render": [Function],
                        }
                      }
                      autoFocus={true}
                      crossFrame={false}
                      disabled={true}
                      lockProps={
                        {
                          "allowPinchZoom": undefined,
                          "as": undefined,
                          "enabled": false,
                          "gapMode": undefined,
                          "inert": undefined,
                          "shards": undefined,
                          "sideCar": [Function],
                          "style": undefined,
                        }
                      }
                      noFocusGuards={false}
                      persistentFocus={false}
                      returnFocus={true}
                      sideCar={[Function]}
                    >
                      <div
                        data-focus-guard={true}
                        key="guard-first"
                        style={
                          {
                            "height": "0px",
                            "left": "1px",
                            "overflow": "hidden",
                            "padding": 0,
                            "position": "fixed",
                            "top": "1px",
                            "width": "1px",
                          }
                        }
                        tabIndex={-1}
                      />
                      <ForwardRef
                        data-focus-lock-disabled="disabled"
                        enabled={false}
                        inert={false}
                        onBlur={[Function]}
                        onFocus={[Function]}
                        removeScrollBar={true}
                        sideCar={[Function]}
                      >
                        <div
                          data-focus-lock-disabled="disabled"
                          onBlur={[Function]}
                          onFocus={[Function]}
                          onScrollCapture={[Function]}
                          onTouchMoveCapture={[Function]}
                          onWheelCapture={[Function]}
                        >
                          <button />
                          <EuiScreenReaderOnly>
                            <p
                              aria-live="assertive"
                              css="unknown styles"
                              key="null"
                            >
                              <Insertion
                                cache={
                                  {
                                    "insert": [Function],
                                    "inserted": {
                                      "gb1zbv-euiScreenReaderOnly": true,
                                    },
                                    "key": "css",
                                    "nonce": undefined,
                                    "registered": {},
                                    "sheet": StyleSheet {
                                      "_alreadyInsertedOrderInsensitiveRule": true,
                                      "_insertTag": [Function],
                                      "before": null,
                                      "container": <head>
                                        <style
                                          data-emotion="css"
                                          data-s=""
                                        >
                                          
                                          .emotion-euiScreenReaderOnly{position:absolute;inset-block-start:auto;inset-inline-start:-10000px;inline-size:1px;block-size:1px;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;margin:-1px;}
                                        </style>
                                      </head>,
                                      "ctr": 1,
                                      "insertionPoint": undefined,
                                      "isSpeedy": false,
                                      "key": "css",
                                      "nonce": undefined,
                                      "prepend": undefined,
                                      "tags": [
                                        <style
                                          data-emotion="css"
                                          data-s=""
                                        >
                                          
                                          .emotion-euiScreenReaderOnly{position:absolute;inset-block-start:auto;inset-inline-start:-10000px;inline-size:1px;block-size:1px;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;margin:-1px;}
                                        </style>,
                                      ],
                                    },
                                  }
                                }
                                isStringTag={true}
                                serialized={
                                  {
                                    "map": undefined,
                                    "name": "gb1zbv-euiScreenReaderOnly",
                                    "next": undefined,
                                    "styles": ";
        /* Take the element out of the layout */
        position: absolute;
        /* Keep it vertically inline */
        inset-block-start: auto;
        /* Chrome requires a left value, and Selenium (used by Kibana's FTR) requires an off-screen position for its .getVisibleText() to not register SR-only text */
        inset-inline-start: -10000px;
        /* The element must have a size (for some screen readers) */
        
          inline-size: 1px;
          block-size: 1px;
        
        /* But reduce the visible size to nothing */
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        /* And ensure no overflows occur */
        overflow: hidden;
        /* Chrome requires the negative margin to not cause overflows of parent containers */
        margin: -1px;
      ;label:euiScreenReaderOnly;;;",
                                    "toString": [Function],
                                  }
                                }
                              />
                              <p
                                aria-live="assertive"
                                className="emotion-euiScreenReaderOnly"
                              >
                                <EuiI18n
                                  default="Press the Enter key to interact with this cell's contents."
                                  token="euiDataGridCell.focusTrapEnterPrompt"
                                >
                                  Press the Enter key to interact with this cell's contents.
                                </EuiI18n>
                              </p>
                            </p>
                          </EuiScreenReaderOnly>
                        </div>
                      </ForwardRef>
                      <div
                        data-focus-guard={true}
                        style={
                          {
                            "height": "0px",
                            "left": "1px",
                            "overflow": "hidden",
                            "padding": 0,
                            "position": "fixed",
                            "top": "1px",
                            "width": "1px",
                          }
                        }
                        tabIndex={-1}
                      />
                    </ForwardRef(FocusLockUI)>
                  </ForwardRef>
                </ForwardRef>
              </EuiFocusTrapClass>
            </EuiFocusTrap>
          </FocusTrappedChildren>
        </HandleInteractiveChildren>
      </div>
    `);
  });

  // Focus behavior tested in `focus_utils.spec.tsx`
});
