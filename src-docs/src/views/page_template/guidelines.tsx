import React from 'react';

// @ts-ignore Importing from JS file
import { GuideRule, GuideRuleExample } from '../../components';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

import dont1 from '../../images/template_guidelines/dont_1.png';
import do1 from '../../images/template_guidelines/do_1.png';
import dont2 from '../../images/template_guidelines/dont_2.png';
import do2 from '../../images/template_guidelines/do_2.png';
import dont3 from '../../images/template_guidelines/dont_3.png';
import do3 from '../../images/template_guidelines/do_3.png';
import dont4 from '../../images/template_guidelines/dont_4.png';
import dont5 from '../../images/template_guidelines/dont_5.png';
import dont6 from '../../images/template_guidelines/dont_6.png';
import do6 from '../../images/template_guidelines/do_6.png';
import do7 from '../../images/template_guidelines/do_7.png';
import dont8 from '../../images/template_guidelines/dont_8.png';
import do8 from '../../images/template_guidelines/do_8.png';
import dont9 from '../../images/template_guidelines/dont_9.png';
import do9 from '../../images/template_guidelines/do_9.png';
import dont10 from '../../images/template_guidelines/dont_10.png';
import do10 from '../../images/template_guidelines/do_10.png';
import do11a from '../../images/template_guidelines/do_11a.png';
import do11b from '../../images/template_guidelines/do_11b.png';

import { EuiCode, EuiImage } from '../../../../src';

import Example from './guidelines_example';
const ExampleSource = require('!!raw-loader!./guidelines_example');

// This array is used inside routes.js to create the sidenav sub-sections
export const pageTemplateGuidelinesSections = [
  {
    id: 'converting-from-legacy-layouts',
    title: 'Converting from legacy layouts',
  },
  {
    id: 'when-to-center-content',
    title: 'When to center content',
  },
  {
    id: 'empty-pages',
    title: 'Empty pages',
  },
  {
    id: 'error-and-loading-states',
    title: 'Error and loading states',
  },
];

