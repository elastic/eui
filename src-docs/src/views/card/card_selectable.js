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

  detailsClicked = e => {
    e.stopPropagation();
    console.log('Details clicked');
  };

  render() {
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
                onClick={e => {
                  e.stopPropagation();
                }}
                aria-label="See more details about Sketch">
                More details
              </EuiButtonEmpty>
            }
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
            footer={
              <EuiButtonEmpty
                iconType="iInCircle"
                size="xs"
                onClick={this.detailsClicked}
                aria-label="See more details about Google">
                More details
              </EuiButtonEmpty>
            }
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
            footer={
              <EuiButtonEmpty
                iconType="iInCircle"
                size="xs"
                onClick={this.detailsClicked}
                aria-label="See more details about Not Adobe">
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
  }
}
