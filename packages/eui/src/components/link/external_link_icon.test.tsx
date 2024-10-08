/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiExternalLinkIcon } from './external_link_icon';

// Note - the icon is not actually text, but it's mocked as such
describe('EuiExternalLinkIcon', () => {
  shouldRenderCustomStyles(<EuiExternalLinkIcon external={true} />);

  it('always renders the icon if `external` is true', () => {
    const { container } = render(<EuiExternalLinkIcon external={true} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="emotion-EuiExternalLinkIcon"
          data-euiicon-type="popout"
          role="presentation"
        />
        <span
          class="emotion-euiScreenReaderOnly"
        >
          (external)
        </span>
      </div>
    `);
  });

  describe('target="_blank"', () => {
    it('renders the icon by default, along with screen reader text', () => {
      const { container } = render(<EuiExternalLinkIcon target="_blank" />);
      expect(container).toMatchInlineSnapshot(`
        <div>
          <span
            class="emotion-EuiExternalLinkIcon"
            data-euiicon-type="popout"
            role="presentation"
          />
          <span
            class="emotion-euiScreenReaderOnly"
          >
            (external, opens in a new tab or window)
          </span>
        </div>
      `);
    });

    it('hides the icon if `external` is false, but still shows the screen reader text', () => {
      const { container } = render(
        <EuiExternalLinkIcon target="_blank" external={false} />
      );
      expect(container).toMatchInlineSnapshot(`<div />`);
    });
  });

  it('renders nothing if neither external nor target="_blank" are set', () => {
    const { container } = render(<EuiExternalLinkIcon />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it('allows configuring the icon props', () => {
    const { getByTestSubject } = render(
      <EuiExternalLinkIcon
        external={true}
        data-test-subj="test"
        size="xl"
        color="text"
      />
    );
    expect(getByTestSubject('test')).toBeInTheDocument();
  });
});
