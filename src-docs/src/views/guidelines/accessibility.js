import React from 'react';

import {
  Link,
} from 'react-router';

import {
  GuidePage,
  GuideRule,
  GuideRuleExample,
  GuideRuleTitle,
} from '../../components';

import {
  EuiButton,
  EuiText,
  EuiHorizontalRule,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiLink,
  EuiPanel
} from '../../../../src/components';

export default () => (
  <GuidePage title="Accessibility">

    <EuiText>
      <p>
        Accessibility is about building products that everyone can use, including those with vision, hearing,
        cognitive, and motor impairments.  It’s a basic tenet of the EUI Framework.
        We’ve built in the color, markup, and behavior required for accessibility.&nbsp;
        <strong>When you use the EUI Framework, you can be confident you&apos;re building
        an experience for users of all abilities.</strong>
      </p>


    </EuiText>

    <EuiHorizontalRule/>


    <GuideRuleTitle>Color and contrast</GuideRuleTitle>


    <GuideRule
      heading="Colorblind-safe palette"
      description="EUI has a conservative 12-color palette for core design elements
      and a 10-color palette for visualizations. Both palettes are adapted for color blindness.
      For most design work, these color palettes should be sufficient."
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Core palette"
      >
      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Visuzlization palette"
      >
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Color contrast ratios that meet AA standards"
      description={<span>All EUI designs meet the <strong>AA color contrast standard.</strong>
      This ensures sufficient color contrast between foreground and background colors.
      This standard benefits users with color blindness and users with low vision.
      For a grid of EUI color combinations that pass the AA rating, see the EUI color guidelines.</span>}
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="These lines have sufficient contrast between the text and  background colors"
      >
      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="dont"
        text="These lines of text don&apos;t"
      >
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Support for high contrast mode"
      description="The EUI dark theme has a black background with white text.
      This high contrast mode makes it easier for users with low vision to read the screen."
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Dark theme"
      >
      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Light theme"
      >
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer />

    <EuiHorizontalRule/>

    <GuideRuleTitle>Meaningful HTML markup</GuideRuleTitle>



    <GuideRule
      heading="Semantic HTML for component identification"
      description="EUI provides a set of semantically correct components.
      Buttons are built with a button tag, headings with the heading tag,
      images with the figure tag, and so on. Semantic HTML enables assistive technologies to properly
      identify the component."
    >

    <GuideRuleExample
      frame
      panel={false}
      type="do"
      text="The heading tag enables assitive technologies to convey
      the hierachy of the headings on the page."
    >
    <EuiText>
      <p>&lt;h1&gt;</p>
      <p>&lt;h2&gt;</p>
      <p>&lt;h3&gt;</p>
    </EuiText>
    </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="The image component uses figure and figcaption tags
        to convey its purpose."
      >
      <EuiText>
        <p>&lt;figure&gt;</p>
        <p>&lt;figcaption&gt;</p>
      </EuiText>
      </GuideRuleExample>

    </GuideRule>

    <GuideRule
      heading="ARIA roles for additional context"
      description="EUI uses ARIA attributes
      on the HMTL markup to
      convey additional information about the component. These attributes provide properties such as
      what the component does and the state it is in.
      In turn, assistive technologies can better
      communicate how users can interact with the component."
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="The accordian component uses the aria-expanded attribute to communicate whether or not the accordion is open."
      >
      <EuiText>
        <p>aria-expanded</p>
      </EuiText>

      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="An icon button uses the aria-label attribute to communicate the
        meaning of the button. Developers get a
        warning if the label isn't set."
      >
      <EuiText>
        <p>aria-label</p>
      </EuiText>

      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer />

    <EuiHorizontalRule/>

    <GuideRuleTitle>Page traversal with the keyboard</GuideRuleTitle>

    <GuideRule
      heading="Linear navigation of user interfaces"
      description="EUI components are built to support logical,
      linear exploration of user interfaces with the keyboard.
      Anything users can do with a mouse they should also be able to do with
      a keyboard or screen reader.  This includes traversing the page,
      changing focus, and performing tasks."
    />

    <GuideRule
      heading="Build in additional keyboard navigation"
      description="For elements without built-in keyboard navigation,
      you can use EuiKeyboardAccessible to make them keyboard accessible.
      This is necessary for non-button elements and anchor tags without href attributes."
    />


    <EuiSpacer />

    <EuiHorizontalRule/>



  </GuidePage>
);
