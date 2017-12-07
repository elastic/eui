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
    <div style={{ overflow: 'hidden' }}>
      Check out this {(
        <TooltipTrigger tooltip={autoPlacementTooltip} title="I am the title" size="m">
          <EuiLink>medium tooltip</EuiLink>
        </TooltipTrigger>
      )} with <strong>title</strong>.
    </div>
    <br/>
    <br/>
    <div>
      Check out this {(
        <TooltipTrigger tooltip="I should be on the top" placement="top" >
          <EuiLink>tooltip on the <strong>top</strong>.</EuiLink>
        </TooltipTrigger>
      )}
    </div>
    <br/>
    <br/>
    <div>
      Check out this {(
        <TooltipTrigger tooltip={autoPlacementTooltip} placement="top" size="m" trigger="click">
          <EuiLink> tooltip on <strong>click</strong>.</EuiLink>
        </TooltipTrigger>
      )}
    </div>
    <br/>
    <br/>
    <div>
      Check out this {(
        <TooltipTrigger tooltip={autoPlacementTooltip} placement="left" size="l">
          <EuiLink>large tooltip  on the <strong>left</strong>.</EuiLink>
        </TooltipTrigger>
      )}
    </div>
    <br/>
    <br/>
    <div>
      Check out this {(
        <TooltipTrigger tooltip="I should be on the right" placement="right">
          <EuiLink>tooltip on the <strong>right</strong>.</EuiLink>
        </TooltipTrigger>
      )}
    </div>
    <br/>
    <br/>
    <div>
      Check out this {(
        <TooltipTrigger tooltip="I should be on the bottom" placement="bottom">
          <EuiLink>tooltip on the <strong>bottom</strong>.</EuiLink>
        </TooltipTrigger>
      )}
    </div>
  </div>
);
