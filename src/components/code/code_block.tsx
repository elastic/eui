import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

import { EuiCodeBlockImpl } from './_code_block';
import { EuiCodeSharedProps } from './code';

interface OwnProps extends EuiCodeSharedProps {
  inline?: false;
  showLineNumbers?: false;
}

export type EuiCodeBlockProps = CommonProps &
  OwnProps &
  HTMLAttributes<HTMLElement>;

export const EuiCodeBlock: FunctionComponent<EuiCodeBlockProps> = ({
  inline,
  showLineNumbers,
  ...rest
}) => {
  return (
    <EuiCodeBlockImpl
      inline={false}
      showLineNumbers={showLineNumbers}
      {...rest}
    />
  );
};
