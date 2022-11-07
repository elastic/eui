import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../src';

export default () => {
  const [card1Selected, setCard1] = useState(true);
  const [card2Selected, setCard2] = useState(false);

  const card1Clicked = () => {
    setCard1(!card1Selected);
  };

  const card2Clicked = () => {
    setCard2(!card2Selected);
  };

  const detailsClicked = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  return (
    <>
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

      <EuiSpacer size="xxl" />

      <EuiFlexGrid gutterSize="l" columns={3}>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xxl" type="search" />}
            title="Custom query"
            description="Use KQL or Lucene to detect issues across indices."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xxl" type="machineLearningApp" />}
            title="Machine Learning"
            description="Select ML job to detect anomalous activity."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xxl" type="search" />}
            title="Threshold"
            description="Aggregate query results to detect when number of matches exceeds threshold."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xxl" type="search" />}
            title="Event Correlation"
            description="Use Event Query Language (EQL) to match events, generate sequences, and stack data."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xxl" type="search" />}
            title="Indicator Match"
            description="Use indicators from intelligence sources to detect matching events and alerts."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xxl" type="search" />}
            title="New Terms"
            description="Find documents with values appearing for the first time."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiSpacer size="xxl" />

      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="l" type="search" />}
            title="Custom query"
            description="Use KQL or Lucene to detect issues across indices."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="l" type="machineLearningApp" />}
            title="Machine Learning"
            description="Select ML job to detect anomalous activity."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="l" type="search" />}
            title="Threshold"
            description="Aggregate query results to detect when number of matches exceeds threshold."
            selectable={{
              onClick: card1Clicked,
              isSelected: card1Selected,
            }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
