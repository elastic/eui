import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCard,
  EuiTitle,
  EuiSpacer,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiHorizontalRule,
  EuiText,
} from '../../../../src/components';

const dataSources = [
  { name: 'Apache logs', icon: 'logoApache' },
  { name: 'Apache metrics', icon: 'logoApache' },
  { name: 'Redis', icon: 'logoRedis' },
  { name: 'Nginx logs', icon: 'logoNginx' },
  { name: 'Nginx metrics', icon: 'logoNginx' },
  { name: 'Kubernetes', icon: 'logoKubernetes' },
  { name: 'MySQL', icon: 'logoMySQL' },
  { name: 'Docker', icon: 'logoDocker' }
];

export const Step4 = ({
  onSelection,
}) => {
  return (
    <div className="euiAnimateContentLoad">
      <EuiTitle>
        <h4>Apply and name this lifecycle template</h4>
      </EuiTitle>
      <EuiSpacer />

      <EuiFormRow label="Template name">
        <EuiFieldText value="Dave is getting sleepy" />
      </EuiFormRow>

      <EuiFormRow label="Apply against these indices">
        <EuiFieldText value="dave.is.sleepy.*" />
      </EuiFormRow>

      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiIcon type="checkInCircleFilled" color="secondary" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>4 matching indices will use this template</h3>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiText size="s">
        <ul>
          <li>dave.is.sleepy.onStep1</li>
          <li>dave.is.sleepy.onStep2</li>
          <li>dave.is.sleepy.onStep4</li>
          <li>dave.is.sleepy.onStep4</li>
        </ul>
      </EuiText>

      <EuiHorizontalRule className="ilmHrule" />

      <EuiButton fill color="secondary" iconType="check">
        Apply and save this template
      </EuiButton>
    </div>
  );
};
