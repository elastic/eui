import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiImage, EuiSwitch, EuiPanel } from '../../../../../src';

import contentSvg from '../../../images/content.svg';

import PageContent from './page_content';

export const PageContentDemo: FunctionComponent = () => {
  const [restrictWidth, setRestrictWidth] = useState(false);

  const content = (
    <EuiImage size="fullWidth" alt="Fake paragraph" url={contentSvg} />
  );

  return (
    <>
      <div className={classNames('guideDemo__highlightLayout')}>
        <PageContent content={content} restrictWidth={restrictWidth} />
      </div>
      <EuiPanel hasBorder="1px 0" borderRadius="none">
        <EuiSwitch
          label="Restrict width"
          checked={restrictWidth}
          onChange={() => setRestrictWidth((r) => !r)}
        />
      </EuiPanel>
    </>
  );
};
