/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';

import {
  EuiDataGridToolbar,
  checkOrDefaultToolBarDisplayOptions,
  renderAdditionalControls,
  getNestedObjectOptions,
} from './data_grid_toolbar';

describe('EuiDataGridToolbar', () => {
  const requiredProps = {
    gridWidth: 500,
    toolbarVisibility: true,
    isFullScreen: false,
    fullScreenSelector: <div>mock fullscreen selector</div>,
    displaySelector: <div>mock style selector</div>,
    keyboardShortcuts: <div>mock keyboard shortcuts</div>,
    columnSelector: <div>mock column selector</div>,
    columnSorting: <div>mock column sorting</div>,
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridToolbar {...requiredProps} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGrid__controls emotion-euiDataGrid__controls"
        data-test-subj="dataGridControls"
      >
        <div
          class="euiDataGrid__leftControls emotion-euiDataGrid__leftControls"
        >
          <div>
            mock column selector
          </div>
          <div>
            mock column sorting
          </div>
        </div>
        <div
          class="euiDataGrid__rightControls emotion-euiDataGrid__rightControls"
        >
          <div>
            mock keyboard shortcuts
          </div>
          <div>
            mock style selector
          </div>
          <div>
            mock fullscreen selector
          </div>
        </div>
      </div>
    `);
  });

  it('does not render children when toolbar visibility is false', () => {
    const { container } = render(
      <EuiDataGridToolbar {...requiredProps} toolbarVisibility={false} />
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGrid__controls emotion-euiDataGrid__controls"
        data-test-subj="dataGridControls"
      >
        <div
          class="euiDataGrid__leftControls emotion-euiDataGrid__leftControls"
        />
        <div
          class="euiDataGrid__rightControls emotion-euiDataGrid__rightControls"
        >
          <span
            class="emotion-euiScreenReaderOnly-showOnFocus"
          >
            <div>
              mock keyboard shortcuts
            </div>
          </span>
        </div>
      </div>
    `);
  });

  it('renders when individual toolbar visibility properties are passed', () => {
    const { container } = render(
      <EuiDataGridToolbar
        {...requiredProps}
        toolbarVisibility={{
          showColumnSelector: false,
          showDisplaySelector: false,
          showSortSelector: false,
          showFullScreenSelector: false,
          additionalControls: {
            left: <div>hello</div>,
            right: <div>world</div>,
          },
        }}
      />
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGrid__controls emotion-euiDataGrid__controls"
        data-test-subj="dataGridControls"
      >
        <div
          class="euiDataGrid__leftControls emotion-euiDataGrid__leftControls"
        >
          <div>
            hello
          </div>
        </div>
        <div
          class="euiDataGrid__rightControls emotion-euiDataGrid__rightControls"
        >
          <div>
            world
          </div>
          <div>
            mock keyboard shortcuts
          </div>
        </div>
      </div>
    `);
  });

  it('renders custom content if renderCustomToolbar is defined', () => {
    const mockRenderCustomToolbar = jest.fn(() => (
      <div data-test-subj="test">Custom</div>
    ));
    const { container } = render(
      <EuiDataGridToolbar
        {...requiredProps}
        renderCustomToolbar={mockRenderCustomToolbar}
      />
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-subj="test"
      >
        Custom
      </div>
    `);
    expect(mockRenderCustomToolbar).toHaveBeenCalledWith(
      expect.objectContaining({
        hasRoomForGridControls: true,
        fullScreenControl: requiredProps.fullScreenSelector,
        keyboardShortcutsControl: requiredProps.keyboardShortcuts,
        displayControl: requiredProps.displaySelector,
        columnControl: requiredProps.columnSelector,
        columnSortingControl: requiredProps.columnSorting,
      })
    );
  });
});

describe('checkOrDefaultToolBarDisplayOptions', () => {
  const key = 'showDisplaySelector';

  it('returns boolean `toolbarVisibility`s as-is', () => {
    expect(checkOrDefaultToolBarDisplayOptions(true, key)).toEqual(true);
    expect(checkOrDefaultToolBarDisplayOptions(false, key)).toEqual(false);
  });

  it('returns the values of keys within `toolbarVisibility` objects', () => {
    expect(checkOrDefaultToolBarDisplayOptions({ [key]: true }, key)).toEqual(
      true
    );
    expect(checkOrDefaultToolBarDisplayOptions({ [key]: false }, key)).toEqual(
      false
    );
  });

  it('defaults to true if the `toolbarVisibility` object does not specify the passed key', () => {
    expect(checkOrDefaultToolBarDisplayOptions({}, key)).toEqual(true);
  });

  it('defaults to true if `toolbarVisibility` is somehow undefined', () => {
    expect(checkOrDefaultToolBarDisplayOptions(undefined, key)).toEqual(true);
  });
});

