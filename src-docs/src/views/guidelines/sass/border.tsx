import React from 'react';
import {
  EuiFlexItem,
  EuiCode,
  EuiCodeBlock,
  EuiFlexGrid,
  EuiSpacer,
  EuiText,
} from '../../../../../src';

const euiBorders = ['euiBorderThin', 'euiBorderThick', 'euiBorderEditable'];

function renderBorder(border: string) {
  return (
    <EuiFlexItem
      key={border}
      className={`guideSass__border guideSass__border--${border}`}
    >
      <EuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        border: ${border}
      </EuiCodeBlock>
    </EuiFlexItem>
  );
}

export const Border = () => {
  return (
    <>
      <EuiText grow={false}>
        <p>
          EUI provides some helper variables for setting common border types.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        {euiBorders.map(function (border) {
          return renderBorder(border);
        })}
      </EuiFlexGrid>

      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          In addition, you can utilize <EuiCode>$euiBorderRadius</EuiCode> or{' '}
          <EuiCode>$euiBorderRadiusSmall</EuiCode> to round the corners.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem className="guideSass__border guideSass__border--radius">
          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none"
          >
            {`border: $euiBorderThin;
border-radius: $euiBorderRadius;`}
          </EuiCodeBlock>
        </EuiFlexItem>
        <EuiFlexItem className="guideSass__border guideSass__border--radiusSmall">
          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none"
          >
            {`border: $euiBorderThin;
border-radius: $euiBorderRadiusSmall;`}
          </EuiCodeBlock>
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
