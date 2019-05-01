import React, { Component, Fragment } from 'react';

import {
  EuiButton,
  EuiTabbedContent,
  EuiTitle,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

class EuiTabsExample extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        id: 'cobalt',
        name: 'Cobalt',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiTitle>
              <h3>Cobalt</h3>
            </EuiTitle>
            <EuiText>
              Cobalt is a chemical element with symbol Co and atomic number 27.
              Like nickel, cobalt is found in the Earth&rsquo;s crust only in
              chemically combined form, save for small deposits found in alloys
              of natural meteoric iron. The free element, produced by reductive
              smelting, is a hard, lustrous, silver-gray metal.
            </EuiText>
          </Fragment>
        ),
      },
      {
        id: 'dextrose',
        name: 'Dextrose',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiTitle>
              <h3>Dextrose</h3>
            </EuiTitle>
            <EuiText>
              Intravenous sugar solution, also known as dextrose solution, is a
              mixture of dextrose (glucose) and water. It is used to treat low
              blood sugar or water loss without electrolyte loss.
            </EuiText>
          </Fragment>
        ),
      },
      {
        id: 'hydrogen',
        name: 'Hydrogen',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiTitle>
              <h3>Hydrogen</h3>
            </EuiTitle>
            <EuiText>
              Hydrogen is a chemical element with symbol H and atomic number 1.
              With a standard atomic weight of 1.008, hydrogen is the lightest
              element on the periodic table
            </EuiText>
          </Fragment>
        ),
      },
      {
        id: 'monosodium_glutammate',
        name: 'Monosodium Glutamate',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiTitle>
              <h3>Monosodium Glutamate</h3>
            </EuiTitle>
            <EuiText>
              Monosodium glutamate (MSG, also known as sodium glutamate) is the
              sodium salt of glutamic acid, one of the most abundant naturally
              occurring non-essential amino acids. Monosodium glutamate is found
              naturally in tomatoes, cheese and other foods.
            </EuiText>
          </Fragment>
        ),
      },
    ];

    this.state = {
      selectedTab: this.tabs[1],
    };
  }

  onTabClick = selectedTab => {
    this.setState({ selectedTab });
  };

  cycleTab = () => {
    const selectedTabIndex = this.tabs.indexOf(this.state.selectedTab);
    const nextTabIndex =
      selectedTabIndex < this.tabs.length - 1 ? selectedTabIndex + 1 : 0;
    this.setState({
      selectedTab: this.tabs[nextTabIndex],
    });
  };

  render() {
    return (
      <Fragment>
        <EuiButton
          iconType="arrowRight"
          iconSide="right"
          onClick={this.cycleTab}>
          Cycle through the tabs
        </EuiButton>

        <EuiSpacer size="m" />

        <EuiTabbedContent
          tabs={this.tabs}
          selectedTab={this.state.selectedTab}
          onTabClick={this.onTabClick}
        />
      </Fragment>
    );
  }
}

export default EuiTabsExample;
