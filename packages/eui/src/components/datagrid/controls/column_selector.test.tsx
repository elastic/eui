/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen, waitForEuiPopoverOpen } from '../../../test/rtl';
import { testOnReactVersion } from '../../../test/internal';

import { EuiDataGridToolBarVisibilityOptions } from '../data_grid_types';

import { useDataGridColumnSelector } from './column_selector';

describe('useDataGridColumnSelector', () => {
  const requiredProps = {
    availableColumns: [{ id: 'columnA' }, { id: 'columnB' }],
    visibleColumns: ['columnA', 'columnB'],
    showColumnSelector: {
      allowHide: true,
      allowReorder: true,
    } as EuiDataGridToolBarVisibilityOptions['showColumnSelector'],
    displayValues: {},
  };

  // Hooks can only be called inside function components
  const MockComponent = ({
    renderedReturn = 'columnSelector',
    availableColumns = requiredProps.availableColumns,
    visibleColumns = requiredProps.visibleColumns,
    showColumnSelector = requiredProps.showColumnSelector,
    displayValues = requiredProps.displayValues,
    children = null as any,
  }) => {
    const [_visibleColumns, _setVisibleColumns] = useState(visibleColumns);

    const [
      columnSelector,
      orderedVisibleColumns,
      setVisibleColumns,
      switchColumnPos,
    ] = useDataGridColumnSelector(
      availableColumns,
      {
        visibleColumns: _visibleColumns,
        setVisibleColumns: _setVisibleColumns,
      },
      showColumnSelector,
      displayValues
    );

    switch (renderedReturn) {
      case 'switchColumnPos':
      case 'setVisibleColumns':
        return children({
          switchColumnPos,
          setVisibleColumns,
          orderedVisibleColumns,
        });
      case 'orderedVisibleColumns':
        return <>{JSON.stringify(orderedVisibleColumns)}</>;
      case 'columnSelector':
      default:
        return <>{columnSelector}</>;
    }
  };

  describe('columnSelector', () => {
    const openPopover = () => {
      fireEvent.click(screen.getByTestSubject('dataGridColumnSelectorButton'));
      waitForEuiPopoverOpen();
    };

    testOnReactVersion(['18'])(
      'renders a toolbar button/popover allowing users to set column visibility and order',
      () => {
        const { baseElement } = render(
          <MockComponent showColumnSelector={true} />
        );
        openPopover();
        expect(baseElement).toMatchSnapshot();
      }
    );

    it('does not render if all valid sub-options are disabled', () => {
      const { container } = render(
        <MockComponent
          showColumnSelector={{ allowHide: false, allowReorder: false }}
        />
      );
      expect(container).toBeEmptyDOMElement();
    });

    describe('column filtering', () => {
      const showColumnSelector = { allowHide: true, allowReorder: true };

      it('renders a searchbar that filters displayed columns', () => {
        const { getByTestSubject, getAllByRole } = render(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover();

        expect(getAllByRole('switch')).toHaveLength(2);

        fireEvent.change(getByTestSubject('dataGridColumnSelectorSearch'), {
          target: { value: 'A' },
        });

        expect(getAllByRole('switch')).toHaveLength(1);
      });
    });

    describe('column reordering', () => {
      const showColumnSelector = { allowHide: false, allowReorder: true };

      it('renders draggable handles', () => {
        render(<MockComponent showColumnSelector={showColumnSelector} />);
        openPopover();

        expect(
          document.querySelectorAll('[data-euiicon-type="grab"]')
        ).toHaveLength(2);
      });

      it('calls setColumns on drag end', () => {
        const { getByTestSubject, getAllByLabelText } = render(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        fireEvent.click(getByTestSubject('dataGridColumnSelectorButton'));
        waitForEuiPopoverOpen();
        const getDragHandles = () => getAllByLabelText('Drag handle');

        const columnA = getDragHandles()[0]!;
        expect(columnA).toHaveAttribute(
          'data-rfd-drag-handle-draggable-id',
          'columnA'
        );

        // our react dnd library listens for the `keyCode` property in keyboard events, not `key`
        const dndKeyCodes = { space: 32, arrowDown: 40 };
        fireEvent.keyDown(columnA, { keyCode: dndKeyCodes.space });
        fireEvent.keyDown(columnA, { keyCode: dndKeyCodes.arrowDown });
        fireEvent.keyDown(columnA, { keyCode: dndKeyCodes.space });

        expect(getDragHandles()[0]).toHaveAttribute(
          'data-rfd-drag-handle-draggable-id',
          'columnB'
        );
      });
    });

    describe('column visibility', () => {
      const showColumnSelector = { allowHide: true, allowReorder: false };

      const getButtonText = () => {
        return document.querySelector('.euiDataGridToolbarControl__text')
          ?.textContent;
      };
      const getBadgeText = () => {
        return document.querySelector('.euiDataGridToolbarControl__badge')
          ?.textContent;
      };

      it('shows the number of columns hidden as the toolbar button text', () => {
        render(
          <MockComponent
            showColumnSelector={showColumnSelector}
            visibleColumns={[]}
          />
        );

        expect(getButtonText()).toEqual('Columns');
        expect(getBadgeText()).toEqual('0/2');
      });

      it('toggles column visibility on switch interaction', () => {
        const { getByTestSubject } = render(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover();
        expect(getBadgeText()).toEqual('2');

        fireEvent.click(
          getByTestSubject(
            'dataGridColumnSelectorToggleColumnVisibility-columnB'
          )
        );
        expect(getBadgeText()).toEqual('1/2');

        fireEvent.click(
          getByTestSubject(
            'dataGridColumnSelectorToggleColumnVisibility-columnB'
          )
        );
        expect(getBadgeText()).toEqual('2');
      });

      it('toggles all column visibility with the show/hide all buttons', () => {
        const { getByTestSubject } = render(
          <MockComponent showColumnSelector={showColumnSelector} />
        );
        openPopover();

        fireEvent.click(
          getByTestSubject('dataGridColumnSelectorHideAllButton')
        );
        expect(getBadgeText()).toEqual('0/2');

        fireEvent.click(
          getByTestSubject('dataGridColumnSelectorShowAllButton')
        );
        expect(getBadgeText()).toEqual('2');
      });
    });
  });

  describe('orderedVisibleColumns', () => {
    it('returns an array of ordered visible columns', () => {
      const { container } = render(
        <MockComponent renderedReturn="orderedVisibleColumns" />
      );

      expect(container.firstChild).toMatchInlineSnapshot(
        `[{"id":"columnA"},{"id":"columnB"}]`
      );
    });
  });

  describe('setVisibleColumns & switchColumnPos', () => {
    const RenderProp = ({
      switchColumnPos,
      setVisibleColumns,
      orderedVisibleColumns,
    }: any) => {
      return (
        <>
          {JSON.stringify(orderedVisibleColumns)}
          <button
            data-test-subj="setVisibleColumns"
            onClick={() => setVisibleColumns([])}
          />
          <button
            data-test-subj="switchColumnPos"
            onClick={() => switchColumnPos?.('columnA', 'columnB')}
          />
          <button
            data-test-subj="switchColumnPos-invalid"
            onClick={() => switchColumnPos?.('columnB', undefined)}
          />
        </>
      );
    };

    it('exposes the passed setVisibleColumns fn', () => {
      const { getByTestSubject, container } = render(
        <MockComponent renderedReturn="setVisibleColumns">
          {(props: any) => <RenderProp {...props} />}
        </MockComponent>
      );
      fireEvent.click(getByTestSubject('setVisibleColumns'));

      expect(container.firstChild).toMatchInlineSnapshot(`[]`);
    });

    it('exposes the switchColumnPos fn', () => {
      const { getByTestSubject, container } = render(
        <MockComponent renderedReturn="switchColumnPos">
          {(props: any) => <RenderProp {...props} />}
        </MockComponent>
      );

      fireEvent.click(getByTestSubject('switchColumnPos-invalid'));
      expect(container.firstChild).toMatchInlineSnapshot(
        `[{"id":"columnA"},{"id":"columnB"}]`
      );

      fireEvent.click(getByTestSubject('switchColumnPos'));
      expect(container.firstChild).toMatchInlineSnapshot(
        `[{"id":"columnB"},{"id":"columnA"}]`
      );
    });
  });
});
