import React, { FunctionComponent } from 'react';
import { EuiCopy } from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export const LANGUAGES = ['javascript', 'html'] as const;

type UtilityClassesSection = ThemeExample & {
  code: string;
};

export const UtilityClassesSection: FunctionComponent<
  UtilityClassesSection
> = ({ code, ...rest }) => {
  return (
    <ThemeExample
      title={
        <EuiCopy textToCopy={code}>
          {(copy) => (
            <button onClick={copy}>
              <strong>
                <code>{code}</code>
              </strong>
            </button>
          )}
        </EuiCopy>
      }
      {...rest}
    />
  );
};
