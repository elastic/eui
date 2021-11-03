import React, { Fragment, useState } from 'react';

import {
  EuiButton,
  EuiIcon,
  EuiTabbedContent,
  EuiText,
  EuiSpacer,
  EuiTabbedContentProps,
  EuiTabbedContentTab,
} from '../../../../src/components';

const tabs: EuiTabbedContentProps['tabs'] = [
  {
    id: 'cobalt',
    name: 'Cobalt',
    content: (
      <Fragment>
        <EuiSpacer />
        <EuiText>
          <p>
            Cobalt is a chemical element with symbol Co and atomic number 27.
            Like nickel, cobalt is found in the Earth&rsquo;s crust only in
            chemically combined form, save for small deposits found in alloys of
            natural meteoric iron. The free element, produced by reductive
            smelting, is a hard, lustrous, silver-gray metal.
          </p>
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
        <EuiText>
          <p>
            Intravenous sugar solution, also known as dextrose solution, is a
            mixture of dextrose (glucose) and water. It is used to treat low
            blood sugar or water loss without electrolyte loss.
          </p>
        </EuiText>
      </Fragment>
    ),
  },
  {
    id: 'hydrogen',
    name: 'Hydrogen',
    prepend: <EuiIcon type="heatmap" />,
    content: (
      <Fragment>
        <EuiSpacer />
        <EuiText>
          <p>
            Hydrogen is a chemical element with symbol H and atomic number 1.
            With a standard atomic weight of 1.008, hydrogen is the lightest
            element on the periodic table
          </p>
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
        <EuiText>
          <p>
            Monosodium glutamate (MSG, also known as sodium glutamate) is the
            sodium salt of glutamic acid, one of the most abundant naturally
            occurring non-essential amino acids. Monosodium glutamate is found
            naturally in tomatoes, cheese and other foods.
          </p>
        </EuiText>
      </Fragment>
    ),
  },
];

export default () => {
  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  const onTabClick = (selectedTab: EuiTabbedContentTab) => {
    setSelectedTab(selectedTab);
  };

  const cycleTab = () => {
    const selectedTabIndex = tabs.indexOf(selectedTab);
    const nextTabIndex =
      selectedTabIndex < tabs.length - 1 ? selectedTabIndex + 1 : 0;
    setSelectedTab(tabs[nextTabIndex]);
  };

  return (
    <Fragment>
      <EuiButton iconType="arrowRight" iconSide="right" onClick={cycleTab}>
        Cycle through the tabs
      </EuiButton>

      <EuiSpacer size="m" />

      <EuiTabbedContent
        tabs={tabs}
        selectedTab={selectedTab}
        onTabClick={onTabClick}
      />
    </Fragment>
  );
};
