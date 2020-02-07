import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

import { EuiCodeBlockImpl } from './_code_block';
import { EuiCodeSharedProps, HTMLCodeElement } from './code';

export interface EuiCodeBlockProps extends EuiCodeSharedProps {
  inline?: false;
}

type Props = CommonProps & EuiCodeBlockProps & HTMLAttributes<HTMLCodeElement>;

export const EuiCodeBlock: FunctionComponent<Props> = ({ inline, ...rest }) => {
  return <EuiCodeBlockImpl inline={false} {...rest} />;
};
