import React, { Component } from 'react';

import {
  EuiFacetButton,
  EuiFacetGroup,
  EuiIcon,
  EuiAvatar,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import { VISUALIZATION_COLORS } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facet: [
        {
          icon: false,
          disabled: false,
          avatars: false,
          loading: false,
          selectedOptionId: undefined,
          layout: 'vertical',
        },
        {
          icon: false,
          disabled: false,
          avatars: false,
          loading: false,
          selectedOptionId: undefined,
          layout: 'vertical',
        },
      ],
    };

    this.list = [
      {
        id: 'facet0',
        label: 'Simple, no icon',
        quantity: 6,
        iconColor: VISUALIZATION_COLORS[0],
        onClick: this.facet0Clicked,
      },
      {
        id: 'facet1',
        label: 'Label or color indicator',
        quantity: 60,
        iconColor: VISUALIZATION_COLORS[1],
        onClick: this.facet1Clicked,
      },
      {
        id: 'facet2',
        label: 'Disable all others',
        quantity: 600,
        iconColor: VISUALIZATION_COLORS[2],
        onClick: this.facet2Clicked,
      },
      {
        id: 'facet3',
        label: 'Avatars instead of icons',
        quantity: 60,
        iconColor: VISUALIZATION_COLORS[3],
        onClick: this.facet3Clicked,
      },
      {
        id: 'facet4',
        label: 'Show all as loading',
        quantity: 6,
        iconColor: VISUALIZATION_COLORS[4],
        onClick: this.facet4Clicked,
      },
      {
        id: 'facet5',
        label: 'Just here to show truncation of really long labels',
        quantity: 0,
        iconColor: VISUALIZATION_COLORS[5],
      },
    ];
  }

  facet0Clicked = (id, type) => {
    this.setState(prevState => {
      const newFacets = [...prevState.facet];
      newFacets[type] = {
        icon: false,
        disabled: false,
        avatars: false,
        loading: false,
        selectedOptionId:
          prevState.facet[type].selectedOptionId === id ? undefined : id,
      };
      return {
        facet: newFacets,
      };
    });
  };

  facet1Clicked = (id, type) => {
    this.setState(prevState => {
      const newFacets = [...prevState.facet];
      newFacets[type] = {
        icon: true,
        disabled: false,
        avatars: false,
        loading: false,
        selectedOptionId:
          prevState.facet[type].selectedOptionId === id ? undefined : id,
      };
      return {
        facet: newFacets,
      };
    });
  };

  facet2Clicked = (id, type) => {
    this.setState(prevState => {
      const newFacets = [...prevState.facet];
      newFacets[type] = {
        ...prevState.facet[type],
        disabled: prevState.facet[type].selectedOptionId === id ? false : true,
        selectedOptionId:
          prevState.facet[type].selectedOptionId === id ? undefined : id,
      };
      return {
        facet: newFacets,
      };
    });
  };

  facet3Clicked = (id, type) => {
    this.setState(prevState => {
      const newFacets = [...prevState.facet];
      newFacets[type] = {
        icon: false,
        disabled: false,
        avatars: true,
        loading: false,
        selectedOptionId:
          prevState.facet[type].selectedOptionId === id ? undefined : id,
      };
      return {
        facet: newFacets,
      };
    });
  };

  facet4Clicked = (id, type) => {
    this.setState(prevState => {
      const newFacets = [...prevState.facet];
      newFacets[type] = {
        ...prevState.facet[type],
        loading: true,
        selectedOptionId:
          prevState.facet[type].selectedOptionId === id ? undefined : id,
      };
      return {
        facet: newFacets,
      };
    });

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      this.setState(prevState => {
        const newFacets = [...prevState.facet];
        newFacets[type] = {
          ...prevState.facet[type],
          loading: false,
          selectedOptionId:
            prevState.facet[type].selectedOptionId === id ? undefined : id,
        };
        return {
          facet: newFacets,
        };
      });
    }, 1200);
  };

  facets = id => {
    const {
      selectedOptionId,
      icon,
      disabled,
      avatars,
      loading,
    } = this.state.facet[id];

    return (
      <>
        {this.list.map(facet => {
          let iconNode;
          if (icon) {
            iconNode = <EuiIcon type="dot" color={facet.iconColor} />;
          } else if (avatars) {
            iconNode = <EuiAvatar size="s" name={facet.label} />;
          }
          const facetId = `${facet.id}_${id}`;
          return (
            <EuiFacetButton
              key={facetId}
              id={facetId}
              quantity={facet.quantity}
              icon={iconNode}
              isSelected={selectedOptionId === facetId}
              isDisabled={disabled && facetId !== `facet2_${id}`}
              isLoading={loading}
              onClick={
                facet.onClick ? () => facet.onClick(facetId, id) : undefined
              }>
              {facet.label}
            </EuiFacetButton>
          );
        })}
      </>
    );
  };

  render() {
    return (
      <div>
        <EuiTitle size="s">
          <h3>Vertical</h3>
        </EuiTitle>
        <EuiFacetGroup style={{ maxWidth: 200 }}>
          {this.facets(0)}
        </EuiFacetGroup>

        <EuiSpacer />

        <EuiTitle size="s">
          <h3>Horizontal</h3>
        </EuiTitle>
        <EuiFacetGroup layout="horizontal">{this.facets(1)}</EuiFacetGroup>
      </div>
    );
  }
}
