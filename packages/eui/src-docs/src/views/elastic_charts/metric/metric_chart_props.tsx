import { FunctionComponent } from 'react';
import {
  MetricWNumber,
  MetricWProgress,
  MetricWText,
  MetricWTrend,
} from '@elastic/charts';

export const MetricProps: FunctionComponent<{
  data: Array<
    Array<MetricWNumber | MetricWProgress | MetricWTrend | MetricWText>
  >;
}> = () => null;

export const MetricDatumWText: FunctionComponent<MetricWText> = () => null;
export const MetricDatumWNumber: FunctionComponent<MetricWNumber> = () => null;
export const MetricDatumWProgress: FunctionComponent<MetricWProgress> = () =>
  null;
export const MetricDatumWTrend: FunctionComponent<MetricWTrend> = () => null;
