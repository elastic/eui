import React from 'react';

import { EuiCode, EuiLink, EuiText } from '../../../../src/components';

export default () => (
  <EuiText>
    <p>
      Open the{' '}
      <EuiLink href="http://www.elastic.co" target="_blank">
        Elastic website
      </EuiLink>{' '}
      in a new tab. Setting <EuiCode>target=&ldquo;_blank&rdquo;</EuiCode> also
      defaults to <EuiCode>{'external={true}'}</EuiCode>.
    </p>
    <p>
      This{' '}
      <EuiLink href="http://www.elastic.co" external>
        link
      </EuiLink>{' '}
      has the <EuiCode>external</EuiCode> prop set to true.
    </p>
    <p>
      This link is actually a <EuiLink onClick={() => {}}>button</EuiLink> with
      an onClick handler.
    </p>
    <p>
      Here is an example of a{' '}
      <EuiLink
        href="https://github.com/elastic/eui"
        onClick={(e) => {
          e.preventDefault();
        }}>
        link
      </EuiLink>{' '}
      with both an <EuiCode>href</EuiCode> and an <EuiCode>onClick</EuiCode>{' '}
      handler.
    </p>
    <p>Links can be colored as well.</p>
    <ul>
      <li>
        <EuiLink color="subdued" href="#">
          subdued
        </EuiLink>
      </li>
      <li>
        <EuiLink color="success" href="#">
          success
        </EuiLink>
      </li>
      <li>
        <EuiLink color="accent" href="#">
          accent
        </EuiLink>
      </li>
      <li>
        <EuiLink color="danger" href="#">
          danger
        </EuiLink>
      </li>
      <li>
        <EuiLink color="warning" href="#">
          warning
        </EuiLink>
      </li>
      <li>
        <EuiLink color="text" href="#">
          text
        </EuiLink>
      </li>
      <li>
        <span style={{ background: 'black' }}>
          <EuiLink color="ghost" href="#">
            ghost
          </EuiLink>
        </span>
      </li>
    </ul>
  </EuiText>
);
