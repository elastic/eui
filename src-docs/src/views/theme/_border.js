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
  EuiCopy,
  EuiCode,
} from '../../../../src/components';

import { SizeSquare } from './_size';

const Values = ({ name, value, example, groupProps }) => {
  return (
    <EuiFlexItem key={name} grow={false}>
      <EuiFlexGroup responsive={false} alignItems="center" {...groupProps}>
        {example && (
          <EuiFlexItem grow={false}>
            <EuiCopy
              beforeMessage="Click to copy full theme variable"
              textToCopy={`euiTheme.size.${name}`}>
              {(copy) => <button onClick={copy}>{example}</button>}
            </EuiCopy>
          </EuiFlexItem>
        )}
        <EuiFlexItem grow={true}>
          <EuiText size="s">
            <EuiCode transparentBackground>{name}</EuiCode>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="s" color="subdued">
            <p>
              <code>{value}</code>
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
};

export default () => {
  const { euiTheme } = useEuiTheme();
  const border = euiTheme.border;

  return (
    <div>
      <EuiTitle>
        <h2>Borders</h2>
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
            <Values name="widthThin" value={border.widthThin} />
            <Values name="widthThick" value={border.widthThick} />
            <Values name="color" value={border.color} />
            <Values name="radius" value={border.radius} />
            <Values name="radiusSmall" value={border.radiusSmall} />
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
            <EuiFlexGroup direction="column" gutterSize="s">
              <SizeSquare
                name="thin"
                size={euiTheme.size.l}
                value={border.thin}
                buttonStyle={css`
                  border: ${border.thin};
                  background: transparent;
                `}
              />
              <SizeSquare
                name="thick"
                size={euiTheme.size.l}
                value={border.thick}
                buttonStyle={css`
                  border: ${border.thick};
                  background: transparent;
                `}
              />
              <SizeSquare
                name="editable"
                size={euiTheme.size.l}
                value={border.editable}
                buttonStyle={css`
                  border: ${border.editable};
                  background: transparent;
                `}
              />
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
