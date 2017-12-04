import React from 'react';

import {
  TooltipTrigger,
} from '../../../../src/components';

export default () => (
  <div>
    <div>
      Check out this
      <TooltipTrigger tooltip="I am the body" title="I am the title">
        <span className="overlay-trigger" tabIndex="0"> tooltip with title.</span>
      </TooltipTrigger>
    </div>
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
  </div>
);
