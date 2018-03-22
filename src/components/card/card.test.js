import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiCard } from './card';

describe('EuiCard', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCard title="Card title" description="Card description" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('onClick', () => {
    it('supports onClick as a link', () => {
      const handler = jest.fn();
      const component = mount(
        <EuiCard
          title="Hoi"
          description="There"
          href="#"
          onClick={handler}
        />
      );
      component.find('a').simulate('click');
      expect(handler.mock.calls.length).toEqual(1);
    });

    it('supports onClick as a button', () => {
      const handler = jest.fn();
      const component = mount(
        <EuiCard
          title="Hoi"
          description="There"
          onClick={handler}
        />
      );
      component.find('button').simulate('click');
      expect(handler.mock.calls.length).toEqual(1);
    });
  });
});
