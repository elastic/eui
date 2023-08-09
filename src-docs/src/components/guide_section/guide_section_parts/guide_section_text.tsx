import React, { FunctionComponent, ReactNode } from 'react';

import {
  EuiSpacer,
  EuiTitle,
  EuiText,
  EuiBetaBadge,
} from '../../../../../src/components';

export const LANGUAGES = ['javascript', 'html'] as const;

type GuideSectionExampleText = {
  title?: ReactNode;
  id?: string;
  isBeta?: boolean;
  isNew?: boolean;
  children?: ReactNode;
  wrapText?: boolean;
};

export const GuideSectionExampleText: FunctionComponent<
  GuideSectionExampleText
> = ({ title, id, isBeta, isNew, children, wrapText = true }) => {
  let titleNode;

  if (title) {
    const badge = (isBeta || isNew) && (
      <EuiBetaBadge label={isBeta ? 'Beta' : 'New'} color="accent" size="s" />
    );

    titleNode = (
      <>
        <EuiTitle>
          <h2 id={id}>
            {title}
            {badge && <>&emsp;{badge}</>}
          </h2>
        </EuiTitle>
        <EuiSpacer size="m" />
      </>
    );
  }

  let textNode = children;

  if (children && wrapText) {
    textNode = <EuiText>{children}</EuiText>;
  }

  return (
    <>
      {titleNode}
      {textNode}
    </>
  );
};
