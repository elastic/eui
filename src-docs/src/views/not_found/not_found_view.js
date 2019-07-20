import React from 'react';

import { Link } from 'react-router';
import { EuiText } from '../../../../src/components/text';

export const NotFoundView = () => (
  <div className="guideContentPage">
    <div className="guideContentPage__content">
      <EuiText>
        <h1 className="guideTitle">404</h1>

        <p className="guideText">
          You visited a page which doesn&rsquo;t exist, causing <em>this</em>{' '}
          page to exist. This page thanks you for summoning it into existence
          from the raw fabric of reality, but it thinks you may find another
          page more interesting. Might it suggest the{' '}
          {
            <Link className="guideLink" to="/">
              home page
            </Link>
          }
          ?
        </p>
      </EuiText>
    </div>
  </div>
);
