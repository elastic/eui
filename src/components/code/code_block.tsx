import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

import { EuiCodeBlockImpl } from './_code_block';
import { EuiCodeSharedProps } from './code';

export interface EuiCodeBlockProps extends EuiCodeSharedProps {
  inline?: false;
}

type Props = CommonProps & EuiCodeBlockProps & HTMLAttributes<HTMLElement>;

export const EuiCodeBlock: FunctionComponent<Props> = ({ inline, ...rest }) => {
  return <EuiCodeBlockImpl inline={false} {...rest} />;
};
