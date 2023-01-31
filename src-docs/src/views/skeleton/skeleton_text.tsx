import React, { useState } from 'react';
import { css } from '@emotion/react';

import {
  EuiSkeletonText,
  EuiText,
  EuiSwitch,
  EuiButtonGroup,
  EuiSpacer,
  EuiFlexGroup,
} from '../../../../src/components';

type TextSizes = 'm' | 's' | 'xs' | 'relative';

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState<TextSizes>('m');

  return (
    <>
      <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
        <EuiSwitch
          label="Toggle loaded state"
          checked={isLoading}
          onChange={() => setIsLoading(!isLoading)}
        />
        <EuiButtonGroup
          legend="Change text size"
          idSelected={size}
          onChange={(optionId) => {
            setSize(optionId as TextSizes);
          }}
          options={[
            { label: 'Medium', id: 'm' },
            { label: 'Small', id: 's' },
            { label: 'Extra small', id: 'xs' },
            { label: 'Relative', id: 'relative' },
          ]}
        />
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiSkeletonText
        lines={3}
        size={size}
        isLoading={isLoading}
        contentAriaLabel="Demo skeleton text"
      >
        <EuiText
          // Trim text to 3 lines to visually match the skeleton lines
          css={css`
            text-overflow: ellipsis;
            overflow: hidden;
            line-clamp: 3;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          `}
          size={size}
        >
          <p>
            Far out in the uncharted backwaters of the unfashionable end of the
            western spiral arm of the Galaxy lies a small unregarded yellow sun.
            Orbiting this at a distance of roughly ninety-two million miles is
            an utterly insignificant little blue green planet whose
            ape-descended life forms are so amazingly primitive that they still
            think digital watches are a pretty neat idea.
          </p>
        </EuiText>
      </EuiSkeletonText>
    </>
  );
};
