import React, { Fragment } from 'react';

import { ExternalBadge } from './shared';

import { EuiCode } from '../../../../src/components';
import { TextureMultiSeriesChart } from './texture';

export const ElasticChartsAccessiblityExample = {
  title: 'Accessibility Features in Elastic Charts',
  intro: (
    <Fragment>
      <ExternalBadge />
    </Fragment>
  ),
  sections: [
    {
      text: (
        <Fragment>
          <p>
            Elastic charts is becoming more and more accessible for users of
            assistive technologies.
          </p>

          <p>
            <strong>Available a11y configurations</strong>
          </p>
          <ul>
            <li>
              <EuiCode language="js">ariaDescription/ariaDescribedBy</EuiCode>
            </li>
            <li>
              <EuiCode language="js">ariaLabel/ariaLabelledBy</EuiCode>
            </li>
            <li>
              <EuiCode language="js">ariaLabelHeadingLevel</EuiCode>
            </li>
            <li>
              <EuiCode language="js">
                ariaUseDefaultSummary/ariaTableCaption
              </EuiCode>
            </li>
            <li>
              <EuiCode language="js">texture</EuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <TextureMultiSeriesChart />,
    },
    {
      title: 'ariaDescription/ariaDescribedBy',
      text: (
        <>
          The ariaDescription and ariaDescribedBy can be set via the through the{' '}
          <EuiCode>{'<Settings />'}</EuiCode> component.
        </>
      ),
    },
    {
      title: 'ariaLabel/ariaLabelledBy',
      text: (
        <>
          <p>The ariaDescription can be set via the `Settings` component</p>
        </>
      ),
    },
    {
      title: 'ariaLabelHeadingLevel',
      text: (
        <>
          <p>The ariaDescription can be set via the `Settings` component</p>
        </>
      ),
    },
    {
      title: 'ariaUseDefaultSummary/ariaTableCaption',
      text: (
        <>
          <p>The ariaDescription can be set via the `Settings` component</p>
        </>
      ),
    },
    {
      title: 'Texture',
      text: (
        <>
          <p>
            You can set the fill for area charts with texture
            https://github.com/elastic/elastic-charts/pull/1138
          </p>
        </>
      ),
    },
  ],
};
