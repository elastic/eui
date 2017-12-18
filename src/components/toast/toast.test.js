import React from 'react';
import { render, shallow } from 'enzyme';
import sinon from 'sinon';
import {
  findTestSubject,
  requiredProps
} from '../../test';

import { EuiToast } from './toast';

describe('EuiToast', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToast {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('renders children', () => {
    const component = <EuiToast><p>Hi</p></EuiToast>;
    expect(shallow(component)).toMatchSnapshot();
  });

  test('renders title', () => {
    const component = <EuiToast title="toast title" />;
    expect(shallow(component)).toMatchSnapshot();
  });

  test('renders color', () => {
    const component = <EuiToast color="success" />;
    expect(shallow(component)).toMatchSnapshot();
  });

  test('renders iconType', () => {
    const component = <EuiToast iconType="user" />;
    expect(shallow(component)).toMatchSnapshot();
  });

  describe('Props', () => {
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