describe('renderAdditionalControls', () => {
  const mockControl = <div data-test-subj="test" />;

  it('does not render if a boolean was passed into toolbarVisibility', () => {
    expect(renderAdditionalControls(false, 'right')).toEqual(null);
    expect(renderAdditionalControls(true, 'right')).toEqual(null);
  });

  it('does not render if toolbarVisibility is undefined or additionalControls is undefined', () => {
    expect(renderAdditionalControls(undefined, 'right')).toEqual(null);
    expect(
      renderAdditionalControls({ additionalControls: undefined }, 'right')
    ).toEqual(null);
  });

  describe('left.append', () => {
    it('renders a react node appended into the left side toolbar', () => {
      expect(
        renderAdditionalControls(
          { additionalControls: { left: { append: mockControl } } },
          'left.append'
        )
      ).toEqual(mockControl);
    });

    it('does not render other positions', () => {
      expect(
        renderAdditionalControls(
          { additionalControls: { left: { prepend: mockControl } } },
          'left.append'
        )
      ).toEqual(null);
      expect(
        renderAdditionalControls(
          { additionalControls: { right: mockControl } },
          'left.append'
        )
      ).toEqual(null);
    });

    describe('additionalControls.left fallback', () => {
      it('renders `additionalControls.left` nodes into `left.append` by default', () => {
        expect(
          renderAdditionalControls(
            { additionalControls: { left: mockControl } },
            'left.append'
          )
        ).toEqual(mockControl);
      });

      it('does not render other positions', () => {
        expect(
          renderAdditionalControls(
            { additionalControls: { left: mockControl } },
            'left.prepend'
          )
        ).toEqual(null);
        expect(
          renderAdditionalControls(
            { additionalControls: { left: mockControl } },
            'right'
          )
        ).toEqual(null);
      });
    });

    describe('additionalControls fallback', () => {
      it('renders `additionalControls` nodes into `left.append` by default', () => {
        expect(
          renderAdditionalControls(
            { additionalControls: mockControl },
            'left.append'
          )
        ).toEqual(mockControl);
      });

      it('does not render other positions', () => {
        expect(
          renderAdditionalControls(
            { additionalControls: mockControl },
            'left.prepend'
          )
        ).toEqual(null);
        expect(
          renderAdditionalControls({ additionalControls: mockControl }, 'right')
        ).toEqual(null);
      });
    });
  });

  describe('left.prepend', () => {
    it('renders a react node prepended into the left side toolbar', () => {
      expect(
        renderAdditionalControls(
          { additionalControls: { left: { prepend: mockControl } } },
          'left.prepend'
        )
      ).toEqual(mockControl);
    });

    it('does not render other positions', () => {
      expect(
        renderAdditionalControls(
          { additionalControls: { left: { append: mockControl } } },
          'left.prepend'
        )
      ).toEqual(null);
      expect(
        renderAdditionalControls(
          { additionalControls: { right: mockControl } },
          'left.prepend'
        )
      ).toEqual(null);
    });
  });

  describe('right', () => {
    it('renders a react node passed into the right side toolbar', () => {
      expect(
        renderAdditionalControls(
          { additionalControls: { right: mockControl } },
          'right'
        )
      ).toEqual(mockControl);
    });

    it('does not render left side positions', () => {
      expect(
        renderAdditionalControls(
          { additionalControls: { left: { prepend: mockControl } } },
          'right'
        )
      ).toEqual(null);
      expect(
        renderAdditionalControls(
          { additionalControls: { left: { append: mockControl } } },
          'right'
        )
      ).toEqual(null);
    });
  });
});

describe('getNestedObjectOptions', () => {
  interface MockOptions {
    someKey?: boolean;
  }

  describe('non-object configuration', () => {
    it('returns passed booleans', () => {
      expect(getNestedObjectOptions<MockOptions>(true, 'someKey')).toEqual(
        true
      );
      expect(getNestedObjectOptions<MockOptions>(false, 'someKey')).toEqual(
        false
      );
    });

    it('returns true if the option is undefined', () => {
      expect(getNestedObjectOptions<MockOptions>(undefined, 'someKey')).toEqual(
        true
      );
    });
  });

  describe('object configuration', () => {
    it('returns nested object booleans', () => {
      expect(
        getNestedObjectOptions<MockOptions>({ someKey: true }, 'someKey')
      ).toEqual(true);
      expect(
        getNestedObjectOptions<MockOptions>({ someKey: false }, 'someKey')
      ).toEqual(false);
    });

    it('returns true if the nested object key is undefined', () => {
      expect(getNestedObjectOptions<MockOptions>({}, 'someKey')).toEqual(true);
    });
  });
});
