/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  useState,
} from 'react';

import { useGeneratedHtmlId } from '../accessibility';

// https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-6
// Combobox implementing the ARIA 1.1 pattern

export interface UseComboBoxInterface {
  id?: string;
  ariaLabel?: string;
  labelId?: string;
}
export interface UseComboBox {
  containerAttributes: HTMLAttributes<HTMLElement>;
  inputAttributes: InputHTMLAttributes<HTMLInputElement>;
  listAttributes: HTMLAttributes<HTMLElement>;
  labelAttributes: LabelHTMLAttributes<HTMLLabelElement>;
  infoAttributes: HTMLAttributes<HTMLElement>;
  instructionsAttributes: HTMLAttributes<HTMLElement>;
  methods: {
    optionIdGenerator: (index?: number) => string;
    setListBoxOpen: (isOpen: boolean) => void;
    setFocusedOptionIndex: (index?: number) => void;
  };
  state: {
    isListBoxOpen: boolean;
    focusedOptionIndex?: number;
  };
}
export const useCombobox = ({
  id,
  ariaLabel,
  labelId: _labelId,
}: UseComboBoxInterface): UseComboBox => {
  const [isListBoxOpen, setListBoxOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>();

  const rootId = useGeneratedHtmlId({
    prefix: id ? 'euiSuggest' : undefined,
    conditionalId: id,
  });

  const collectionId = `${rootId}_collection`;
  const infoId = `${rootId}_info`;
  const inputId = rootId;
  const instructionsId = `${rootId}_instructions`;
  const labelId = _labelId;

  const optionIdGenerator = (index?: number) =>
    index != null ? `${collectionId}_option-${index}` : '';

  return {
    containerAttributes: {
      role: 'combobox',
      'aria-expanded': isListBoxOpen,
      'aria-haspopup': isListBoxOpen ? 'listbox' : undefined,
      'aria-owns': isListBoxOpen ? collectionId : undefined,
    },
    inputAttributes: {
      role: 'textbox',
      id: inputId,
      autoComplete: 'off',
      'aria-activedescendant': optionIdGenerator(focusedOptionIndex),
      'aria-autocomplete': 'list',
      'aria-controls': isListBoxOpen ? collectionId : undefined,
      'aria-describedby': `${infoId} ${instructionsId}`,
      'aria-label': !labelId ? ariaLabel : undefined,
      'aria-labelledby': labelId,
    },
    listAttributes: {
      role: 'listbox',
      id: collectionId,
      'aria-label': !labelId ? ariaLabel : undefined,
      'aria-labelledby': labelId,
    },
    labelAttributes: {
      id: labelId,
      htmlFor: inputId,
    },
    infoAttributes: {
      id: infoId,
    },
    instructionsAttributes: {
      id: instructionsId,
    },

    methods: {
      optionIdGenerator,
      setListBoxOpen,
      setFocusedOptionIndex,
    },

    state: {
      isListBoxOpen,
      focusedOptionIndex,
    },
  };
};
