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
  EuiText,
  EuiHorizontalRule,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <GuidePage title="Accessibility">

    <EuiText>
      <p>
        Accessibility is about building products that everyone can use, including those with vision, hearing,
        cognitive, and motor impairments.  It’s a basic tenet of the EUI Framework.
        We’ve built in the color, markup, and behavior required for accessibility.&nbsp;
        <strong>When you use the EUI Framework, you can be confident you&apos;re building
        an experience for users of all abilities.
        </strong>
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
        text="Core color palette"
      />

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Visuzlization color palette"
      />

    </GuideRule>

    <GuideRule
      heading="Color contrast ratios meet AA standards"
      description={
        <span>All EUI designs meet the
          <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html" target="blank">AA color contrast standard.</a>
        &nbsp;This standard ensures sufficient color contrast between foreground and background colors,
        which is important for users with color blindness and users with low vision.
        For a grid of EUI color combinations that pass the AA rating, see the&nbsp;
          <Link to="/guidelines/colors">EUI color guideline
          </Link>.
        </span>}
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Dark text on a light background offers good contrast between colors."
      />

      <GuideRuleExample
        frame
        panel={false}
        type="dont"
        text="Light text on a light background can be difficult to read."
      />
    </GuideRule>

    <EuiHorizontalRule/>

    <GuideRuleTitle>Meaningful HTML markup</GuideRuleTitle>



    <GuideRule
      heading="Semantic HTML for component identification"
      description="EUI provides a set of semantically correct components.
      Buttons are built with a button tag, headings with the heading tag,
      images with the figure tag, and so on. Semantic HTML enables assistive technologies to properly
      identify the component for the user."
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="The EUI description list is built using the <dl> tag in conjunction with
        <dt>, which defines the term, and <dd> which defines the description."
      >
        <EuiText>
          <p>&lt;dd&gt;</p>
          <p>&lt;dl&gt;</p>
          <p>&lt;dt&gt;</p>
        </EuiText>
      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="The EUI image component is built with the figure and figcaption tags."
      >
        <EuiText>
          <p>&lt;figure&gt;</p>
          <p>&lt;figcaption&gt;</p>
        </EuiText>
      </GuideRuleExample>

    </GuideRule>

    <GuideRule
      heading="ARIA roles for extra context"
      description="EUI components include ARIA roles, states, and properties
      on the HMTL markup to provide additional information about the component.
      These attributes can help assistive technologies convey such context as
      the the purpose of the component and how to interact with it."
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="The EUI accordian component uses the aria-expanded attribute to communicate whether or not the accordion is open."
      >
        <EuiText>
          <p>aria-expanded</p>
        </EuiText>

      </GuideRuleExample>

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="The EUI icon button uses the aria-label attribute to communicate the
        button's action. Developers get a
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
      heading=""
      description="EUI components are built to support logical,
      linear exploration of the user interface with the keyboard.
      Anything users can do with a mouse they should also be able to do with
      a keyboard or screen reader.  This includes traversing the page,
      changing focus, and performing tasks."
    >

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text="Image of keyboard navigation"
      />

      <GuideRuleExample
        frame
        panel={false}
        type="do"
        text=""
      />

    </GuideRule>

    <EuiSpacer />

    <EuiHorizontalRule/>

    <GuideRuleTitle>Accessibility helpers</GuideRuleTitle>
    <EuiText>
      <p>The EUI Framework has a number of utilties that can help you design and build your product for accessibility.</p>
    </EuiText>

    <GuideRule
      heading="Choosing the best text and background combination"
      description={
        <span> In general, you should use either black or white for your text color. The&nbsp;
          <Link to="/utilities/is-color-dark">Is Color Dark utility
          </Link>
          &nbsp;can tell you which to color to use with your given background color.
        </span>}
    />

    <GuideRule
      heading="Making elements keyboard focusable"
      description={
        <span>In some cases you might need to use an element that doesn&apos;t have keyboard interactions,
        such as &lt;div&gt;, &lt;span&gt;, &lt;p&gt;, and &lt;a&gt; without an href.
        You can make these elements focusable and clickable by wrapping them in&nbsp;
          <Link to="/utilities/accessibility">EuiKeyboardAccessible
          </Link>.
        </span>}
    />

    <GuideRule
      heading="Setting focus on the first input in a modal"
      description="You can use onFocus to set focus on the first input when the modal opens.
      In a confirmation modal, this allows users to tab between Cancel and the primary action."
    />

    <GuideRule
      heading="Focus states"
      description="Some description"
    />


  </GuidePage>
);
