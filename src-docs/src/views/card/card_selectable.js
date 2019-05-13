import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card1Selected: true,
      card2Selected: false,
    };
  }

  card1Clicked = () => {
    this.setState({
      card1Selected: !this.state.card1Selected,
    });
  };

  card2Clicked = () => {
    this.setState({
      card2Selected: !this.state.card2Selected,
    });
  };

  render() {
    const cardFooterContent = (
      <EuiButtonEmpty iconType="iInCircle" size="xs">
        More details
      </EuiButtonEmpty>
    );

    return (
      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xxl" type="logoSketch" />}
            title="Sketch"
            description="Example of a short card description."
            footer={cardFooterContent}
            selectable={{
              onClick: this.card1Clicked,
              isSelected: this.state.card1Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xxl" type="logoGCP" />}
            title="Google"
            description="Example of a longer card description. See how the footers stay lined up."
            footer={cardFooterContent}
            selectable={{
              onClick: this.card2Clicked,
              isSelected: this.state.card2Selected,
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xxl" type="logoAerospike" />}
            title="Not Adobe"
            description="Example of a short card description."
            footer={cardFooterContent}
            selectable={{
              onClick: () => {},
              isDisabled: true,
            }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
