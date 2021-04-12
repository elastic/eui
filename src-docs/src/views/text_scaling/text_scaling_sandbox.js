import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSection } from '../../components';
import { EuiText, EuiSpacer } from '../../../../src/components';

import TextScaling from './text_scaling';

export default () => (
  <>
    <GuideSection
      wrapText={false}
      text={
        <>
          <EuiText grow={false}>
            <p>
              This demo shows off{' '}
              <Link to="/display/text">
                <strong>EuiText</strong>
              </Link>{' '}
              scaling in both the default and small sizes. The goal is that the
              bottom of every text line should hit one of the 8px or 7px grid
              lines. This is for development only. Do not copy this code into a
              production environment.
            </p>
          </EuiText>
          <EuiSpacer size="xl" />
          <TextScaling />
        </>
      }
    />
  </>
);
