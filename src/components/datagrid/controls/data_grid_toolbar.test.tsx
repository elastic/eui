/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import {
  EuiDataGridToolbar,
  checkOrDefaultToolBarDisplayOptions,
  renderAdditionalControls,
} from './data_grid_toolbar';

describe('EuiDataGridToolbar', () => {
  const requiredProps = {
    gridWidth: 500,
    toolbarVisibility: true,
    isFullScreen: false,
    styleSelector: React.createElement('div', null, 'mock style selector'),
    controlBtnClasses: '',
    columnSelector: React.createElement('div', null, 'mock column selector'),
    columnSorting: <div>mock column sorting</div>,
    setRef: jest.fn(),
    setIsFullScreen: jest.fn(),
  };

  it('renders', () => {
    const component = shallow(<EuiDataGridToolbar {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGrid__controls"
        data-test-sub="dataGridControls"
      >
        <div
          className="euiDataGrid__leftControls"
        >
          <div>
            mock column selector
          </div>
          <div>
            mock column sorting
          </div>
        </div>
        <div
          className="euiDataGrid__rightControls"
        >
          <div>
            mock style selector
          </div>
          <EuiToolTip
            content="Full screen"
            delay="long"
            display="inlineBlock"
            position="top"
          >
            <EuiButtonIcon
              aria-label="Full screen"
              className=""
              color="text"
              data-test-subj="dataGridFullScreenButton"
              iconType="fullScreen"
              onClick={[Function]}
              size="xs"
            />
          </EuiToolTip>
        </div>
      </div>
    `);
  });

  it('does not render children when toolbar visibility is false', () => {
    const component = shallow(
      <EuiDataGridToolbar {...requiredProps} toolbarVisibility={false} />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGrid__controls"
        data-test-sub="dataGridControls"
      >
        <div
          className="euiDataGrid__leftControls"
        />
        <div
          className="euiDataGrid__rightControls"
        />
      </div>
    `);
  });

  it('renders when individual toolbar visibility properties are passed', () => {
    const component = shallow(
      <EuiDataGridToolbar
        {...requiredProps}
        toolbarVisibility={{
          showColumnSelector: false,
          showStyleSelector: false,
          showSortSelector: false,
          showFullScreenSelector: false,
          additionalControls: {
            left: <div>hello</div>,
            right: <div>world</div>,
          },
        }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGrid__controls"
        data-test-sub="dataGridControls"
      >
        <div
          className="euiDataGrid__leftControls"
        >
          <div>
            hello
          </div>
        </div>
        <div
          className="euiDataGrid__rightControls"
        >
          <div>
            world
          </div>
        </div>
      </div>
    `);
  });

  it('handles full screen toggling', () => {
    const component = shallow(<EuiDataGridToolbar {...requiredProps} />);
    component.setProps({
      setIsFullScreen: () => component.setProps({ isFullScreen: true }),
    });

    component
      .find('[data-test-subj="dataGridFullScreenButton"]')
      .simulate('click');

    expect(component.find('[data-test-subj="dataGridFullScreenButton"]'))
      .toMatchInlineSnapshot(`
      <EuiButtonIcon
        aria-label="Exit full screen"
        className=""
        color="text"
        data-test-subj="dataGridFullScreenButton"
        iconType="fullScreen"
        onClick={[Function]}
        size="xs"
      />
    `);
  });
});

describe('checkOrDefaultToolBarDisplayOptions', () => {
  const key = 'showStyleSelector';

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
