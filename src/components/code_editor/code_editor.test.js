import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { EuiCodeEditor } from './code_editor';
import { keyCodes } from '../../services';
import {
  findTestSubject,
  requiredProps,
  takeMountedSnapshot,
} from '../../test';

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => { return () => 42; },
}));

describe('EuiCodeEditor', () => {
  let element;

  beforeEach(() => {
    element = mount(<EuiCodeEditor/>);
  });

  test('is rendered', () => {
    const component = mount(<EuiCodeEditor {...requiredProps}/>);
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  describe('hint element', () => {
    test('should be tabable', () => {
      const hint = findTestSubject(element, 'codeEditorHint');
      expect(hint).toMatchSnapshot();
    });

    test('should be disabled when the ui ace box gains focus', () => {
      const hint = findTestSubject(element, 'codeEditorHint', false);
      hint.simulate('keyup', { keyCode: keyCodes.ENTER });
      expect(findTestSubject(element, 'codeEditorHint')).toMatchSnapshot();
    });

    test('should be enabled when the ui ace box loses focus', () => {
      const hint = findTestSubject(element, 'codeEditorHint', false);
      hint.simulate('keyup', { keyCode: keyCodes.ENTER });
      element.instance().onBlurAce();
      expect(findTestSubject(element, 'codeEditorHint')).toMatchSnapshot();
    });
  });

  describe('interaction', () => {
    test('bluring the ace textbox should call a passed onBlur prop', () => {
      const blurSpy = sinon.spy();
      const el = mount(<EuiCodeEditor onBlur={blurSpy}/>);
      el.instance().onBlurAce();
      expect(blurSpy.called).toBe(true);
    });

    test('pressing escape in ace textbox will enable overlay', () => {
      element.instance().onKeydownAce({
        preventDefault: () => {},
        stopPropagation: () => {},
        keyCode: keyCodes.ESCAPE,
      });
      const hint = findTestSubject(element, 'codeEditorHint');
      expect(hint).toBe(document.activeElement);
    });
  });
});
