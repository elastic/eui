import React, { FunctionComponent } from 'react';
import {
  EuiSelectableOption,
  EuiSelectableOptionsListProps,
  EuiSelectableSearchableSearchProps,
  EuiSelectableTemplateSitewideOption,
  EuiSelectableTemplateSitewideMetaData,
} from '../../../../src';

export const EuiSelectableOptionProps: FunctionComponent<React.PropsWithChildren<EuiSelectableOption>> = () => (
  <div />
);

export const EuiSelectableOptionsList: FunctionComponent<React.PropsWithChildren<EuiSelectableOptionsListProps>> = () => (
  <div />
);

export const EuiSelectableSearchProps: FunctionComponent<React.PropsWithChildren<EuiSelectableSearchableSearchProps<
  any
>>> = () => <div />;

export const Options: FunctionComponent<React.PropsWithChildren<EuiSelectableTemplateSitewideOption>> = () => (
  <div />
);

export const MetaData: FunctionComponent<React.PropsWithChildren<EuiSelectableTemplateSitewideMetaData>> = () => (
  <div />
);
