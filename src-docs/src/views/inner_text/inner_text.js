import React from 'react';

import { EuiInnerText } from '../../../../src/components/inner_text';

import {
  EuiBadge,
  EuiCode,
  EuiHighlight,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <React.Fragment>
    <EuiInnerText>
      {(ref, innerText) => (
        <React.Fragment>
          <span ref={ref} title={innerText}>
            Simple string content
          </span>
          <EuiIcon type="sortRight" />
          <EuiCode>{innerText}</EuiCode>
        </React.Fragment>
      )}
    </EuiInnerText>

    <EuiSpacer />

    <EuiInnerText>
      {(ref, innerText) => (
        <React.Fragment>
          <span ref={ref} title={innerText}>
            <EuiHighlight search="content">EuiHighlight content </EuiHighlight>
            <EuiBadge>with EuiBadge</EuiBadge>
          </span>
          <EuiIcon type="sortRight" />
          <EuiCode>{innerText}</EuiCode>
        </React.Fragment>
      )}
    </EuiInnerText>
  </React.Fragment>
);
