import React from 'react';
import {
  EuiPanel,
  EuiText,
  EuiCode,
  EuiComment,
} from '../../../../src/components/';

const body = (
  <EuiText size="s">
    <p>
      This is the body of a comment of type <EuiCode>regular</EuiCode>
    </p>
  </EuiText>
);

export default () => (
  <div>
    <EuiComment username="andred" event="added a comment" timestamp="yesterday">
      {body}
    </EuiComment>
    <EuiComment
      username="milal"
      type="update"
      event={
        <>
          edited a comment of type <EuiCode>update</EuiCode>
        </>
      }
      timestamp="6 hours ago"
    />
    <EuiComment username="luisg" type="custom">
      <EuiPanel hasBorder>
        <p>
          I am a comment of type <EuiCode>custom</EuiCode>.
        </p>
      </EuiPanel>
    </EuiComment>
  </div>
);
