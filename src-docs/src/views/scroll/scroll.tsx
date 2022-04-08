import { css } from '@emotion/react';
import React from 'react';

import { EuiPanel, useEuiScrollBar, useEuiTheme } from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeExample
      title={<code>useEuiScrollBar()</code>}
      description={
        <p>
          Set scroll bar appearance on Chrome (and firefox). All parameters are
          optional and default to specific global settings.
        </p>
      }
      examplePanel={{
        paddingSize: 'none',
      }}
      example={
        <div
          css={css`
            ${useEuiScrollBar()}
            overflow-y: auto;
            height: ${euiTheme.base * 10}px;
          `}
        >
          <EuiPanel color="transparent">
            <EuiPanel className="guideSass__shadow" color="primary" />
            <EuiPanel className="guideSass__shadow" color="primary" />
            <EuiPanel className="guideSass__shadow" color="primary" />
          </EuiPanel>
        </div>
      }
      snippet={'useEuiScrollBar()'}
    />
  );
};
