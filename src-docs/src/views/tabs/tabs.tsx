import React, { useState, Fragment } from 'react';

import {
  EuiIcon,
  EuiTabs,
  EuiTab,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

const tabs = [
  {
    id: 'cobalt--id',
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
    id: 'dextrose--id',
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
    id: 'hydrogen--id',
    disabled: true,
    name: (
      <span>
        <EuiIcon type="heatmap" />
        &nbsp;Hydrogen
      </span>
    ),
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
    id: 'monosodium_glutammate--id',
    name: 'Monosodium Glutamate',
    href: '#/navigation/tabs#monosodium',
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
  const [selectedTabId, setSelectedTabId] = useState('cobalt--id');
  const [selectedTabContent, setSelectedTabContent] = useState(
    tabs.find((obj) => {
      return obj.id === 'cobalt--id';
    })!.content
  );

  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
    setSelectedTabContent(
      tabs.find((obj) => {
        return obj.id === id;
      })!.content
    );
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        href={tab.href}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <>
      <EuiTabs>{renderTabs()}</EuiTabs>
      {selectedTabContent}
    </>
  );
};
