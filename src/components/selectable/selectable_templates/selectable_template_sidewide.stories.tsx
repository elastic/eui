/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiButton } from '../../button';
import {
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideProps,
} from './selectable_template_sitewide';
import { EuiSelectableOption } from '../selectable_option';

const options = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus is disabled',
    disabled: true,
  },
  {
    label: 'Iapetus',
    checked: 'on',
  },
  {
    label: 'Phoebe',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
] as EuiSelectableOption[];

const meta: Meta<EuiSelectableTemplateSitewideProps> = {
  title: 'Templates/EuiSelectableTemplateSitewide',
  component: EuiSelectableTemplateSitewide,
  argTypes: {
    popoverButton: {
      control: 'boolean',
      mapping: {
        true: <EuiButton>Toggle popover</EuiButton>,
        false: undefined,
      },
    },
    popoverTitle: {
      control: 'boolean',
      mapping: {
        true: <span>I am a Title</span>,
        false: undefined,
      },
    },
    popoverFooter: {
      control: 'boolean',
      mapping: {
        true: <span>I am a Footer</span>,
        false: undefined,
      },
    },
  },
};

export default meta;
type Story = StoryObj<EuiSelectableTemplateSitewideProps>;

export const Playground: Story = {
  args: {
    options,
    // set up for easier testing/QA
    // @ts-ignore - using testing control types
    popoverButton: false,
    popoverTitle: false,
    popoverFooter: false,
    popoverButtonBreakpoints: ['xs', 's', 'm', 'l', 'xl'],
  },
};
