/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { render as rtlRender } from '../rtl';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiPageTemplate,
  EuiPageSection,
  EuiDataGrid,
} from '../../components';

import { euiRTLRenderSnapshotSerializer } from './rtl';
import {
  euiEnzymeShallowSnapshotSerializer,
  euiEnzymeMountSnapshotSerializer,
  euiEnzymeRenderSnapshotSerializer,
} from './enzyme';

describe('snapshot serializer that flattens rendered output', () => {
  expect.addSnapshotSerializer(euiRTLRenderSnapshotSerializer);
  expect.addSnapshotSerializer(euiEnzymeShallowSnapshotSerializer);
  expect.addSnapshotSerializer(euiEnzymeMountSnapshotSerializer);
  expect.addSnapshotSerializer(euiEnzymeRenderSnapshotSerializer);

  /* eslint-disable quotes */

  test('text only component', () => {
    const buttonTest = <EuiButton>Test</EuiButton>;
    expect(rtlRender(buttonTest).container.firstChild).toMatchInlineSnapshot(
      `<EuiButton>Test</EuiButton>`
    );
    expect(render(buttonTest)).toMatchInlineSnapshot(
      `<EuiButton>Test</EuiButton>`
    );
    expect(mount(buttonTest)).toMatchInlineSnapshot(`
      <EuiButton size="m" color="primary">
        <EuiButtonDisplay className="euiButton css-1yt0a74-base-primary" size="m">
          <EuiButtonDisplayContent isLoading={[undefined]} isDisabled={false} iconType={[undefined]} iconSide="left" iconSize={[undefined]} textProps={[undefined]}>
            <span className="css-1km4ln8-euiButtonDisplayContent">
              <span className="eui-textTruncate">
                Test
              </span>
            </span>
          </EuiButtonDisplayContent>
        </EuiButtonDisplay>
      </EuiButton>
    `);
    expect(shallow(buttonTest)).toMatchInlineSnapshot(`
      <EuiButton className="euiButton" size="m">
        Test
      </EuiButton>
    `);
  });

  test('medium component', () => {
    const containerTest = (
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <div>Hello</div>
          <button data-test-subj="consumerContent">World</button>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSpacer size="xl" />
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    expect(rtlRender(containerTest).container.firstChild)
      .toMatchInlineSnapshot(`
      <EuiFlexGroup>
        <EuiFlexItem>
          <div>
            Hello
          </div>
          <button
            data-test-subj="consumerContent"
          >
            World
          </button>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiSpacer />
        </EuiFlexItem>
      </EuiFlexGroup>
    `);
    expect(render(containerTest)).toMatchInlineSnapshot(`
      <EuiFlexGroup>
        <EuiFlexItem>
          <div>
            Hello
          </div>
          <button
            data-test-subj="consumerContent"
          >
            World
          </button>
          <div
            class="euiSpacer euiSpacer--xl emotion-euiSpacer-xl"
          />
          </EuiFlexItem>
      </EuiFlexGroup>
    `);
    expect(mount(containerTest)).toMatchInlineSnapshot(`
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <div>
            Hello
          </div>
          <button data-test-subj="consumerContent">
            World
          </button>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSpacer size="xl">
          </EuiSpacer>
        </EuiFlexItem>
      </EuiFlexGroup>
    `);
    expect(shallow(containerTest)).toMatchInlineSnapshot(`
      <EuiFlexGroup className="euiFlexGroup">
        <EuiFlexItem>
          <div>
            Hello
          </div>
          <button data-test-subj="consumerContent">
            World
          </button>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSpacer size="xl" />
        </EuiFlexItem>
      </EuiFlexGroup>
    `);
  });

  test('HTML - harder component', () => {
    const pageTest = (
      <EuiPageTemplate>
        <EuiPageSection>
          <div>Hello</div>
          <button data-test-subj="consumerContent">World</button>
        </EuiPageSection>
      </EuiPageTemplate>
    );

    expect(rtlRender(pageTest).container.firstChild).toMatchInlineSnapshot(`
      <EuiPageTemplate>
        <main
          class="emotion-euiPageInner"
          id="EuiPageTemplateInner_generated-id"
        >
          <section
            class="emotion-euiPageSection-l-top-transparent"
          >
            <div
              class="emotion-euiPageSection__content-l"
            >
              <div>
                Hello
              </div>
              <button
                data-test-subj="consumerContent"
              >
                World
              </button>
            </div>
          </section>
        </main>
      </EuiPageTemplate>
    `);
    expect(render(pageTest)).toMatchInlineSnapshot(`
      <EuiPageTemplate>
        <main
          class="emotion-euiPageInner"
          id="EuiPageTemplateInner_generated-id"
        >
          <section
            class="emotion-euiPageSection-l-top-transparent"
          >
            <div
              class="emotion-euiPageSection__content-l"
            >
              <div>
                Hello
              </div>
              <button
                data-test-subj="consumerContent"
              >
                World
              </button>
            </div>
          </section>
        </main>
      </EuiPageTemplate>
    `);
    expect(mount(pageTest)).toMatchInlineSnapshot(`
      <EuiPageTemplate>
        <EuiPageOuter responsive={{...}} style={{...}} className="euiPageTemplate">
          <EuiPageInner component={[undefined]} id="EuiPageTemplateInner_generated-id" border={false} panelled={false} responsive={{...}}>
            <main id="EuiPageTemplateInner_generated-id" className="css-nq554q-euiPageInner">
              <EuiPageSection>
                <section className="css-1lbu2ui-euiPageSection-l-top-transparent">
                  <div style={{...}} className="css-xelgj7-euiPageSection__content-l">
                    <div>
                      Hello
                    </div>
                    <button data-test-subj="consumerContent">
                      World
                    </button>
                  </div>
                </section>
              </EuiPageSection>
            </main>
          </EuiPageInner>
        </EuiPageOuter>
      </EuiPageTemplate>
    `);
    expect(shallow(pageTest)).toMatchInlineSnapshot(`
      <EuiPageOuter responsive={xs,s} style={[object Object]} className="euiPageTemplate">
        <EuiPageInner component={[undefined]} id="EuiPageTemplateInner_generated-id" border={false} panelled={false} responsive={{...}}>
          <EuiPageSection>
            <div>
              Hello
            </div>
            <button data-test-subj="consumerContent">
              World
            </button>
          </EuiPageSection>
        </EuiPageInner>
      </EuiPageOuter>
    `);
  });

  test('the worst component', () => {
    const gridTest = (
      <EuiDataGrid
        aria-label="test"
        columns={[{ id: 'test' }]}
        columnVisibility={{
          visibleColumns: ['id'],
          setVisibleColumns: () => {},
        }}
        rowCount={1}
        renderCellValue={() => 'test'}
      />
    );

    expect(rtlRender(gridTest).container).toMatchInlineSnapshot(`
      <div>
        <div
          data-focus-guard="true"
          style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
          tabindex="-1"
        />
        <EuiDataGrid />
        <div
          data-focus-guard="true"
          style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
          tabindex="-1"
        />
      </div>
    `);

    expect(render(gridTest)).toMatchInlineSnapshot(`
      Array [
        <div
          data-focus-guard="true"
          style="width:1px;height:0px;padding:0;overflow:hidden;position:fixed;top:1px;left:1px"
          tabindex="-1"
        />,
        <div
          class="euiDataGrid__focusWrap"
          data-focus-lock-disabled="disabled"
        >
          <div
            class="euiDataGrid euiDataGrid--bordersAll euiDataGrid--headerShade euiDataGrid--footerOverline euiDataGrid--rowHoverHighlight euiDataGrid--stickyFooter"
          >
            <div
              class="euiDataGrid__controls"
              data-test-subj="dataGridControls"
            >
              <div
                class="euiDataGrid__leftControls"
              >
                <div
                  class="euiPopover emotion-euiPopover"
                  data-test-subj="dataGridColumnSelectorPopover"
                >
                  <div
                    class="euiPopover__anchor css-16vtueo-render"
                  >
                    <button
                      class="euiButtonEmpty euiButtonEmpty--xSmall euiDataGrid__controlBtn css-wvaqcf-empty-text"
                      data-test-subj="dataGridColumnSelectorButton"
                      type="button"
                    >
                      <span
                        class="euiButtonContent euiButtonEmpty__content"
                      >
                        <span
                          class="euiButtonContent__icon"
                          color="inherit"
                          data-euiicon-type="listAdd"
                        />
                        <span
                          class="euiButtonEmpty__text"
                        >
                          Columns
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="euiDataGrid__rightControls"
              >
                <div
                  class="euiPopover emotion-euiPopover"
                  data-test-subj="dataGridKeyboardShortcutsPopover"
                >
                  <div
                    class="euiPopover__anchor css-16vtueo-render"
                  >
                    <span
                      class="euiToolTipAnchor emotion-euiToolTipAnchor-inlineBlock"
                    >
                      <button
                        aria-label="Keyboard shortcuts"
                        class="euiButtonIcon euiButtonIcon--xSmall emotion-euiButtonIcon-empty-text-hoverStyles"
                        data-test-subj="dataGridKeyboardShortcutsButton"
                        type="button"
                      >
                        <span
                          aria-hidden="true"
                          class="euiButtonIcon__icon"
                          color="inherit"
                          data-euiicon-type="keyboard"
                        />
                      </button>
                    </span>
                  </div>
                </div>
                <div
                  class="euiPopover emotion-euiPopover"
                  data-test-subj="dataGridDisplaySelectorPopover"
                >
                  <div
                    class="euiPopover__anchor css-16vtueo-render"
                  >
                    <span
                      class="euiToolTipAnchor emotion-euiToolTipAnchor-inlineBlock"
                    >
                      <button
                        aria-label="Display options"
                        class="euiButtonIcon euiButtonIcon--xSmall euiDataGrid__controlBtn emotion-euiButtonIcon-empty-text-hoverStyles"
                        data-test-subj="dataGridDisplaySelectorButton"
                        type="button"
                      >
                        <span
                          aria-hidden="true"
                          class="euiButtonIcon__icon"
                          color="inherit"
                          data-euiicon-type="tableDensityNormal"
                        />
                      </button>
                    </span>
                  </div>
                </div>
                <span
                  class="euiToolTipAnchor emotion-euiToolTipAnchor-inlineBlock"
                >
                  <button
                    aria-label="Enter fullscreen"
                    class="euiButtonIcon euiButtonIcon--xSmall euiDataGrid__controlBtn emotion-euiButtonIcon-empty-text-hoverStyles"
                    data-test-subj="dataGridFullScreenButton"
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      class="euiButtonIcon__icon"
                      color="inherit"
                      data-euiicon-type="fullScreen"
                    />
                  </button>
                </span>
              </div>
            </div>
            <div
              aria-label="test"
              aria-rowcount="1"
              class="euiDataGrid__content"
              data-test-subj="euiDataGridBody"
              id="generated-id"
              role="grid"
              tabindex="0"
            >
              <div
                class="euiDataGrid__virtualized"
                style="position:relative;height:9007199254740991px;width:9007199254740991px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:transform;direction:ltr"
              >
                <div
                  style="height:50px;width:0"
                >
                  <div
                    class="euiDataGridHeader"
                    data-test-subj="dataGridHeader"
                    role="row"
                  />
                </div>
              </div>
            </div>
            <p
              hidden=""
              id="generated-id"
            >
              Cell contains interactive content.
            </p>
          </div>
        </div>,
        <div
          data-focus-guard="true"
          style="width:1px;height:0px;padding:0;overflow:hidden;position:fixed;top:1px;left:1px"
          tabindex="-1"
        />,
      ]
    `);

    expect(mount(gridTest)).toMatchInlineSnapshot(`
      <EuiDataGrid aria-label="test" columns={[object Object]} columnVisibility={[object Object]} rowCount={1} renderCellValue={function renderCellValue() {
              return 'test';
            }}>
        <EuiFocusTrap disabled={true} className="euiDataGrid__focusWrap" clickOutsideDisables={false} returnFocus={true} noIsolation={true} scrollLock={false} gapMode="padding">
          <ForwardRef returnFocus={true} noIsolation={true} enabled={false} className="euiDataGrid__focusWrap" onClickOutside={[Function (anonymous)]} scrollLock={false}>
            <ForwardRef returnFocus={true} noIsolation={true} enabled={false} className="euiDataGrid__focusWrap" onClickOutside={[Function (anonymous)]} scrollLock={false} sideCar={[Function: RequireSideCar]}>
              <ForwardRef(FocusLockUI) sideCar={[Function: RequireSideCar]} disabled={true} returnFocus={true} autoFocus={true} shards={[undefined]} onActivation={[undefined]} onDeactivation={[undefined]} className="euiDataGrid__focusWrap" whiteList={[undefined]} lockProps={{...}} focusOptions={[undefined]} as={{...}} noFocusGuards={false} persistentFocus={false} crossFrame={true} hasPositiveIndices={[undefined]} allowTextSelection={[undefined]} group={[undefined]}>
                <div data-focus-guard={true} tabIndex={-1} style={{...}} />
                <ForwardRef data-focus-lock-disabled="disabled" data-focus-lock={[undefined]} sideCar={[Function: RequireSideCar]} shards={[undefined]} allowPinchZoom={[undefined]} as={[undefined]} inert={false} style={[undefined]} enabled={false} className="euiDataGrid__focusWrap" onBlur={[Function: useMedium]} onFocus={[Function (anonymous)]} removeScrollBar={true}>
                  <EuiDataGridToolbar gridWidth={0} minSizeForControls={[undefined]} toolbarVisibility={true} isFullScreen={false} fullScreenSelector={{...}} keyboardShortcuts={{...}} displaySelector={{...}} columnSelector={{...}} columnSorting={{...}}>
                    <EuiPopover data-test-subj="dataGridColumnSelectorPopover" isOpen={false} closePopover={[Function: closePopover]} anchorPosition="downLeft" panelPaddingSize="s" hasDragDrop={true} button={{...}} ownFocus={true} hasArrow={true} display="inline-block">
                      <EuiButtonEmpty size="xs" iconType="listAdd" color="text" className="euiDataGrid__controlBtn" data-test-subj="dataGridColumnSelectorButton" onClick={[Function: onClick]}>
                        <EuiButtonContentDeprecated isLoading={[undefined]} iconType="listAdd" iconSide="left" iconSize="s" textProps={{...}} className="euiButtonEmpty__content">
                          <EuiIcon className="euiButtonContent__icon" type="listAdd" size="s" color="inherit">
                          </EuiIcon>
                          <EuiI18n token="euiColumnSelector.button" default="Columns">
                            Columns
                          </EuiI18n>
                        </EuiButtonContentDeprecated>
                      </EuiButtonEmpty>
                    </EuiPopover>
                    <EuiPopover data-test-subj="dataGridKeyboardShortcutsPopover" isOpen={false} closePopover={[Function: closePopover]} anchorPosition="downRight" button={{...}} ownFocus={true} panelPaddingSize="m" hasArrow={true} display="inline-block">
                      <EuiToolTip content="Keyboard shortcuts" delay="long" position="top" display="inlineBlock">
                        <EuiToolTipAnchor onBlur={[Function (anonymous)]} onFocus={[Function (anonymous)]} onMouseOver={[Function (anonymous)]} onMouseOut={[Function (anonymous)]} id="generated-id" className="" display="inlineBlock" isVisible={false}>
                          <EuiButtonIcon size="xs" iconType="keyboard" color="text" data-test-subj="dataGridKeyboardShortcutsButton" onClick={[Function: onClick]} aria-label="Keyboard shortcuts" onFocus={[Function: onFocus]} onBlur={[Function: onBlur]}>
                            <EuiIcon className="euiButtonIcon__icon" type="keyboard" size="m" aria-hidden="true" color="inherit">
                            </EuiIcon>
                          </EuiButtonIcon>
                        </EuiToolTipAnchor>
                      </EuiToolTip>
                    </EuiPopover>
                    <EuiPopover data-test-subj="dataGridDisplaySelectorPopover" isOpen={false} closePopover={[Function: closePopover]} anchorPosition="downRight" panelPaddingSize="s" panelClassName="euiDataGrid__displayPopoverPanel" button={{...}} ownFocus={true} hasArrow={true} display="inline-block">
                      <EuiToolTip content="Display options" delay="long" position="top" display="inlineBlock">
                        <EuiToolTipAnchor onBlur={[Function (anonymous)]} onFocus={[Function (anonymous)]} onMouseOver={[Function (anonymous)]} onMouseOut={[Function (anonymous)]} id="generated-id" className="" display="inlineBlock" isVisible={false}>
                          <EuiButtonIcon size="xs" iconType="tableDensityNormal" className="euiDataGrid__controlBtn" color="text" data-test-subj="dataGridDisplaySelectorButton" onClick={[Function: onClick]} aria-label="Display options" onFocus={[Function: onFocus]} onBlur={[Function: onBlur]}>
                            <EuiIcon className="euiButtonIcon__icon" type="tableDensityNormal" size="m" aria-hidden="true" color="inherit">
                            </EuiIcon>
                          </EuiButtonIcon>
                        </EuiToolTipAnchor>
                      </EuiToolTip>
                    </EuiPopover>
                    <EuiToolTip content="Enter fullscreen" delay="long" position="top" display="inlineBlock">
                      <EuiToolTipAnchor onBlur={[Function (anonymous)]} onFocus={[Function (anonymous)]} onMouseOver={[Function (anonymous)]} onMouseOut={[Function (anonymous)]} id="generated-id" className="" display="inlineBlock" isVisible={false}>
                        <EuiButtonIcon size="xs" iconType="fullScreen" color="text" className="euiDataGrid__controlBtn" data-test-subj="dataGridFullScreenButton" onClick={[Function: onClick]} aria-label="Enter fullscreen" onFocus={[Function: onFocus]} onBlur={[Function: onBlur]}>
                          <EuiIcon className="euiButtonIcon__icon" type="fullScreen" size="m" aria-hidden="true" color="inherit">
                          </EuiIcon>
                        </EuiButtonIcon>
                      </EuiToolTipAnchor>
                    </EuiToolTip>
                  </EuiDataGridToolbar>
                  <EuiDataGridBody columns={{...}} visibleColCount={0} leadingControlColumns={{...}} schema={{...}} trailingControlColumns={{...}} setVisibleColumns={[Function: setVisibleColumns]} switchColumnPos={[Function (anonymous)]} onColumnResize={[undefined]} headerIsInteractive={false} handleHeaderMutation={[Function (anonymous)]} schemaDetectors={{...}} pagination={[undefined]} renderCellValue={[Function: renderCellValue]} renderCellPopover={[undefined]} renderFooterCellValue={[undefined]} rowCount={1} visibleRows={{...}} interactiveCellId="generated-id" rowHeightsOptions={{...}} virtualizationOptions={{...}} isFullScreen={false} gridStyles={{...}} gridWidth={0} gridRef={{...}} gridItemsRendered={{...}} wrapperRef={{...}} renderCustomGridBody={[undefined]}>
                    <EuiDataGridBodyVirtualized columns={{...}} visibleColCount={0} leadingControlColumns={{...}} schema={{...}} trailingControlColumns={{...}} setVisibleColumns={[Function: setVisibleColumns]} switchColumnPos={[Function (anonymous)]} onColumnResize={[undefined]} headerIsInteractive={false} handleHeaderMutation={[Function (anonymous)]} schemaDetectors={{...}} pagination={[undefined]} renderCellValue={[Function: renderCellValue]} renderCellPopover={[undefined]} renderFooterCellValue={[undefined]} rowCount={1} visibleRows={{...}} interactiveCellId="generated-id" rowHeightsOptions={{...}} virtualizationOptions={{...}} isFullScreen={false} gridStyles={{...}} gridWidth={0} gridRef={{...}} gridItemsRendered={{...}} wrapperRef={{...}}>
                      <Grid className="euiDataGrid__virtualized" onItemsRendered={[Function: onItemsRendered]} innerElementType={{...}} outerRef={{...}} innerRef={{...}} columnCount={0} width={9007199254740991} columnWidth={[Function (anonymous)]} height={9007199254740991} rowHeight={[Function (anonymous)]} itemData={{...}} rowCount={1} direction="ltr" useIsScrolling={false}>
                        <EuiDataGridInnerElement style={{...}}>
                          <div style={{...}}>
                            <EuiDataGridHeaderRow headerIsInteractive={false} switchColumnPos={[Function (anonymous)]} setVisibleColumns={[Function: setVisibleColumns]} leadingControlColumns={{...}} trailingControlColumns={{...}} columns={{...}} columnWidths={{...}} defaultColumnWidth={100} setColumnWidth={[Function (anonymous)]} schema={{...}} schemaDetectors={{...}}>
                            </EuiDataGridHeaderRow>
                          </div>
                        </EuiDataGridInnerElement>
                      </Grid>
                    </EuiDataGridBodyVirtualized>
                  </EuiDataGridBody>
                  <p id="generated-id" hidden={true}>
                    <EuiI18n token="euiDataGrid.screenReaderNotice" default="Cell contains interactive content.">
                      Cell contains interactive content.
                    </EuiI18n>
                  </p>
                </ForwardRef>
                <div data-focus-guard={true} tabIndex={-1} style={{...}} />
              </ForwardRef(FocusLockUI)>
            </ForwardRef>
          </ForwardRef>
        </EuiFocusTrap>
      </EuiDataGrid>
    `);

    expect(shallow(gridTest)).toMatchInlineSnapshot(`
      <EuiFocusTrap disabled={true} className="euiDataGrid__focusWrap" clickOutsideDisables={false} returnFocus={true} noIsolation={true} scrollLock={false} gapMode="padding">
        <div className="euiDataGrid euiDataGrid--bordersAll euiDataGrid--headerShade euiDataGrid--footerOverline euiDataGrid--rowHoverHighlight euiDataGrid--stickyFooter" onKeyDown={[Function (anonymous)]} style={{...}}>
          <EuiDataGridToolbar gridWidth={0} minSizeForControls={[undefined]} toolbarVisibility={true} isFullScreen={false} fullScreenSelector={{...}} keyboardShortcuts={{...}} displaySelector={{...}} columnSelector={{...}} columnSorting={{...}} />
          <div onKeyDown={[Function (anonymous)]} data-test-subj="euiDataGridBody" className="euiDataGrid__content" role="grid" aria-rowcount={1} id="generated-id" tabIndex={0} onKeyUp={[Function: onKeyUp]} aria-label="test">
            <EuiDataGridBody columns={{...}} visibleColCount={0} leadingControlColumns={{...}} schema={{...}} trailingControlColumns={{...}} setVisibleColumns={[Function: setVisibleColumns]} switchColumnPos={[Function (anonymous)]} onColumnResize={[undefined]} headerIsInteractive={false} handleHeaderMutation={[Function (anonymous)]} schemaDetectors={{...}} pagination={[undefined]} renderCellValue={[Function: renderCellValue]} renderCellPopover={[undefined]} renderFooterCellValue={[undefined]} rowCount={1} visibleRows={{...}} interactiveCellId="generated-id" rowHeightsOptions={{...}} virtualizationOptions={{...}} isFullScreen={false} gridStyles={{...}} gridWidth={0} gridRef={{...}} gridItemsRendered={{...}} wrapperRef={{...}} renderCustomGridBody={[undefined]} />
          </div>
          <p id="generated-id" hidden={true}>
            <EuiI18n token="euiDataGrid.screenReaderNotice" default="Cell contains interactive content." />
          </p>
        </div>
      </EuiFocusTrap>
    `);
  });
});
