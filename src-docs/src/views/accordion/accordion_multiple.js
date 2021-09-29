import React from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiSpacer,
  EuiPanel,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const multipleAccordionsId__1 = useGeneratedHtmlId({
    prefix: 'multipleAccordions',
    suffix: 'first',
  });
  const multipleAccordionsId__2 = useGeneratedHtmlId({
    prefix: 'multipleAccordions',
    suffix: 'second',
  });
  const multipleAccordionsId__3 = useGeneratedHtmlId({
    prefix: 'multipleAccordions',
    suffix: 'third',
  });
  const multipleAccordionsId__4 = useGeneratedHtmlId({
    prefix: 'multipleAccordions',
    suffix: 'fourth',
  });

  return (
    <div>
      <EuiAccordion
        id={multipleAccordionsId__1}
        buttonContent="An accordion with padding applied through props"
        paddingSize="l"
      >
        <EuiText size="s">
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
        </EuiText>
      </EuiAccordion>

      <EuiSpacer />

      <EuiAccordion
        id={multipleAccordionsId__2}
        buttonContent="A second accordion with padding and a very long title that should truncate because of eui-textTruncate"
        buttonContentClassName="eui-textTruncate"
        paddingSize="l"
      >
        <EuiText size="s">
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
        </EuiText>
      </EuiAccordion>

      <EuiSpacer />

      <EuiAccordion
        id={multipleAccordionsId__3}
        buttonContent="A third accordion with a nested accordion"
        paddingSize="m"
      >
        <EuiText size="s">
          <p>
            This content area will grow to accommodate when the accordion below
            opens
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiAccordion
          id={multipleAccordionsId__4}
          buttonContent="A fourth nested accordion"
        >
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </EuiPanel>
        </EuiAccordion>
      </EuiAccordion>
    </div>
  );
};
