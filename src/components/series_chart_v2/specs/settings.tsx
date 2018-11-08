import { inject } from 'mobx-react';
import React from 'react';
import { Rendering, Rotation } from '../commons/series/specs';
import { ChartStore } from '../state/chart_state';

interface SettingSpecProps {
  chartStore?: ChartStore;
  rendering: Rendering;
  rotation: Rotation;
  animateData: boolean;
}

type DefaultProps = 'rendering' | 'rotation' | 'animateData';

export class SettingsComponent extends React.PureComponent<SettingSpecProps> {
  public static defaultProps: Pick<SettingSpecProps, DefaultProps> = {
    rendering: 'canvas',
    rotation: 0,
    animateData: true,
  };
  public componentDidMount() {
    const { chartStore, rotation, rendering, animateData } = this.props;
    chartStore!.chartRotation = rotation;
    chartStore!.chartRendering = rendering;
    chartStore!.animateData = animateData;
  }
  public componentDidUpdate() {
    const { chartStore, rotation, rendering, animateData } = this.props;
    chartStore!.chartRotation = rotation;
    chartStore!.chartRendering = rendering;
    chartStore!.animateData = animateData;
  }
  public render() {
    return null;
  }
}

export const Settings = inject('chartStore')(SettingsComponent);
