import React from 'react';

import {
  EuiLink,
  TooltipTrigger,
} from '../../../../src/components';

const autoPlacementTooltip = `I should be on the top but may get placed in another location
if I overflow the browser window. This will come in handy when tooltips get placed near the top
of pages. Its very hard to read a tooltip when part of it gets cut off and if you can't read it
then what is the point?`;

export default () => (
  <div>
    <p>
      Check out this {(
        <TooltipTrigger tooltip="I am the body" title="I am the title">
          <EuiLink> tooltip with title.</EuiLink>
        </TooltipTrigger>
      )}
    </p>
    <br/>
    <br/>
    <p>
      Check out this {(
        <TooltipTrigger tooltip={autoPlacementTooltip} placement="top" size="m">
          <EuiLink> tooltip on the top.</EuiLink>
        </TooltipTrigger>
      )}
    </p>
    <br/>
    <br/>
    <p>
      Check out this {(
        <TooltipTrigger tooltip={autoPlacementTooltip} placement="top" size="m" trigger="click">
          <EuiLink> tooltip on click.</EuiLink>
        </TooltipTrigger>
      )}
    </p>
    <br/>
    <br/>
    <p>
      Check out this {(
        <EuiLink tooltip="I should be on the left" placement="left">
          <EuiLink> tooltip on the left.</EuiLink>
        </EuiLink>
      )}
    </p>
    <br/>
    <br/>
    <p>
      Check out this {(
        <TooltipTrigger tooltip="I should be on the right" placement="right">
          <EuiLink> tooltip on the right.</EuiLink>
        </TooltipTrigger>
      )}
    </p>
    <br/>
    <br/>
    <p>
      Check out this {(
        <TooltipTrigger tooltip="I should be on the bottom" placement="bottom">
          <EuiLink> tooltip on the bottom.</EuiLink>
        </TooltipTrigger>
      )}
    </p>
  </div>
);
