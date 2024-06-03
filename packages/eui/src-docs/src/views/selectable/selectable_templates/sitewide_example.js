import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../../components';

import {
  EuiCode,
  EuiSpacer,
  EuiSelectableTemplateSitewide,
  EuiCodeBlock,
  EuiAccordion,
  EuiCallOut,
} from '../../../../../src';

import { Options, MetaData } from '../props';

import SitewideOption from './sitewide_option';
import SitewideSearch from './sitewide_search';
const sitewideSearchSource = require('!!raw-loader!./sitewide_search');

export const SitewideSearchExample = {
  title: 'Sitewide search',
  description: (
    <p>
      <strong>EuiSelectableTemplateSitewide</strong> is an opinionated wrapper
      around{' '}
      <Link to="/forms/selectable">
        <strong>EuiSelectable</strong>
      </Link>{' '}
      to provide a reusable template across the Elastic products that will share
      the same global search capabilities. It creates the search input that
      triggers a popover containing the list of options.
    </p>
  ),
  sections: [
    {
      title: 'Basic setup',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: sitewideSearchSource,
        },
      ],
      text: (
        <>
          <h3>Search input</h3>
          <p>
            The search ability of{' '}
            <Link to="/forms/selectable">
              <strong>EuiSelectable</strong>
            </Link>{' '}
            is still hooked up to the options provided. It will highlight the
            portion of the label that matches the search string.
          </p>
          <EuiCallOut
            size="s"
            iconType="keyboard"
            title="The demo showcases the possibility to allow a keyboard shortcut (command + K) to trigger the search input focus, but the template does not come with this ability."
          />
          <h3>Popover</h3>
          <p>
            The popover itself allows you to display a{' '}
            <EuiCode>popoverTitle</EuiCode> node,{' '}
            <EuiCode>popoverFooter</EuiCode> node, or pass any of the{' '}
            <EuiCode>popoverProps</EuiCode> to the{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            component.
          </p>
          <h3>Selection</h3>
          <p>
            The options themselves are simply rendered as list items with no
            interactive behavior like buttons or links. You must handle the
            interaction when the component passes back the altered array of
            options with the selected option having{' '}
            <EuiCode>{"checked: 'on'"}</EuiCode>.
          </p>
          <h3>Popover toggle and responsiveness</h3>
          <p>
            The default display is to render the search input inline which
            triggers a popover with the results. Or you can decide to trigger
            the whole selectable component from a single button. By passing your
            own button to <EuiCode>popoverButton</EuiCode>, the component will
            use this to trigger the popover, putting the search inside.
          </p>
          <p>
            This is a great way to handle reducing the size of the component for
            smaller screens. The component offers a helper prop called{' '}
            <EuiCode>popoverButtonBreakpoints</EuiCode> which will only render
            the <EuiCode>popoverButton</EuiCode> if the window size matches
            named breakpoint(s).
          </p>
        </>
      ),
      props: { EuiSelectableTemplateSitewide, Options, MetaData },
      demo: <SitewideSearch />,
    },
    {
      title: 'Options',
      text: (
        <>
          <p>
            The <EuiCode>options</EuiCode> are the most opinionated portion of
            the template. Their display is determined by the props passed in and
            extends the normal <EuiCode>EuiSelectable.option</EuiCode> type. All
            parts are optional with the exception of the label (A).
          </p>

          <SitewideOption />
          <EuiSpacer size="xs" />
          <EuiAccordion
            id="optionSnippet"
            buttonContent={<small>Code snippet</small>}
          >
            <EuiSpacer size="xs" />
            <EuiCodeBlock language="ts" isCopyable paddingSize="s">
              {`const options: EuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Label',
    icon: {
      type: 'logoKibana'
    }
    avatar: {
      name: 'Default',
    },
    meta: [
      {
        text: 'Meta',
        type: 'application',
      },
      {
        text: 'Deployment',
        type: 'deployment',
      },
      {
        text: 'Default display',
      },
    ],
  }
]`}
            </EuiCodeBlock>
          </EuiAccordion>
          <EuiSpacer />
          <ul style={{ listStyleType: 'upper-alpha' }}>
            <li>
              <EuiCode>label</EuiCode> (required): The name of the item itself.
              By default, the search box will only use this to match the search
              term against, but you can supply a separate{' '}
              <EuiCode>searchableLabel</EuiCode> that combines the label and
              meta data to search on.
            </li>
            <li>
              <EuiCode>icon</EuiCode>: Only display the solution or
              application&apos;s logo when the option links to the application
              itself (Dashboard app) and not lower-level items such as
              individual dashboards. Size and color are predetermined but can be
              overridden.
            </li>
            <li>
              <EuiCode>avatar</EuiCode>: Represents the Kibana Space that the
              item is located in, <strong>if</strong> multiple spaces are
              present. Type and size are predetermined but can be overridden.
            </li>
            <li>
              <EuiCode>meta</EuiCode>: This bottom line should only contain
              items if the option is a lower-level item (individual dashboard).
              The display of which defaults to simple text, but if you pass one
              of the predetermined <EuiCode>types</EuiCode>, they will be styled
              according to the design pattern.
            </li>
          </ul>
          <EuiCallOut
            size="s"
            iconType="clock"
            title="The demo shows how you can temporarily replace the icon for a subset of options to display a short list of recently viewed options."
          />
        </>
      ),
    },
  ],
};
