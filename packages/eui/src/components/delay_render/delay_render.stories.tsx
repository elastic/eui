/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiLoadingSpinner } from '../loading';
import { EuiDelayRender, EuiDelayRenderProps } from './delay_render';

const meta: Meta<EuiDelayRenderProps> = {
  title: 'Utilities/EuiDelayRender',
  component: EuiDelayRender,
  parameters: {
    loki: {
      // VRT is not really useful here as the main functionality is the delay
      skip: true,
    },
  },
  args: {
    delay: 500,
  },
};

export default meta;
type Story = StoryObj<EuiDelayRenderProps>;

export const Playground: Story = {
  args: {
    children: <EuiLoadingSpinner />,
  },
  render: (args) => <StatefulPlayground {...args} />,
};

// stateful wrapper to ensure changing args triggers a new mount of
// the component without having to refresh the page
const StatefulPlayground = (props: EuiDelayRenderProps) => {
  const [render, setRender] = useState(true);

  useEffect(() => {
    setRender(false);
    setTimeout(() => {
      setRender(true);
    }, 0);
  }, [props]);

  return render ? <EuiDelayRender {...props} /> : null;
};
