import { css } from '@emotion/react';
import React from 'react';

import { EuiCode, logicalCSS, logicalStyle, logicals } from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
  return (
    <>
      <ThemeExample
        title={<code>{"logicalCSS('property', 'value')"}</code>}
        description={
          <p>
            Returns the <strong>string version</strong> of the logical CSS
            property version for the given{' '}
            <EuiCode language="css">property: value</EuiCode> pair.
          </p>
        }
        example={
          <p css={[logicalCSS('margin-bottom', '160px')]}>
            <code>{logicalCSS('margin-bottom', '160px')}</code>
          </p>
        }
        snippet={"${logicalCSS('margin-bottom', '160px')}"}
      />

      <ThemeExample
        title={<code>{"logicalStyle('property', 'value')"}</code>}
        description={
          <p>
            Returns the <strong>object version</strong> logical CSS property
            version for the given{' '}
            <EuiCode language="css">property: value</EuiCode> pair.
          </p>
        }
        example={
          <p style={logicalStyle('margin-bottom', '160px')}>
            <code>
              {Object.entries(logicalStyle('margin-bottom', '160px'))[0][0]}:{' '}
              {Object.entries(logicalStyle('margin-bottom', '160px'))[0][1]};
            </code>
          </p>
        }
        snippet={"${logicalCSS('margin-bottom', '160px')}"}
      />

      <ThemeExample
        title={<code>{"logicals['property']"}</code>}
        description={
          <p>
            An object that contains the logical property equivelant of the given{' '}
            <EuiCode language="css">property</EuiCode>
          </p>
        }
        example={
          <p
            css={css`
              ${logicals['padding-left']}: 160px;
            `}
          >
            <code>{`${logicals['padding-left']}: 160px`}</code>
          </p>
        }
        snippet={"${logicals['padding-left']}: 160px;"}
      />
    </>
  );
};
