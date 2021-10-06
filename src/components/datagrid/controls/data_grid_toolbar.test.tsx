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
        <div>
          mock column selector
        </div>
        <div>
          mock style selector
        </div>
        <div>
          mock column sorting
        </div>
        <EuiButtonEmpty
          className=""
          color="text"
          data-test-subj="dataGridFullScreenButton"
          iconType="fullScreen"
          onClick={[Function]}
          size="xs"
        >
          Full screen
        </EuiButtonEmpty>
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
      />
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
          additionalControls: <div>hello world</div>,
        }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGrid__controls"
        data-test-sub="dataGridControls"
      >
        <div>
          hello world
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
      <EuiButtonEmpty
        className=""
        color="text"
        data-test-subj="dataGridFullScreenButton"
        iconType="fullScreen"
        onClick={[Function]}
        size="xs"
      >
        Exit full screen
      </EuiButtonEmpty>
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
