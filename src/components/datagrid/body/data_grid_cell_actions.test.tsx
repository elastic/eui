/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { render } from '../../../test/rtl';

import { EuiDataGridColumnCellAction } from '../data_grid_types';
import {
  EuiDataGridCellActions,
  EuiDataGridCellPopoverActions,
} from './data_grid_cell_actions';

const MockAction: EuiDataGridColumnCellAction = ({ Component }) => (
  <Component iconType="starEmpty" data-test-subj="mockCellAction" />
);

describe('EuiDataGridCellActions', () => {
  const requiredProps = {
    onExpandClick: jest.fn(),
    rowIndex: 0,
    colIndex: 0,
    cellHeightType: 'default',
  };

  it('renders an expand button', () => {
    const component = mount(<EuiDataGridCellActions {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <EuiDataGridCellActions
        cellHeightType="default"
        colIndex={0}
        onExpandClick={[MockFunction]}
        rowIndex={0}
      >
        <div
          className="euiDataGridRowCell__actions"
        >
          <ExpandButton
            onExpandClick={[MockFunction]}
          >
            <EuiI18n
              default="Click or hit enter to interact with cell content"
              key="expand"
              token="euiDataGridCellActions.expandButtonTitle"
            >
              <EuiButtonIcon
                aria-hidden={true}
                className="euiDataGridRowCell__actionButtonIcon"
                color="primary"
                data-test-subj="euiDataGridCellExpandButton"
                display="fill"
                iconSize="s"
                iconType="expandMini"
                onClick={[MockFunction]}
                title="Click or hit enter to interact with cell content"
              >
                <button
                  aria-hidden={true}
                  css="unknown styles"
                  data-test-subj="euiDataGridCellExpandButton"
                  disabled={false}
                  onClick={[MockFunction]}
                  tabIndex={-1}
                  title="Click or hit enter to interact with cell content"
                  type="button"
                >
                  <Insertion
                    cache={
                      Object {
                        "insert": [Function],
                        "inserted": Object {
                          "wkdoi2-euiButtonIcon-xs-fill-primary": true,
                        },
                        "key": "css",
                        "nonce": undefined,
                        "registered": Object {},
                        "sheet": StyleSheet {
                          "_alreadyInsertedOrderInsensitiveRule": true,
                          "_insertTag": [Function],
                          "before": null,
                          "container": <head>
                            <style
                              data-emotion="css"
                              data-s=""
                            >
                              
                              .emotion-euiButtonIcon-xs-fill-primary{display:inline-block;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;cursor:pointer;white-space:nowrap;max-inline-size:100%;vertical-align:middle;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:space-around;-ms-flex-pack:space-around;-webkit-justify-content:space-around;justify-content:space-around;inline-size:24px;block-size:24px;border-radius:4px;color:#FFF;background-color:#07C;outline-color:#000;}
                            </style>
                            <style
                              data-emotion="css"
                              data-s=""
                            >
                              
                              .emotion-euiButtonIcon-xs-fill-primary&gt;svg{pointer-events:none;}
                            </style>
                            <style
                              data-emotion="css"
                              data-s=""
                            >
                              
                              @media screen and (prefers-reduced-motion: no-preference){.emotion-euiButtonIcon-xs-fill-primary{-webkit-transition:-webkit-transform 250ms ease-in-out,background-color 250ms ease-in-out;transition:transform 250ms ease-in-out,background-color 250ms ease-in-out;}.emotion-euiButtonIcon-xs-fill-primary:hover:not(:disabled){-webkit-transform:translateY(-1px);-moz-transform:translateY(-1px);-ms-transform:translateY(-1px);transform:translateY(-1px);}.emotion-euiButtonIcon-xs-fill-primary:focus{-webkit-animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);}.emotion-euiButtonIcon-xs-fill-primary:active:not(:disabled){-webkit-transform:translateY(1px);-moz-transform:translateY(1px);-ms-transform:translateY(1px);transform:translateY(1px);}}
                            </style>
                          </head>,
                          "ctr": 3,
                          "insertionPoint": undefined,
                          "isSpeedy": false,
                          "key": "css",
                          "nonce": undefined,
                          "prepend": undefined,
                          "tags": Array [
                            <style
                              data-emotion="css"
                              data-s=""
                            >
                              
                              .emotion-euiButtonIcon-xs-fill-primary{display:inline-block;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;cursor:pointer;white-space:nowrap;max-inline-size:100%;vertical-align:middle;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:space-around;-ms-flex-pack:space-around;-webkit-justify-content:space-around;justify-content:space-around;inline-size:24px;block-size:24px;border-radius:4px;color:#FFF;background-color:#07C;outline-color:#000;}
                            </style>,
                            <style
                              data-emotion="css"
                              data-s=""
                            >
                              
                              .emotion-euiButtonIcon-xs-fill-primary&gt;svg{pointer-events:none;}
                            </style>,
                            <style
                              data-emotion="css"
                              data-s=""
                            >
                              
                              @media screen and (prefers-reduced-motion: no-preference){.emotion-euiButtonIcon-xs-fill-primary{-webkit-transition:-webkit-transform 250ms ease-in-out,background-color 250ms ease-in-out;transition:transform 250ms ease-in-out,background-color 250ms ease-in-out;}.emotion-euiButtonIcon-xs-fill-primary:hover:not(:disabled){-webkit-transform:translateY(-1px);-moz-transform:translateY(-1px);-ms-transform:translateY(-1px);transform:translateY(-1px);}.emotion-euiButtonIcon-xs-fill-primary:focus{-webkit-animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);}.emotion-euiButtonIcon-xs-fill-primary:active:not(:disabled){-webkit-transform:translateY(1px);-moz-transform:translateY(1px);-ms-transform:translateY(1px);transform:translateY(1px);}}
                            </style>,
                          ],
                        },
                      }
                    }
                    isStringTag={true}
                    serialized={
                      Object {
                        "map": undefined,
                        "name": "wkdoi2-euiButtonIcon-xs-fill-primary",
                        "next": undefined,
                        "styles": "
          display: inline-block;
          appearance: none;
          cursor: pointer;
          [object Object];
          white-space: nowrap;
          max-inline-size: 100%;;
          vertical-align: middle;
        display:inline-flex;align-items:center;justify-content:space-around;&>svg{pointer-events:none;};label:euiButtonIcon;;;
          inline-size: 24px;
          block-size: 24px;
         border-radius:4px;;label:xs;;;color:#FFF;background-color:#07C;outline-color:#000;;label:fill;;;label:primary;;;
          @media screen and (prefers-reduced-motion: no-preference) {
            transition: transform 250ms ease-in-out,
              background-color 250ms ease-in-out;

            &:hover:not(:disabled) {
              transform: translateY(-1px);
            }

            &:focus {
              animation: euiButtonActive 250ms
                cubic-bezier(.34, 1.61, .7, 1);
            }

            &:active:not(:disabled) {
              transform: translateY(1px);
            }
          }
        ;;;",
                        "toString": [Function],
                      }
                    }
                  />
                  <button
                    aria-hidden={true}
                    className="euiButtonIcon euiDataGridRowCell__actionButtonIcon emotion-euiButtonIcon-xs-fill-primary"
                    data-test-subj="euiDataGridCellExpandButton"
                    disabled={false}
                    onClick={[MockFunction]}
                    tabIndex={-1}
                    title="Click or hit enter to interact with cell content"
                    type="button"
                  >
                    <EuiIcon
                      aria-hidden="true"
                      className="euiButtonIcon__icon"
                      color="inherit"
                      size="s"
                      type="expandMini"
                    >
                      <span
                        aria-hidden="true"
                        className="euiButtonIcon__icon"
                        color="inherit"
                        data-euiicon-type="expandMini"
                        size="s"
                      />
                    </EuiIcon>
                  </button>
                </button>
              </EuiButtonIcon>
            </EuiI18n>
          </ExpandButton>
        </div>
      </EuiDataGridCellActions>
    `);
    const button: Function = component.find('EuiI18n').renderProp('children');
    expect(button('expandButtonTitle')).toMatchInlineSnapshot(`
      <Component>
        <EuiButtonIcon
          aria-hidden={true}
          className="euiDataGridRowCell__actionButtonIcon"
          color="primary"
          data-test-subj="euiDataGridCellExpandButton"
          display="fill"
          iconSize="s"
          iconType="expandMini"
          onClick={[MockFunction]}
          title="expandButtonTitle"
        >
          <button
            aria-hidden={true}
            css="unknown styles"
            data-test-subj="euiDataGridCellExpandButton"
            disabled={false}
            onClick={[MockFunction]}
            tabIndex={-1}
            title="expandButtonTitle"
            type="button"
          >
            <Insertion
              cache={
                Object {
                  "insert": [Function],
                  "inserted": Object {
                    "wkdoi2-euiButtonIcon-xs-fill-primary": true,
                  },
                  "key": "css",
                  "nonce": undefined,
                  "registered": Object {},
                  "sheet": StyleSheet {
                    "_alreadyInsertedOrderInsensitiveRule": true,
                    "_insertTag": [Function],
                    "before": null,
                    "container": <head>
                      <style
                        data-emotion="css"
                        data-s=""
                      >
                        
                        .emotion-euiButtonIcon-xs-fill-primary{display:inline-block;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;cursor:pointer;white-space:nowrap;max-inline-size:100%;vertical-align:middle;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:space-around;-ms-flex-pack:space-around;-webkit-justify-content:space-around;justify-content:space-around;inline-size:24px;block-size:24px;border-radius:4px;color:#FFF;background-color:#07C;outline-color:#000;}
                      </style>
                      <style
                        data-emotion="css"
                        data-s=""
                      >
                        
                        .emotion-euiButtonIcon-xs-fill-primary&gt;svg{pointer-events:none;}
                      </style>
                      <style
                        data-emotion="css"
                        data-s=""
                      >
                        
                        @media screen and (prefers-reduced-motion: no-preference){.emotion-euiButtonIcon-xs-fill-primary{-webkit-transition:-webkit-transform 250ms ease-in-out,background-color 250ms ease-in-out;transition:transform 250ms ease-in-out,background-color 250ms ease-in-out;}.emotion-euiButtonIcon-xs-fill-primary:hover:not(:disabled){-webkit-transform:translateY(-1px);-moz-transform:translateY(-1px);-ms-transform:translateY(-1px);transform:translateY(-1px);}.emotion-euiButtonIcon-xs-fill-primary:focus{-webkit-animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);}.emotion-euiButtonIcon-xs-fill-primary:active:not(:disabled){-webkit-transform:translateY(1px);-moz-transform:translateY(1px);-ms-transform:translateY(1px);transform:translateY(1px);}}
                      </style>
                    </head>,
                    "ctr": 3,
                    "insertionPoint": undefined,
                    "isSpeedy": false,
                    "key": "css",
                    "nonce": undefined,
                    "prepend": undefined,
                    "tags": Array [
                      <style
                        data-emotion="css"
                        data-s=""
                      >
                        
                        .emotion-euiButtonIcon-xs-fill-primary{display:inline-block;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;appearance:none;cursor:pointer;white-space:nowrap;max-inline-size:100%;vertical-align:middle;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:space-around;-ms-flex-pack:space-around;-webkit-justify-content:space-around;justify-content:space-around;inline-size:24px;block-size:24px;border-radius:4px;color:#FFF;background-color:#07C;outline-color:#000;}
                      </style>,
                      <style
                        data-emotion="css"
                        data-s=""
                      >
                        
                        .emotion-euiButtonIcon-xs-fill-primary&gt;svg{pointer-events:none;}
                      </style>,
                      <style
                        data-emotion="css"
                        data-s=""
                      >
                        
                        @media screen and (prefers-reduced-motion: no-preference){.emotion-euiButtonIcon-xs-fill-primary{-webkit-transition:-webkit-transform 250ms ease-in-out,background-color 250ms ease-in-out;transition:transform 250ms ease-in-out,background-color 250ms ease-in-out;}.emotion-euiButtonIcon-xs-fill-primary:hover:not(:disabled){-webkit-transform:translateY(-1px);-moz-transform:translateY(-1px);-ms-transform:translateY(-1px);transform:translateY(-1px);}.emotion-euiButtonIcon-xs-fill-primary:focus{-webkit-animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);animation:euiButtonActive 250ms cubic-bezier(.34, 1.61, .7, 1);}.emotion-euiButtonIcon-xs-fill-primary:active:not(:disabled){-webkit-transform:translateY(1px);-moz-transform:translateY(1px);-ms-transform:translateY(1px);transform:translateY(1px);}}
                      </style>,
                    ],
                  },
                }
              }
              isStringTag={true}
              serialized={
                Object {
                  "map": undefined,
                  "name": "wkdoi2-euiButtonIcon-xs-fill-primary",
                  "next": undefined,
                  "styles": "
          display: inline-block;
          appearance: none;
          cursor: pointer;
          [object Object];
          white-space: nowrap;
          max-inline-size: 100%;;
          vertical-align: middle;
        display:inline-flex;align-items:center;justify-content:space-around;&>svg{pointer-events:none;};label:euiButtonIcon;;;
          inline-size: 24px;
          block-size: 24px;
         border-radius:4px;;label:xs;;;color:#FFF;background-color:#07C;outline-color:#000;;label:fill;;;label:primary;;;
          @media screen and (prefers-reduced-motion: no-preference) {
            transition: transform 250ms ease-in-out,
              background-color 250ms ease-in-out;

            &:hover:not(:disabled) {
              transform: translateY(-1px);
            }

            &:focus {
              animation: euiButtonActive 250ms
                cubic-bezier(.34, 1.61, .7, 1);
            }

            &:active:not(:disabled) {
              transform: translateY(1px);
            }
          }
        ;;;",
                  "toString": [Function],
                }
              }
            />
            <button
              aria-hidden={true}
              className="euiButtonIcon euiDataGridRowCell__actionButtonIcon emotion-euiButtonIcon-xs-fill-primary"
              data-test-subj="euiDataGridCellExpandButton"
              disabled={false}
              onClick={[MockFunction]}
              tabIndex={-1}
              title="expandButtonTitle"
              type="button"
            >
              <EuiIcon
                aria-hidden="true"
                className="euiButtonIcon__icon"
                color="inherit"
                size="s"
                type="expandMini"
              >
                <span
                  aria-hidden="true"
                  className="euiButtonIcon__icon"
                  color="inherit"
                  data-euiicon-type="expandMini"
                  size="s"
                />
              </EuiIcon>
            </button>
          </button>
        </EuiButtonIcon>
      </Component>
    `);
  });

  it('renders cell actions as `EuiButtonIcon`s', () => {
    const component = shallow(
      <EuiDataGridCellActions
        {...requiredProps}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    const button = component.childAt(0).renderProp('Component');
    expect(button({ iconType: 'eye' })).toMatchInlineSnapshot(`
      <EuiButtonIcon
        aria-hidden={true}
        className="euiDataGridRowCell__actionButtonIcon"
        iconSize="s"
        iconType="eye"
      />
    `);
  });

  it('renders both cell actions and expand button', () => {
    const component = shallow(
      <EuiDataGridCellActions
        {...requiredProps}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRowCell__actions"
      >
        <MockAction
          Component={[Function]}
          colIndex={0}
          columnId="someId"
          isExpanded={false}
          key="0"
          rowIndex={0}
        />
        <ExpandButton
          onExpandClick={[MockFunction]}
        />
      </div>
    `);
  });

  it('renders with overlay positioning for non default height cells', () => {
    const { container } = render(
      <EuiDataGridCellActions {...requiredProps} cellHeightType="auto" />
    );

    // TODO: Switch to `.toHaveStyle({ position: 'absolute' })` once on Emotion
    expect(container.firstChild).toHaveClass(
      'euiDataGridRowCell__actions--overlay'
    );
  });

  describe('visible cell actions limit', () => {
    it('by default, does not render more than the first two primary cell actions', () => {
      const component = shallow(
        <EuiDataGridCellActions
          {...requiredProps}
          column={{
            id: 'someId',
            cellActions: [MockAction, MockAction, MockAction],
          }}
        />
      );

      expect(component.find('MockAction')).toHaveLength(2);
    });

    it('allows configuring the default number of visible cell actions', () => {
      const component = shallow(
        <EuiDataGridCellActions
          {...requiredProps}
          column={{
            id: 'someId',
            cellActions: [MockAction, MockAction, MockAction, MockAction],
            visibleCellActions: 3,
          }}
        />
      );

      expect(component.find('MockAction')).toHaveLength(3);
    });
  });
});

describe('EuiDataGridCellPopoverActions', () => {
  it('renders column cell actions as `EuiButtonEmpty`s', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <Fragment>
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="s"
            responsive={false}
            wrap={true}
          >
            <EuiFlexItem
              key="0"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
      </Fragment>
    `);

    const action = component.find('MockAction') as any;
    const button = action.renderProp('Component');
    expect(button({ iconType: 'function' })).toMatchInlineSnapshot(`
      <EuiButtonEmpty
        iconType="function"
        size="s"
      />
    `);
  });

  it('renders primary actions in their own footer, and all remaining secondary actions in a column footer', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{
          id: 'someId',
          cellActions: [MockAction, MockAction, MockAction],
        }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <Fragment>
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="s"
            responsive={false}
            wrap={true}
          >
            <EuiFlexItem
              key="0"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem
              key="1"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
        <EuiPopoverFooter>
          <EuiFlexGroup
            alignItems="flexStart"
            direction="column"
            gutterSize="s"
          >
            <EuiFlexItem
              key="0"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
      </Fragment>
    `);
  });

  it('uses visibleCellActions to configure the number of primary vs. secondary actions', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{
          id: 'someId',
          cellActions: [MockAction, MockAction, MockAction, MockAction],
          visibleCellActions: 3,
        }}
      />
    );

    expect(
      component.find('EuiPopoverFooter').first().find('MockAction')
    ).toHaveLength(3);
    expect(
      component.find('EuiPopoverFooter').last().find('MockAction')
    ).toHaveLength(1);
  });

  it('does not render anything if the column has no cell actions', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'noActions' }}
      />
    );

    expect(component).toMatchInlineSnapshot('<Fragment />');
  });
});
