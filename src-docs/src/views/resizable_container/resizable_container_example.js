import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiText,
  EuiCode,
  EuiResizableContainer,
} from '../../../../src/components';

import ResizableContainer from './resizable_container';
import ResizableContainerVertical from './resizable_container_vertical';

const ResizableContainerSource = require('!!raw-loader!./resizable_container');
const ResizableContainerVericalSource = require('!!raw-loader!./resizable_container_vertical');

const ResizableContainerHtml = renderToHtml(ResizableContainer);
const ResizableContainerVericalHtml = renderToHtml(ResizableContainerVertical);

export const ResizableContainerExample = {
  title: 'Resizable Container',
  intro: (
    <Fragment>
      <EuiCallOut title="This component is experimental" color="warning">
        <EuiText size="s">
          <p>This component is handy for resizable containers.</p>
        </EuiText>
      </EuiCallOut>
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerHtml,
        },
      ],
      title: 'Horizontal container',
      text: <p>Horizontal resizable container</p>,
      props: { EuiResizableContainer },
      demo: (
        <div className="guideDemo__highlightSpacer">
          <ResizableContainer />
        </div>
      ),
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerVericalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerVericalHtml,
        },
      ],
      title: 'Vertical container',
      text: <p>Vertical resizable container</p>,
      props: { EuiResizableContainer },
      demo: (
        <div className="guideDemo__highlightSpacer">
          <ResizableContainerVertical />
        </div>
      ),
    },
  ],
};
