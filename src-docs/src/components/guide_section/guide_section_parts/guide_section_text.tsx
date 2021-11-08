import React, { FunctionComponent, ReactNode } from 'react';
import { EuiSpacer } from '../../../../../src/components/spacer';
import { EuiTitle } from '../../../../../src/components/title';
import { EuiText } from '../../../../../src/components/text';

export const LANGUAGES = ['javascript', 'html'] as const;

type GuideSectionExampleText = {
  title?: ReactNode;
  children?: ReactNode;
  wrapText?: boolean;
};

export const GuideSectionExampleText: FunctionComponent<GuideSectionExampleText> = ({
  title,
  children,
  wrapText = true,
}) => {
  let titleNode;

  if (title) {
    titleNode = (
      <>
        <EuiSpacer />
        <EuiTitle>
          <h2>{title}</h2>
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
