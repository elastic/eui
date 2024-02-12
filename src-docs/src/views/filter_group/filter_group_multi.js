import React, { useEffect, useRef, useState } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiFilterGroup,
  EuiFilterButton,
  EuiSelectable,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const timeoutRef = useRef();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [withLoading, setWithLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const onButtonClick = () => {
    if (withLoading && !isPopoverOpen) {
      setIsLoading(true);
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
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
  ]);

  const button = (
    <EuiFilterButton
      iconType="arrowDown"
      badgeColor="success"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={items.filter((item) => item.checked !== 'off').length}
      hasActiveFilters={!!items.find((item) => item.checked === 'on')}
      numActiveFilters={items.filter((item) => item.checked === 'on').length}
    >
      Composers
    </EuiFilterButton>
  );

  return (
    <>
      <EuiSwitch
        checked={withLoading}
        onChange={(e) => setWithLoading(e.target.checked)}
        label="Simulate dynamic loading"
      />
      <EuiSpacer />
      <EuiFilterGroup>
        <EuiPopover
          id={filterGroupPopoverId}
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none"
        >
          <EuiSelectable
            allowExclusions
            searchable
            searchProps={{
              placeholder: 'Filter list',
              compressed: true,
            }}
            aria-label="Composers"
            options={items}
            onChange={(newOptions) => setItems(newOptions)}
            isLoading={isLoading}
            loadingMessage="Loading filters"
            emptyMessage="No filters available"
            noMatchesMessage="No filters found"
          >
            {(list, search) => (
              <div style={{ width: 300 }}>
                <EuiPopoverTitle paddingSize="s">{search}</EuiPopoverTitle>
                {list}
              </div>
            )}
          </EuiSelectable>
        </EuiPopover>
      </EuiFilterGroup>
    </>
  );
};
