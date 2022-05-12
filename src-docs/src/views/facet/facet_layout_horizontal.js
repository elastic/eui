import React, { useState } from 'react';

import {
  EuiFacetButton,
  EuiFacetGroup,
  EuiIcon,
  EuiAvatar,
} from '../../../../src/components';

import { euiPaletteColorBlind } from '../../../../src/services';

export default () => {
  const [icon, setIcon] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [avatars, setAvatars] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(undefined);

  const facet0Clicked = (id) => {
    setIcon(false);
    setDisabled(false);
    setAvatars(false);
    setLoading(false);
    setSelectedOptionId((selectedOptionId) =>
      selectedOptionId === id ? undefined : id
    );
  };

  const facet1Clicked = (id) => {
    setIcon(true);
    setDisabled(false);
    setAvatars(false);
    setLoading(false);
    setSelectedOptionId((selectedOptionId) =>
      selectedOptionId === id ? undefined : id
    );
  };

  const facet2Clicked = (id) => {
    setDisabled((disabled) => !disabled);
    setSelectedOptionId((selectedOptionId) =>
      selectedOptionId === id ? undefined : id
    );
  };

  const facet3Clicked = (id) => {
    setIcon(false);
    setDisabled(false);
    setAvatars(true);
    setLoading(false);
    setSelectedOptionId((selectedOptionId) =>
      selectedOptionId === id ? undefined : id
    );
  };

  const facet4Clicked = (id) => {
    setLoading(true);
    setSelectedOptionId((selectedOptionId) =>
      selectedOptionId === id ? undefined : id
    );
  };

  const list = [
    {
      id: 'facetHorizontal0',
      label: 'Simple, no icon',
      quantity: 6,
      iconColor: euiPaletteColorBlind()[0],
      onClick: facet0Clicked,
    },
    {
      id: 'facetHorizontal1',
      label: 'Label or color indicator',
      quantity: 60,
      iconColor: euiPaletteColorBlind()[1],
      onClick: facet1Clicked,
    },
    {
      id: 'facetHorizontal2',
      label: 'Disable all others',
      quantity: 600,
      iconColor: euiPaletteColorBlind()[2],
      onClick: facet2Clicked,
    },
    {
      id: 'facetHorizontal3',
      label: 'Avatars instead of icons',
      quantity: 60,
      iconColor: euiPaletteColorBlind()[3],
      onClick: facet3Clicked,
    },
    {
      id: 'facetHorizontal4',
      label: 'Show all as loading',
      quantity: 6,
      iconColor: euiPaletteColorBlind()[4],
      onClick: facet4Clicked,
    },
    {
      id: 'facetHorizontal5',
      label: 'Just here to show truncation of really long labels',
      quantity: 0,
      iconColor: euiPaletteColorBlind()[5],
    },
  ];

  clearTimeout(searchTimeout);

  const searchTimeout = setTimeout(() => {
    // Simulate a remotely-executed search.
    setLoading(false);
  }, 1200);

  const facets = (align) => {
    return (
      <>
        {list.map((facet) => {
          let iconNode;
          if (icon) {
            iconNode = <EuiIcon type="dot" color={facet.iconColor} />;
          } else if (avatars) {
            iconNode = <EuiAvatar size="s" name={facet.label} />;
          }

          return (
            <EuiFacetButton
              key={facet.id}
              id={`${facet.id}_${align}`}
              quantity={facet.quantity}
              icon={iconNode}
              isSelected={selectedOptionId === facet.id}
              isDisabled={disabled && facet.id !== 'facetHorizontal2'}
              isLoading={loading}
              onClick={
                facet.onClick ? () => facet.onClick(facet.id) : undefined
              }
            >
              {facet.label}
            </EuiFacetButton>
          );
        })}
      </>
    );
  };

  return (
    <EuiFacetGroup layout="horizontal" gutterSize="l">
      {facets('Horizontal')}
    </EuiFacetGroup>
  );
};
