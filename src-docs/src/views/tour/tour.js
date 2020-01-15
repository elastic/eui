import React, { Component } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiTextArea,
  EuiTour
} from '../../../../src/components';

// TODO could/should these be stored in a wrapper component/global scope?
const tourId = "abc123" // placeholder that could be used in global scope
const tourSubtitle = "Demo tour";
const tourPopoverWidth = 360;

const demoTourSteps = [
  {
    step: 1,
    title: 'Step 1',
    body: <span><p>Copy and paste this sample query.</p><EuiSpacer />
    <EuiCodeBlock language="html" paddingSize="s" isCopyable>
      { `SELECT email FROM “kibana_sample_data_ecommerce”` }
    </EuiCodeBlock>
    </span>,
    anchorRef: 'tourStep2',
  },
  {
    step: 2,
    title: 'Step 2',
    body: <p>Save your changes.</p>,
    anchorRef: 'tourStep1',
  },
];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO demo this in a global scope, pull from localStorage?
      currentTourStep: 1,
      isTourActive: true,
      isTourPopoverOpen: true,
      value:'',
    };
  }

  // TODO could this be built-in? e.g. do any time an EuiTour child is clicked
  incrementStep = () => {
    this.setState({
      currentTourStep: this.state.currentTourStep + 1,
    });
  }

  handleClick = () => {
    this.incrementStep();
  }

  resetTour = () => {
    this.setState({
      currentTourStep: 1,
      isTourActive: true,
      value:'',
    });
  }

  // TODO required for popover but would like to keep visible until child action
  // or 'Skip tour' is clicked. Handle this in tour.tsx?
  closeTourPopover() {
    return undefined;
  }

  skipTour() {
    this.setState({
      isTourActive: false,
    });
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    this.handleClick();
  };

  render() {

    return (
      <div>
        <EuiButtonEmpty iconType="refresh" flush="left" onClick={this.resetTour}>Reset tour</EuiButtonEmpty>
        <EuiSpacer />
        <EuiForm>
          <EuiFormRow label="Enter an ES SQL query">
            <EuiTour
              closePopover={this.closeTourPopover.bind(this)}
              content={demoTourSteps[0].body}
              isStepOpen={this.state.currentTourStep === 1}
              isTourActive={this.state.isTourActive}
              minWidth={tourPopoverWidth}
              skipOnClick={this.skipTour.bind(this)}
              step={1}
              subtitle={tourSubtitle}
              title={demoTourSteps[0].title}
              tourId={tourId}>
                <EuiTextArea
                  placeholder="Placeholder text"
                  aria-label="Enter ES SQL query"
                  value={this.state.value}
                  onChange={this.onChange}
                  style={{width: 400}}
                />
            </EuiTour>
          </EuiFormRow>

          <EuiSpacer />

          <EuiTour
            anchorPosition="rightUp"
            closePopover={this.closeTourPopover.bind(this)}
            content={demoTourSteps[1].body}
            isStepOpen={this.state.currentTourStep === 2}
            isTourActive={this.state.isTourActive}
            minWidth={tourPopoverWidth}
            skipOnClick={this.skipTour.bind(this)}
            step={2}
            subtitle={tourSubtitle}
            title={demoTourSteps[1].title}
            tourId={tourId}>
              <EuiButton
                onClick={this.handleClick}>
                Save query
              </EuiButton>
          </EuiTour>
        </EuiForm>
      </div>
    )
  }
};
