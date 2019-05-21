import React, { Component } from 'react';

import {
  EuiFacetButton,
  EuiFacetGroup,
  EuiIcon,
  EuiAvatar,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import { VISUALIZATION_COLORS } from '../../../../src/services/color/visualization_colors';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: false,
      disabled: false,
      avatars: false,
      loading: false,
      selectedOptionId: undefined,
      layout: 'vertical',
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

  facet0Clicked = id => {
    this.setState(prevState => {
      return {
        icon: false,
        disabled: false,
        avatars: false,
        loading: false,
        selectedOptionId: prevState.selectedOptionId === id ? undefined : id,
      };
    });
  };

  facet1Clicked = id => {
    this.setState(prevState => {
      return {
        icon: true,
        disabled: false,
        avatars: false,
        loading: false,
        selectedOptionId: prevState.selectedOptionId === id ? undefined : id,
      };
    });
  };

  facet2Clicked = id => {
    this.setState(prevState => {
      return {
        disabled: prevState.selectedOptionId === id ? false : true,
        selectedOptionId: prevState.selectedOptionId === id ? undefined : id,
      };
    });
  };

  facet3Clicked = id => {
    this.setState(prevState => {
      return {
        icon: false,
        disabled: false,
        avatars: true,
        loading: false,
        selectedOptionId: prevState.selectedOptionId === id ? undefined : id,
      };
    });
  };

  facet4Clicked = id => {
    this.setState(prevState => ({
      loading: true,
      selectedOptionId: prevState.selectedOptionId === id ? undefined : id,
    }));

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      this.setState({
        loading: false,
      });
    }, 1200);
  };

  render() {
    const { selectedOptionId, icon, disabled, avatars, loading } = this.state;

    const facets = this.list.map(facet => {
      let iconNode;
      if (icon) {
        iconNode = <EuiIcon type="dot" color={facet.iconColor} />;
      } else if (avatars) {
        iconNode = <EuiAvatar size="s" name={facet.label} />;
      }

      return (
        <EuiFacetButton
          key={facet.id}
          id={facet.id}
          quantity={facet.quantity}
          icon={iconNode}
          isSelected={selectedOptionId === facet.id}
          isDisabled={disabled && facet.id !== 'facet2'}
          isLoading={loading}
          onClick={facet.onClick ? () => facet.onClick(facet.id) : undefined}>
          {facet.label}
        </EuiFacetButton>
      );
    });

    return (
      <div>
        <EuiTitle size="s">
          <h3>Vertical</h3>
        </EuiTitle>
        <EuiFacetGroup style={{ maxWidth: 200 }}>{facets}</EuiFacetGroup>

        <EuiSpacer />

        <EuiTitle size="s">
          <h3>Horizontal</h3>
        </EuiTitle>
        <EuiFacetGroup layout="horizontal">{facets}</EuiFacetGroup>
      </div>
    );
  }
}
