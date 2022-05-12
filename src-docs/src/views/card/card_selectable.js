import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [card1Selected, setCard1] = useState(true);
  const [card2Selected, setCard2] = useState(false);

  const card1Clicked = () => {
    setCard1(!card1Selected);
  };

  const card2Clicked = () => {
    setCard2(!card2Selected);
  };

  const detailsClicked = (e) => {
    e.stopPropagation();
  };

  return (
    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xxl" type="logoSketch" />}
          title="Sketch"
          description="Example of a short card description."
          footer={
            <EuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Sketch"
            >
              More details
            </EuiButtonEmpty>
          }
          selectable={{
            onClick: card1Clicked,
            isSelected: card1Selected,
          }}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xxl" type="logoGCP" />}
          title="Google"
          description="Example of a longer card description. See how the footers stay lined up."
          footer={
            <EuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Google"
            >
              More details
            </EuiButtonEmpty>
          }
          selectable={{
            onClick: card2Clicked,
            isSelected: card2Selected,
          }}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xxl" type="logoAerospike" />}
          title="Not Adobe"
          description="Example of a short card description."
          footer={
            <EuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Not Adobe"
            >
              More details
            </EuiButtonEmpty>
          }
          selectable={{
            onClick: () => {},
            isDisabled: true,
          }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
