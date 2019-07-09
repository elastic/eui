import React from 'react';
import {
  render,
  // mount
} from 'enzyme';
import {
  // findTestSubject,
  requiredProps,
} from '../../test';

import { EuiInnerText } from './inner_text';

describe('EuiInnerText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiInnerText {...requiredProps}>
        {(ref, innerText) => (
          <span ref={ref} title={innerText}>
            Test
          </span>
        )}
      </EuiInnerText>
    );

    expect(component).toMatchSnapshot();
  });

  // test('uses innerText', () => {
  //   const text = 'Test';
  //   const component = mount(
  //     <EuiInnerText {...requiredProps}>
  //       {(ref, innerText) => (
  //         <span ref={ref} title={innerText} data-test-subj="span">
  //           {text}
  //         </span>
  //       )}
  //     </EuiInnerText>
  //   );
  //
  //   const span = findTestSubject(component, 'span');
  //   expect(span.props().title).toBe(text);
  // });
});
