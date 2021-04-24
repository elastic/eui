import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCode,
} from '../../../../src/components';

import { ThemeValue } from './_values';

export default () => {
  const { euiTheme } = useEuiTheme();
  const border = euiTheme.border;

  const style = css`
    width: ${euiTheme.size.l};
    height: ${euiTheme.size.l};
    border-radius: ${euiTheme.border.radiusSmall};
  `;

  return (
    <div>
      <EuiTitle>
        <h2>Border</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Basic properties</h3>
            <p>
              These basic properties make up the thickness, color and corner
              radii which can be used individually.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <ThemeValue
              property="border"
              name="widthThin"
              value={border.widthThin}
            />
            <ThemeValue
              property="border"
              name="widthThick"
              value={border.widthThick}
            />
            <ThemeValue property="border" name="color" value={border.color} />
            <ThemeValue property="border" name="radius" value={border.radius} />
            <ThemeValue
              property="border"
              name="radiusSmall"
              value={border.radiusSmall}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Common types</h3>
            <p>
              These common border types string together the base properties to
              form common full <EuiCode>border</EuiCode> properties.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <ThemeValue
              property="border"
              name="thin"
              value={border.thin}
              buttonStyle={[
                style,
                css`
                  border: ${border.thin};
                `,
              ]}
            />
            <ThemeValue
              property="border"
              name="thick"
              value={border.thick}
              buttonStyle={[
                style,
                css`
                  border: ${border.thick};
                `,
              ]}
            />
            <ThemeValue
              property="border"
              name="editable"
              value={border.editable}
              buttonStyle={[
                style,
                css`
                  border: ${border.editable};
                `,
              ]}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
