import React, {
  Component,
} from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageSideBar,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiStepsHorizontal,
} from '../../../../src/components';

import { Step1 } from './ilm_step1';
import { Step2 } from './ilm_step2';
import Step3 from './ilm_step3';

import {
  KibanaChrome,
  ManagementSideNav,
} from '../partials';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      selectedStep: 1,
    };

    this.onSelectedStepChanged = this.onSelectedStepChanged.bind(this);
  }

  onSelectedStepChanged = selectedStep => {
    this.setState({
      selectedStep,
    });
  }

  renderContent() {
    if (this.state.selectedStep === 1) {
      return (
        <Step1 onSelection={() => this.onSelectedStepChanged(2)} />
      );
    }

    if (this.state.selectedStep === 2) {
      return (
        <Step2 onSelection={() => this.onSelectedStepChanged(3)} />
      );
    }

    if (this.state.selectedStep === 3) {
      return (
        <Step3 onSelection={() => this.onSelectedStepChanged(4)} />
      );
    }

    if (this.state.selectedStep === 4) {
      return (
        <div>4</div>
      );
    }

  }

  renderPage() {

    const steps = [
      {
        title: 'Select data source',
        isSelected: this.state.selectedStep === 1,
        isComplete: this.state.selectedStep > 1,
        onClick: () => this.onSelectedStepChanged(1)
      },
      {
        title: 'Lifecycle phases',
        isSelected: this.state.selectedStep === 2,
        isComplete: this.state.selectedStep > 2,
        onClick: () => this.onSelectedStepChanged(2)
      },
      {
        title: 'Review template',
        isSelected: this.state.selectedStep === 3,
        isComplete: this.state.selectedStep > 3,
        onClick: () => this.onSelectedStepChanged(3)
      },
      {
        title: 'Apply and save',
        isSelected: this.state.selectedStep === 4,
        onClick: () => this.onSelectedStepChanged(4)
      },
    ];

    return (
      <EuiPage>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Management</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageBody>
          <EuiPageSideBar>
            <ManagementSideNav />
          </EuiPageSideBar>

          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiText>
                  <h2>Create a policy</h2>
                </EuiText>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>

            <EuiPageContentBody>
              <EuiStepsHorizontal
                steps={steps}
              />
              <EuiSpacer size="m" />

              {this.renderContent()}

            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }

  render() {
    return (
      <KibanaChrome>
        {this.renderPage()}
      </KibanaChrome>
    );
  }
}
