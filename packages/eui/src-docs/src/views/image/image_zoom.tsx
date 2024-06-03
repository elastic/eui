import React from 'react';

import {
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup justifyContent="spaceEvenly">
    <EuiFlexItem grow={false}>
      <EuiImage
        size="m"
        hasShadow
        allowFullScreen
        caption="Albert Einstein, theoretical physicist"
        alt="" // Because this image is sufficiently described by its caption, there is no need to repeat it via alt text
        src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg"
      />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiImage
        allowFullScreen
        caption={
          <>
            Browser usage on{' '}
            <EuiLink
              href="https://commons.wikimedia.org/wiki/File:Wikimedia_browser_share_pie_chart.png"
              target="_blank"
            >
              Wikimedia (CC BY 3.0)
            </EuiLink>
          </>
        }
        alt="Pie chart describing browser usage on Wikimedia on October 2011. Internet Explorer occupies 34 percent, Firefox occupies 23 percent, Chrome occupies 20 percent, Safari occupies 11 percent, Opera occupies 5%, Android occupies 1.9 percent, and other browsers occupy 3.5 percent."
        src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Wikimedia_browser_share_pie_chart.png"
        fullScreenIconColor="dark"
        size={300}
        style={{ padding: '20px 30px', background: 'white' }}
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
