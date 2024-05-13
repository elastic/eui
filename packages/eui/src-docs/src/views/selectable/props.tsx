import React, { FunctionComponent } from 'react';
import {
  EuiSelectableOption,
  EuiSelectableOptionsListProps,
  EuiSelectableSearchableSearchProps,
  EuiSelectableTemplateSitewideOption,
  EuiSelectableTemplateSitewideMetaData,
} from '../../../../src';

export const EuiSelectableOptionProps: FunctionComponent<
  EuiSelectableOption
> = () => <div />;

export const EuiSelectableOptionsList: FunctionComponent<
  EuiSelectableOptionsListProps
> = () => <div />;

export const EuiSelectableSearchProps: FunctionComponent<
  EuiSelectableSearchableSearchProps<any>
> = () => <div />;

export const Options: FunctionComponent<
  EuiSelectableTemplateSitewideOption
> = () => <div />;

export const MetaData: FunctionComponent<
  EuiSelectableTemplateSitewideMetaData
> = () => <div />;
