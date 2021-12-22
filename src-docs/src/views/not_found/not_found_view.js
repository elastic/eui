import React from 'react';

import { Link } from 'react-router-dom';
import { EuiPageContent, EuiEmptyPrompt } from '../../../../src';

export const NotFoundView = () => (
  <EuiPageContent position="center" panelled={false}>
    <EuiEmptyPrompt
      title={<h1>404</h1>}
      color="plain"
      body={
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
      }
    />
  </EuiPageContent>
);
