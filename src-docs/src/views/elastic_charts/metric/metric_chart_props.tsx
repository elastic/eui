import { FunctionComponent } from 'react';
import {
  MetricWNumber,
  MetricWProgress,
  MetricWText,
  MetricWTrend,
} from '@elastic/charts';

export const MetricProps: FunctionComponent<React.PropsWithChildren<{
  data: Array<
    Array<MetricWNumber | MetricWProgress | MetricWTrend | MetricWText>
  >;
}>> = () => null;

export const MetricDatumWText: FunctionComponent<React.PropsWithChildren<
  MetricWText
>> = () => null;
export const MetricDatumWNumber: FunctionComponent<React.PropsWithChildren<
  MetricWNumber
>> = () => null;
export const MetricDatumWProgress: FunctionComponent<React.PropsWithChildren<
  MetricWProgress
>> = () => null;
export const MetricDatumWTrend: FunctionComponent<React.PropsWithChildren<
  MetricWTrend
>> = () => null;
