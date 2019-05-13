import React, { Fragment } from 'react';

import { EuiEmptyPrompt, EuiButton } from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="editorStrike"
    title={<h2>You have no spice</h2>}
    body={
      <Fragment>
        <p>
          Navigators use massive amounts of spice to gain a limited form of
          prescience. This allows them to safely navigate interstellar space,
          enabling trade and travel throughout the galaxy.
        </p>
        <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
      </Fragment>
    }
    actions={
      <EuiButton color="primary" fill>
        Harvest spice
      </EuiButton>
    }
  />
);
