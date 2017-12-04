import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiButton,
  EuiCode,
} from '../../../../src/components';

import {
  TooltipTrigger,
} from '../../../../src/components';

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Tooltip"
      source={[{
        type: GuideSectionTypes.JS,
        code: "",
      }, {
        type: GuideSectionTypes.HTML,
        code: "",
      }]}
      text={
        <div>
          <p>
            https://styleguide.pivotal.io/tooltips#tooltip-triggers
          </p>
        </div>
      }
      demo={
        <div style={{ width: 320 }}>
          <div>
            Check out this
            <TooltipTrigger tooltip="I should be on the left" placement="left">
              <span className="overlay-trigger" tabIndex="0"> tooltip on the left.</span>
            </TooltipTrigger>
          </div>

          <div>
            Check out this
            <TooltipTrigger tooltip="I should be on the right" placement="right">
              <span className="overlay-trigger" tabIndex="0"> tooltip on the right.</span>
            </TooltipTrigger>
          </div>

          <div>
            Check out this
            <TooltipTrigger tooltip="I should be on the top" placement="top">
              <span className="overlay-trigger" tabIndex="0"> tooltip on the top.</span>
            </TooltipTrigger>
          </div>

          <div>
            Check out this
            <TooltipTrigger tooltip="I should be on the bottom" placement="bottom">
              <span className="overlay-trigger" tabIndex="0"> tooltip on the bottom.</span>
            </TooltipTrigger>
          </div>

          <div>
            Check out this
            <TooltipTrigger tooltip="light tooltip" placement="right" theme="light">
              <span className="overlay-trigger" tabIndex="0"> light tooltip.</span>
            </TooltipTrigger>
          </div>

          <div>
            Check out this
            <TooltipTrigger tooltip="I am the body" title="I am the title">
              <span className="overlay-trigger" tabIndex="0"> tooltip with title.</span>
            </TooltipTrigger>
          </div>
        </div>
      }
    />
  </GuidePage>
);