export const PageTemplateGuidelines = () => (
  <>
    <GuideSection
      title={pageTemplateGuidelinesSections[0].title}
      id={pageTemplateGuidelinesSections[0].id}
      text={
        <p>
          Try to use as much of the namespaced (e.g.{' '}
          <EuiCode>{'<EuiPageTemplate.Header />'}</EuiCode>) as much as
          possible. This will ensure that top level props are propogated through
          and alignment is kept through the stacking order. You can use the
          non-namespaced versions (e.g. <EuiCode>{'<EuiPageSection>'}</EuiCode>)
          if you deliberately don&apos;t want the props to inherit.
        </p>
      }
    />

    <GuideSection
      demo={<Example />}
      demoPanelProps={{ paddingSize: 'none' }}
      source={[
        {
          type: GuideSectionTypes.JS,
          code: ExampleSource,
        },
      ]}
    />

    <GuideSection>
      <GuideRule>
        <GuideRuleExample
          type="do"
          text="Use EuiPageTemplate with incorporated EuiPageTemplate.Header and EuiPageTemplate.Section"
        >
          <EuiImage
            alt="Good example of Canvas using template components"
            url={do1}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Using plain EuiPage components for wrapping entire page layouts is very manual and no longer matches the template."
        >
          <EuiImage
            alt="Bad example of Canvas using old components"
            url={dont1}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>
    </GuideSection>

    <GuideSection
      title={pageTemplateGuidelinesSections[1].title}
      id={pageTemplateGuidelinesSections[1].id}
      text={
        <>
          <p>
            Whether or not the page has side navigation, any empty/loading/error
            states that take up the whole page should be vertically and
            horizontally centered using{' '}
            <EuiCode>{'alignment="center"'}</EuiCode> on the individual page
            section.
          </p>
          <p>
            <strong>
              Most empty states can utilize the{' '}
              <EuiCode>{'<EuiPageTemplate.EmptyState>'}</EuiCode> which will
              automatically center the content for you.
            </strong>
          </p>
        </>
      }
    >
      <GuideRule>
        <GuideRuleExample
          type="do"
          text="Use fully centered alignment for empty states even when using tabs."
        >
          <EuiImage
            alt="Good example of CCR showing centered content in a panel"
            url={do2}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Horizontally centered only content will mismatch the basic template."
        >
          <EuiImage
            alt="Bad example of CCR showing only horizontally centered content"
            url={dont2}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule>
        <GuideRuleExample
          type="do"
          text="Utilize the empty prompt component for fully empty pages and hide the page header."
        >
          <EuiImage
            alt="Good example of Dashboards showing just centered content in a panel"
            url={do3}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Duplicate content between page header and empty state contents isn't helpful."
        >
          <EuiImage
            alt="Bad example of Dashboards showing centered content with duplicative information from the page header"
            url={dont3}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>
    </GuideSection>

    <GuideSection
      title={pageTemplateGuidelinesSections[2].title}
      id={pageTemplateGuidelinesSections[2].id}
    >
      <GuideRule
        heading="When the whole page is empty"
        description="Use the EuiPageTemplate.EmptyPrompt component to replace the whole page."
      >
        <GuideRuleExample
          type="do"
          text="Utilize the empty state component which automatically adds panelling and centering."
        >
          <EuiImage
            alt="Good example of Dashboards showing just centered content in a panel"
            url={do3}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Just replacing page content with a simple sentence creates incorrect hierarchy."
        >
          <EuiImage
            alt="Bad example of Dashboards showing basic empty state sentence"
            url={dont4}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule>
        <GuideRuleExample
          type="do"
          text="Utilize the empty state component with a specific call to action."
        >
          <EuiImage
            alt="Good example of Dashboards showing just centered content in a panel"
            url={do3}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Ambiguous empty state messages without any actions are not helpful."
        >
          <EuiImage
            alt="Bad example of Dashboards showing centered content but with only a sentence and no actions"
            url={dont5}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        heading="Empty state due to insufficient permissions"
        description="Provide language that specifically points to permissions as the reason for the empty state. If possible, link to an admin contact."
      >
        <GuideRuleExample
          type="do"
          text="Provide more explanation within the empty state."
        >
          <EuiImage
            alt="Good example of read-only Dashboards showing empty state with insufficient permissions explanations and action"
            url={do6}
            allowFullScreen
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Ambiguous empty states without any actions can feel like an error."
        >
          <EuiImage
            alt="Bad example of read-only Dashboards showing basic empty state sentence"
            url={dont6}
            allowFullScreen
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        heading="Empty page content that still needs the page header"
        description="If necessary, the EuiPageTemplate.EmptyPrompt can be still be used alongside EuiPageTemplate.Header. Remove any UI that can't be used due to the emptiness."
      >
        <GuideRuleExample
          type="do"
          text="Hide unusable elements and utilize the empty state with one or more specific calls to action."
        >
          <EuiImage
            alt="Good example of Canvas listing page with default contents replaced with single empty prompt and call to action"
            url={do7}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Empty tables with filters that won't find any results and duplicate actions are not necessary."
        >
          <EuiImage
            alt="Bad example of Canvas listing page with empty table and visible controls"
            url={do1}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule>
        <GuideRuleExample
          type="do"
          text="Use only the empty prompt with explanations and a call to action."
        >
          <EuiImage
            alt="Good example of Categories using just a simple empty state"
            url={do8}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Page headers are not as necessary when the same labelling is used throughout other parts of the page."
        >
          <EuiImage
            alt="Bad example of Categories duplicating the category labelling in page header and empty state"
            url={dont8}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>
    </GuideSection>

    <GuideSection
      title={pageTemplateGuidelinesSections[3].title}
      id={pageTemplateGuidelinesSections[3].id}
    >
      <GuideRule
        heading="When loading the content"
        description="If, after loading, the entire page renders as an empty or error state, the loading state should also be an entire page."
      >
        <GuideRuleExample
          type="do"
          text="Use the empty prompt as a loading state followed by an empty prompt styled as a error/empty state (or loaded content)."
        >
          <EuiImage
            alt="Good example of loading state ending in an error state using centered empty prompt for both"
            url={do9}
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule>
        <GuideRuleExample
          type="dont"
          text="Temporarily showing content like the page headers when loading then removing those elements on error is jarring."
        >
          <EuiImage
            alt="Bad example of loading state not using empty promt ending in an error state changes the whole page contents"
            url={dont9}
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        heading="Callouts versus empty prompts"
        description="Typically there should only be one EuiPageTemplate.EmptyPrompt when the whole page is empty or an error. They should never be used to stack multiple errors on the same page."
      >
        <GuideRuleExample
          type="do"
          text="Use the EuiCallOut components for stacking error messages alongside content."
        >
          <EuiImage
            alt="Good example of Edit page with errors and warnings as callouts"
            url={do10}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="dont"
          text="Multiple large empty prompts pushes the main content out of view and, without actions, harms UX."
        >
          <EuiImage
            alt="Bad example of Edit page with stacked empty prompts and hardly any content visible"
            url={dont10}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>

      <GuideRule
        heading="Tabbed content"
        description="Treat the page contents under tabs as “full page” content, using empty prompts for empty/loading/error states if it is the only content that is rendered as the tab content. However, the context of the state should dictate whether an empty prompt or simple callout is appropriate."
      >
        <GuideRuleExample
          type="do"
          text="If the error blocks all interactions of the tabbed content, a centered empty prompt may be warranted."
        >
          <EuiImage
            alt="Good example of Index management with empty prompt showing privileges error"
            url={do11a}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>

        <GuideRuleExample
          type="do"
          text="If the error is not detrimental or blocking lots of user interaction, a simple callout may suffice. Though this example could also be an empty prompt."
        >
          <EuiImage
            alt="Good example of Index management with callout showing simple API error"
            url={do11b}
            allowFullScreen
            hasShadow
          />
        </GuideRuleExample>
      </GuideRule>
    </GuideSection>
  </>
);
