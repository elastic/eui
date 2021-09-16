/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiDataGridColumnResizer } from './data_grid_column_resizer';

describe('EuiDataGridHeaderResizer', () => {
  const props = {
    columnId: 'someColumn',
    columnWidth: 50,
    setColumnWidth: jest.fn(),
  };

  const component = shallow(<EuiDataGridColumnResizer {...props} />);
  const componentMethods = component.instance() as EuiDataGridColumnResizer;

  it('renders', () => {
    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridColumnResizer"
        data-test-subj="dataGridColumnResizer"
        onMouseDown={[Function]}
        style={
          Object {
            "marginRight": "0px",
          }
        }
      />
    `);
  });

  describe('on mouse down', () => {
    it('saves the current mouse horizontal position and adds mouse move & up listeners', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      component.simulate('mouseDown', {
        pageX: 100,
        preventDefault: jest.fn(),
      });

      expect(component.state('initialX')).toEqual(100);
      expect(addEventListenerSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('on mouse move', () => {
    it('does not allow an offset that would go under the mininum column width', () => {
      componentMethods.onMouseMove({ pageX: 0 });
      expect(component.state('offset')).toEqual(-10);
    });

    it('sets offset state to the difference of the moved pageX', () => {
      componentMethods.onMouseMove({ pageX: 200 });
      expect(component.state('offset')).toEqual(100);
    });
  });

  describe('on mouse up', () => {
    it('calls setColumnWidth, reset offset, and removes event listeners', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      componentMethods.onMouseUp();

      expect(props.setColumnWidth).toHaveBeenCalledWith('someColumn', 150);
      expect(component.state('offset')).toEqual(0);
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
    });
  });
});
