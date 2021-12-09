import React, { useEffect, useState } from 'react';

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
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [items] = useState([
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
  const [searchResults, setSearchResults] = useState(items);

  // Used to show the content loader when the filtergroup is opened for the first time only
  useEffect(() => {
    setTimeout(() => {
      setLoadingList(false);
    }, 3000);
  });

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const filterGroupPopoverId = useGeneratedHtmlId({
    prefix: 'filterGroupPopover',
  });

  function updateItem(index) {
    if (!searchResults[index]) {
      return;
    }

    const newItems = [...searchResults];

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
    setSearchResults(newItems);
  }

  const findSearchQuery = (searchQuery) => {
    searchQuery = searchQuery.toLowerCase();
    setSearchResults(
      items.filter((item) => {
        const name = item.name.toLowerCase();
        return name.includes(searchQuery);
      })
    );
  };

  const button = (
    <EuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={searchResults.length}
      hasActiveFilters={!!searchResults.find((item) => item.checked === 'on')}
      numActiveFilters={
        searchResults.filter((item) => item.checked === 'on').length
      }
    >
      Composers
    </EuiFilterButton>
  );

  const noResultsFound = (
    <div className="euiFilterSelect__note">
      <div className="euiFilterSelect__noteContent">
        <EuiIcon type="minusInCircle" />
        <EuiSpacer size="xs" />
        <p>No filters found</p>
      </div>
    </div>
  );

  const loadingChart = (
    <div className="euiFilterSelect__note">
      <div className="euiFilterSelect__noteContent">
        <EuiLoadingChart size="m" />
        <EuiSpacer size="xs" />
        <p>Loading filters</p>
      </div>
    </div>
  );

  return (
    <EuiFilterGroup>
      <EuiPopover
        id={filterGroupPopoverId}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
      >
        <EuiPopoverTitle paddingSize="s">
          <EuiFieldSearch
            incremental={true}
            onSearch={findSearchQuery}
            compressed
          />
        </EuiPopoverTitle>
        <div className="euiFilterSelect__items">
          {loadingList
            ? loadingChart
            : searchResults.map((item, index) => (
                <EuiFilterSelectItem
                  checked={item.checked}
                  key={index}
                  onClick={() => updateItem(index)}
                >
                  {item.name}
                </EuiFilterSelectItem>
              ))}
          {searchResults.length === 0 && noResultsFound}
        </div>
      </EuiPopover>
    </EuiFilterGroup>
  );
};
