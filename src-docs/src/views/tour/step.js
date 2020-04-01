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
        onSkip={() => alert('Skip the tour!')}
        onEnd={() => alert('End the tour!')}
        step={1}
        stepsTotal={1}
        title="An individual step"
        subtitle="A tour"
        anchorPosition="rightUp">
        <EuiText>
          <p>The tour step anchor point.</p>
        </EuiText>
      </EuiTourStep>
      <EuiSpacer size="xxl" />
    </div>
  );
};
