/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';

import { EuiAspectRatio } from './aspect_ratio';

describe('EuiAspectRatio', () => {
  it('renders', () => {
    const { container } = render(
      <EuiAspectRatio height={4} width={9}>
        <iframe
          title="Elastic is a search company"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yJarWSLRM24"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          {...requiredProps}
        />
      </EuiAspectRatio>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('merges all styles', () => {
    const { getByTestSubject } = render(
      <EuiAspectRatio height={4} width={9} style={{ color: 'sienna' }}>
        <div data-test-subj="child" style={{ backgroundColor: 'salmon' }} />
      </EuiAspectRatio>
    );

    expect(getByTestSubject('child')).toHaveStyle({
      color: 'rgb(160, 82, 45)',
      'background-color': 'rgb(250, 128, 114)',
      'aspect-ratio': '9 / 4',
      'inline-size': '100%',
    });
  });

  it('merges all classNames', () => {
    const { getByTestSubject } = render(
      <EuiAspectRatio height={4} width={9} className="hello">
        <div data-test-subj="child" className="world" />
      </EuiAspectRatio>
    );

    const finalDiv = getByTestSubject('child');
    expect(finalDiv).toHaveClass('euiAspectRatio');
    expect(finalDiv).toHaveClass('hello');
    expect(finalDiv).toHaveClass('world');
  });

  test('maxWidth', () => {
    const { getByTestSubject } = render(
      <EuiAspectRatio height={16} width={9} maxWidth={500}>
        <div data-test-subj="child" />
      </EuiAspectRatio>
    );

    expect(getByTestSubject('child')).toHaveStyle({
      maxInlineSize: '500px',
    });
  });
});
