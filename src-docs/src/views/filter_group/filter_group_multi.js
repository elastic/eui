import React, { useState } from 'react';

import {
  EuiPopover,
  // EuiPopoverTitle,
  // EuiFieldSearch,
  // EuiFilterSelectItem,
  //EuiLoadingChart,
  //EuiSpacer,
  //EuiIcon,
  EuiFilterGroup,
  EuiFilterButton,
  EuiSelectable,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const filterGroupPopoverId = useGeneratedHtmlId({
    prefix: 'filterGroupPopover',
  });

  const [items, setItems] = useState([
    { label: 'Johann Sebastian Bach', checked: 'on' },
    { label: 'Wolfgang Amadeus Mozart', checked: 'on' },
    { label: 'Antonín Dvořák', checked: 'off' },
    { label: 'Dmitri Shostakovich' },
    { label: 'Felix Mendelssohn-Bartholdy' },
    { label: 'Franz Liszt' },
    { label: 'Franz Schubert' },
    { label: 'Frédéric Chopin' },
    { label: 'Georg Friedrich Händel' },
    { label: 'Giuseppe Verdi' },
    { label: 'Gustav Mahler' },
    { label: 'Igor Stravinsky' },
    { label: 'Johannes Brahms' },
    { label: 'Joseph Haydn' },
    { label: 'Ludwig van Beethoven' },
    { label: 'Piotr Illitch Tchaïkovsky' },
    { label: 'Robert Schumann' },
    { label: 'Sergej S. Prokofiew' },
    { label: 'Wolfgang Amadeus Mozart' },
  ]);

  const button = (
    <EuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={items.length}
      hasActiveFilters={!!items.find((item) => item.checked === 'on')}
      numActiveFilters={items.filter((item) => item.checked === 'on').length}
    >
      Composers
    </EuiFilterButton>
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
        <EuiSelectable
          aria-label="Searchable example"
          searchable
          searchProps={{
            'data-test-subj': 'selectableSearchHere',
          }}
          options={items}
          onChange={(newItems) => setItems(newItems)}
        >
          {(items, search) => (
            <>
              {search}
              {items}
            </>
          )}
        </EuiSelectable>
      </EuiPopover>
    </EuiFilterGroup>
  );
};
