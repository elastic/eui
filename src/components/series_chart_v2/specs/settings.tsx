import { inject } from 'mobx-react';
import React from 'react';
import { Position, Rendering, Rotation } from '../lib/series/specs';
import { ChartStore } from '../state/chart_state';

interface SettingSpecProps {
  chartStore?: ChartStore;
  rendering: Rendering;
  rotation: Rotation;
  animateData: boolean;
  showLegend: boolean;
  debug: boolean;
  legendPosition?: Position;
}

type DefaultProps = 'rendering' | 'rotation' | 'animateData' | 'showLegend' | 'debug';

export class SettingsComponent extends React.PureComponent<SettingSpecProps> {
  public static defaultProps: Pick<SettingSpecProps, DefaultProps> = {
    rendering: 'canvas',
    rotation: 0,
    animateData: true,
    showLegend: false,
    debug: false,
  };
  public componentDidMount() {
    const {
      chartStore,
      rotation,
      rendering,
      animateData,
      showLegend,
      legendPosition,
      debug,
    } = this.props;
    chartStore!.chartRotation = rotation;
    chartStore!.chartRendering = rendering;
    chartStore!.animateData = animateData;
    chartStore!.debug = debug;

    chartStore!.setShowLegend(showLegend);
    chartStore!.legendPosition = legendPosition;
  }
  public componentDidUpdate() {
    const {
      chartStore,
      rotation,
      rendering,
      animateData,
      showLegend,
      legendPosition,
      debug,
    } = this.props;
    chartStore!.chartRotation = rotation;
    chartStore!.chartRendering = rendering;
    chartStore!.animateData = animateData;
    chartStore!.debug = debug;
    chartStore!.setShowLegend(showLegend);
    chartStore!.legendPosition = legendPosition;
  }
  public render() {
    return null;
  }
}

export const Settings = inject('chartStore')(SettingsComponent);
