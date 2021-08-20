import React, { useState } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiFieldSearch,
  EuiFilterSelectItem,
  EuiLoadingChart,
  EuiSpacer,
  EuiIcon,
  EuiFilterGroup,
  EuiFilterButton,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const [items, setItems] = useState([
    { name: 'Johann Sebastian Bach', checked: 'on' },
    { name: 'Wolfgang Amadeus Mozart', checked: 'on' },
    { name: 'Antonín Dvořák', checked: 'off' },
    { name: 'Dmitri Shostakovich' },
    { name: 'Felix Mendelssohn-Bartholdy' },
    { name: 'Franz Liszt' },
    { name: 'Franz Schubert' },
    { name: 'Frédéric Chopin' },
    { name: 'Georg Friedrich Händel' },
    { name: 'Giuseppe Verdi' },
    { name: 'Gustav Mahler' },
    { name: 'Igor Stravinsky' },
    { name: 'Johannes Brahms' },
    { name: 'Joseph Haydn' },
    { name: 'Ludwig van Beethoven' },
    { name: 'Piotr Illitch Tchaïkovsky' },
    { name: 'Robert Schumann' },
    { name: 'Sergej S. Prokofiew' },
    { name: 'Wolfgang Amadeus Mozart' },
  ]);

  function updateItem(index) {
    if (!items[index]) {
      return;
    }

    const newItems = [...items];

    switch (newItems[index].checked) {
      case 'on':
        newItems[index].checked = 'off';
        break;

      case 'off':
        newItems[index].checked = undefined;
        break;

      default:
        newItems[index].checked = 'on';
    }

    setItems(newItems);
  }

  const button = (
    <EuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={items.length}
      hasActiveFilters={!!items.find((item) => item.checked === 'on')}
      numActiveFilters={items.filter((item) => item.checked === 'on').length}>
      Composers
    </EuiFilterButton>
  );

  return (
    <EuiFilterGroup>
      <EuiPopover
        id="popoverExampleMultiSelect"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none">
        <EuiPopoverTitle paddingSize="s">
          <EuiFieldSearch compressed />
        </EuiPopoverTitle>
        <div className="euiFilterSelect__items">
          {items.map((item, index) => (
            <EuiFilterSelectItem
              checked={item.checked}
              key={index}
              onClick={() => updateItem(index)}>
              {item.name}
            </EuiFilterSelectItem>
          ))}
          {/*
                Use when loading items initially
              */}
          <div className="euiFilterSelect__note">
            <div className="euiFilterSelect__noteContent">
              <EuiLoadingChart size="m" />
              <EuiSpacer size="xs" />
              <p>Loading filters</p>
            </div>
          </div>
          {/*
                Use when no results are returned
              */}
          <div className="euiFilterSelect__note">
            <div className="euiFilterSelect__noteContent">
              <EuiIcon type="minusInCircle" />
              <EuiSpacer size="xs" />
              <p>No filters found</p>
            </div>
          </div>
        </div>
      </EuiPopover>
    </EuiFilterGroup>
  );
};
