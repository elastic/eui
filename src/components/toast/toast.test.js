import React from 'react';
import { render, shallow } from 'enzyme';
import sinon from 'sinon';
import {
  findTestSubject,
  requiredProps
} from '../../test';

import {
  COLORS,
  EuiToast
} from './toast';

describe('EuiToast', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToast {...requiredProps}>
        <p>Hi</p>
      </EuiToast>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('Props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const component = <EuiToast title="toast title" />;
        expect(shallow(component)).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = <EuiToast color={color} />;
          expect(shallow(component)).toMatchSnapshot();
        });
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const component = <EuiToast iconType="user" />;
        expect(shallow(component)).toMatchSnapshot();
      });
    });

    describe('onClose', () => {
      test('is called when the close button is clicked', () => {
        const onCloseHandler = sinon.stub();

        const component = shallow(
          <EuiToast onClose={onCloseHandler} />
        );
        const closeButton = findTestSubject(component, 'toastCloseButton');
        closeButton.simulate('click');

        sinon.assert.calledOnce(onCloseHandler);
      });
    });
  });
});
