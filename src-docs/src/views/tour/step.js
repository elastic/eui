import React from 'react';

import { EuiText, EuiSpacer, EuiTourStep } from '../../../../src/components';

export default () => {
  return (
    <div>
      <EuiTourStep
        content={
          <EuiText>
            <p>The tour step content.</p>
          </EuiText>
        }
        isStepOpen={true}
        isTourActive={true}
        minWidth={300}
        onFinish={() => alert('Done!')}
        step={1}
        stepsTotal={1}
        title="Title of the current step"
        subtitle="Title of the full tour"
        anchorPosition="rightUp">
        <EuiText>
          <p>The tour step anchor point.</p>
        </EuiText>
      </EuiTourStep>
      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />
    </div>
  );
};
