import React from 'react';

import { EuiCollapsibleNavGroup } from '../../../../src/components/collapsible_nav';
import { EuiText } from '../../../../src/components/text';
import { EuiCode } from '../../../../src/components/code';

export default () => (
  <>
    <EuiCollapsibleNavGroup>
      <EuiText size="s" color="subdued">
        <p>This is a basic group without any modifications</p>
      </EuiText>
    </EuiCollapsibleNavGroup>
    <EuiCollapsibleNavGroup
      data-test-subj="TEST"
      title="Nav group"
      iconType="logoElastic"
    >
      <EuiText size="s" color="subdued">
        <p>
          This is a nice group with a heading supplied via{' '}
          <EuiCode>title</EuiCode> and <EuiCode>iconType</EuiCode>.
        </p>
      </EuiText>
    </EuiCollapsibleNavGroup>
    <EuiCollapsibleNavGroup
      data-test-subj="TEST"
      background="light"
      title="Nav group"
      isCollapsible={true}
      iconType="logoElastic"
      initialIsOpen={true}
    >
      <EuiText size="s" color="subdued">
        <p>
          This group is <EuiCode>collapsible</EuiCode> and set with{' '}
          <EuiCode>initialIsOpen</EuiCode>. It has a heading that is the
          collapsing button via <EuiCode>title</EuiCode> and{' '}
          <EuiCode>iconType</EuiCode>.
        </p>
      </EuiText>
    </EuiCollapsibleNavGroup>
    <EuiCollapsibleNavGroup
      title="Nav group"
      iconType="logoGCPMono"
      iconSize="xxl"
      titleSize="s"
      isCollapsible={true}
      initialIsOpen={false}
      background="dark"
    >
      <EuiText size="s">
        <p>
          This is a <EuiCode>dark</EuiCode> <EuiCode>collapsible</EuiCode> group
          that is initally set to closed,{' '}
          <EuiCode>iconSize=&quot;xxl&quot;</EuiCode> and{' '}
          <EuiCode>titleSize=&quot;s&quot;</EuiCode>.
        </p>
      </EuiText>
    </EuiCollapsibleNavGroup>
  </>
);
