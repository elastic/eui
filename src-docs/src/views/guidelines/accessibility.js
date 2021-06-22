import React from 'react';
import { Link } from 'react-router-dom';

import { GuideRule, GuideRuleExample } from '../../components';

import {
  EuiText,
  EuiLink,
  EuiSpacer,
  EuiCode,
  EuiCallOut,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiAspectRatio,
  EuiIcon,
  EuiTextColor,
} from '../../../../src/components';

const codeBlockProps = {
  language: 'html',
  paddingSize: 'none',
  fontSize: 'm',
};

export default {
  title: 'Accessibility guidelines',
  intro: (
    <>
      <EuiText grow={false}>
        <p>
          EUI provides a strong start to building accessibility into your apps.
          The components provided strive to meet{' '}
          <EuiLink href="https://www.w3.org/TR/WCAG21/">WCAG 2.1</EuiLink>{' '}
          guidelines on semantics, keyboard functionality, color contrast, and
          so on. How you stitch together these components in the overall page
          structure also plays a large role in meeting accessibility goals.
          Headings, landmarks, page titles, focus management, and accessible
          names all work together to create accessible apps.
        </p>
        <p>
          Building accessibility into your app is as important as code quality,
          visual design, and performance, and it’s also important that you test
          as you go. You can approach accessibility testing from three
          dimensions: automated, manual, and empathetic thinking. Use automated
          tests to quickly cover as much ground as possible, manual tests to
          address more complicated scenarios, and empathy to fill in the gaps.
        </p>
      </EuiText>

      <EuiSpacer size="xl" />
      <EuiTitle size="xs">
        <p>For a technical intro to accessibility and how EUI tackles it</p>
      </EuiTitle>

      <EuiSpacer size="l" />

      <EuiAspectRatio width={16} height={9} maxWidth={700}>
        <iframe
          title="Building and Testing for Accessibility with EUI"
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/iDXoEe8NkrE"
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </EuiAspectRatio>
      <EuiSpacer size="xl" />
    </>
  ),
  sections: [
    {
      title: 'Headings and landmarks',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              You can aid navigation and make pages more accessible for screen
              reader users by using solid headings and landmarks.{' '}
              <strong>Headings</strong> are the simplest way for screen readers
              to navigate pages. A good heading hierarchy:
            </p>
            <ul aria-label="Attributes of a good heading hierarchy">
              <li>
                Uses only one <EuiCode language="html">{'<h1>'}</EuiCode> on
                each page
              </li>
              <li>
                Doesn&apos;t skip levels{' '}
                <EuiCode language="html">{'<h1> → <h6>'}</EuiCode>
              </li>
              <li>Doesn&apos;t duplicate content</li>
            </ul>
            <h3>Heading examples</h3>
          </EuiText>

          <GuideRule>
            <GuideRuleExample
              type="do"
              text="Descend through headings as you work your way through the document."
              panelStyles={{ justifyContent: 'flex-start' }}
              panelProps={{ color: 'subdued' }}>
              <EuiCodeBlock {...codeBlockProps} transparentBackground>
                {`<EuiText>
  <h1>Discover your data</h1>
  <p>Some content</p>
  <h2>Drill into site metrics</h2>
  <h3>An important site metric</h3>
  <h3>Another important site metric</h3>
</EuiText>`}
              </EuiCodeBlock>
            </GuideRuleExample>

            <GuideRuleExample
              type="dont"
              text="This heading hierarchy is confusing. Also EuiText is not a good solution when you need to change heading presentation."
              panelStyles={{ justifyContent: 'flex-start' }}
              panelProps={{ color: 'subdued' }}>
              <EuiCodeBlock {...codeBlockProps} transparentBackground>
                {`<EuiText>
  <EuiScreenReaderOnly>
    <h1>Discover your data</h1>
  </EuiScreenReaderOnly>
  <p>Some content</p>
  <h2>Discover your data</h2>
  <!-- Missing h3 header -->
  <h4 className="myLargeTitle">
    An important site metric
  </h4>
</EuiText>`}
              </EuiCodeBlock>
            </GuideRuleExample>
          </GuideRule>

          <GuideRule>
            <GuideRuleExample
              type="do"
              text="This is a good heading hierarchy. Though visible headings are certainly better, sometimes that is difficult to accommodate so hidden headings can give additional context."
              panelStyles={{ justifyContent: 'flex-start' }}
              panelProps={{ color: 'subdued' }}>
              <EuiCodeBlock {...codeBlockProps} transparentBackground>
                {`<EuiTitle size="s"><h1>Discover your data</h1></EuiTitle>
<EuiScreenReaderOnly><h2>Drill into site metrics</h2></EuiScreenReaderOnly>
<EuiTitle size="l"><h3>An important site metric</h3></EuiTitle>
<EuiTitle size="m"><h3>Another important site metric</h3></EuiTitle>`}
              </EuiCodeBlock>
            </GuideRuleExample>
          </GuideRule>

          <EuiSpacer size="xl" />

          <EuiCallOut
            iconType="bell"
            size="s"
            title={
              <span>
                <Link to="/display/title">
                  <strong>EuiTitle</strong>
                </Link>{' '}
                gives you a way to separate your presentation from your semantic
                markup.
              </span>
            }
          />

          <EuiSpacer size="xl" />

          <EuiText grow={false}>
            <p>
              <strong>Landmarks</strong> are another way for screen readers to
              navigate pages. A benefit of landmarks is that they offer more
              context on the type of content to expect than a heading. This is
              useful for tech that offers reader modes (e.g., Firefox, Safari,
              and apps like Pocket) and new form factors (e.g., smartwatches).
              Many landmarks are mapped to HTML elements, such as{' '}
              <EuiCode language="html">{'<main>'}</EuiCode>,{' '}
              <EuiCode language="html">{'<aside>'}</EuiCode>,{' '}
              <EuiCode language="html">{'<article>'}</EuiCode>; others are
              exposed through the <EuiCode>{'role'}</EuiCode> attribute.
            </p>
            <p>
              You can implement named landmarks with{' '}
              <EuiCode>aria-label</EuiCode> or{' '}
              <EuiCode>aria-labelledby</EuiCode>. However, having a heading
              inside of the landmark (even if it is visually hidden) and
              referenced by <EuiCode>aria-labelledby</EuiCode> is preferred.
            </p>
            <h3>Landmarks example</h3>
          </EuiText>

          <GuideRule>
            <GuideRuleExample
              type="do"
              text="Use HTML5 elements which convey semantic meaning about their purpose. Notice that all of the content is inside of semantic elements."
              panelStyles={{ justifyContent: 'flex-start' }}
              panelProps={{ color: 'subdued' }}>
              <EuiCodeBlock {...codeBlockProps} transparentBackground>{`<body>
  <header className="appHeader">
    <!-- content -->
  </header>
  <main><!-- content --></main>
  <footer className="appFooter">
    <!-- content -->
  </footer>
</body>`}</EuiCodeBlock>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              text="Classes provide no semantic meaning and not all elements provide semantic meaning either."
              panelStyles={{ justifyContent: 'flex-start' }}
              panelProps={{ color: 'subdued' }}>
              <EuiCodeBlock {...codeBlockProps} transparentBackground>{`<body>
  <div className="appHeader"></div>
  <discover-app></discover-app>
  <ul className="appFooter"></ul>
</body>`}</EuiCodeBlock>
            </GuideRuleExample>
          </GuideRule>
          {/* This spacer is hacks because GuideRuleExamples can't have multi-line captions */}
          <EuiSpacer size="xxl" />
          <EuiTitle size="s">
            <h3>Headings and named landmarks example</h3>
          </EuiTitle>
          <GuideRule>
            <GuideRuleExample
              type="do"
              text="Use landmarks and headings together to build complex pages."
              panelStyles={{ justifyContent: 'flex-start' }}
              panelProps={{ color: 'subdued' }}>
              <EuiCodeBlock
                {...codeBlockProps}
                transparentBackground>{`<header aria-labelledby="pageHeading">
  <h1 id="pageHeading">Discover your data</h1>
  <form role="search" aria-label="Site search"> <!-- input + label go in here --> </form>
<header>
<main aria-labelledby="contentHeading">
  <h2 id="contentHeading">Drill into site metrics</h2>
  <form role="search" aria-label="Search your data">
    <!-- input + label go in here -->
  </form>
</main>`}</EuiCodeBlock>
            </GuideRuleExample>
          </GuideRule>
          <EuiSpacer size="l" />
          <EuiText size="s" grow={false}>
            <h3 id="further-reading">Further reading</h3>
            <ul aria-labelledby="landmarks-headings further-reading">
              <li>
                <EuiLink href="https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html">
                  W3C: Aria Landmarks
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://www.w3.org/WAI/tutorials/page-structure/">
                  W3C: Page Structure Concepts Tutorial
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#Good_semantics">
                  MDN: Good Semantics
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://www.upyoura11y.com/page-layout/">
                  Up Your A11y: Accessible Page Layouts
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://www.upyoura11y.com/reusable-components-with-headers/">
                  Up Your A11y: Heading Levels in Reusable Components
                </EuiLink>
              </li>
            </ul>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Page titles',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              Each page requires a unique, informative title that accurately
              reflects what the page does. The best page titles put the unique
              content first. Effectively, they&apos;re reverse-order
              breadcrumbs.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiFlexGroup alignItems="center" gutterSize="s">
            <EuiFlexItem grow={false}>
              <EuiIcon type="checkInCircleFilled" size="l" color="success" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiTitle size="xs">
                <p>{'Use this format: '}</p>
              </EuiTitle>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>{'{Unique page title} - {Site title}'}</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>
          <GuideRule>
            <GuideRuleExample
              type="do"
              minHeight={200}
              text="These are good example of page titles.">
              <div>
                <strong className="eui-textCenter eui-displayBlock">
                  Discover - Kibana
                </strong>
                <EuiSpacer />
                <strong className="eui-textCenter eui-displayBlock">
                  Rollup Jobs - Management - Kibana
                </strong>
              </div>
            </GuideRuleExample>
            <GuideRuleExample
              type="dont"
              minHeight={200}
              text={
                <>
                  Though unique, this does not provide enough context. <br />{' '}
                  <EuiTextColor color="secondary">
                    <strong>Use:</strong> Watchers - Management - Kibana
                  </EuiTextColor>
                </>
              }>
              <strong className="eui-textCenter eui-displayBlock">
                Watchers
              </strong>
            </GuideRuleExample>
          </GuideRule>
          <GuideRule>
            <GuideRuleExample
              type="dont"
              minHeight={200}
              text={
                <>
                  Although it provides all the context, putting the most
                  important bit at the end is hard to find. <br />{' '}
                  <EuiTextColor color="secondary">
                    <strong>Use:</strong> Spaces - Management - Kibana
                  </EuiTextColor>
                </>
              }>
              <strong className="eui-textCenter eui-displayBlock">
                Elastic Kibana - Spaces
              </strong>
            </GuideRuleExample>
            {/* This spacer is hacks because code blocks can't have multi-line captions */}
            <EuiSpacer size="xl" />
            <GuideRuleExample
              type="dont"
              minHeight={200}
              text={
                <>
                  Although this provides all the context and in a good order, a
                  title is not the place for any extra words. <br />{' '}
                  <EuiTextColor color="secondary">
                    <strong>Use:</strong> Reporting - Management - Kibana
                  </EuiTextColor>
                </>
              }>
              <strong className="eui-textCenter eui-displayBlock">
                This is the Reporting page of the Management section of Kibana.
              </strong>
            </GuideRuleExample>
          </GuideRule>

          <EuiSpacer size="xl" />

          <EuiText size="s" grow={false}>
            <h3>Further reading</h3>
            <ul aria-labelledby="titles further-reading">
              <li>
                <EuiLink href="https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=242#page-titled">
                  WCAG 2.4.2 Page Titled - Level A
                </EuiLink>
              </li>
            </ul>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Focus management',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <h3>Where is the focus state right now?</h3>
            <p>
              Focus states are an important part of design because they let
              keyboard users know where focus is currently at. All browsers ship
              with focus states for interactive elements, and most of the time
              you shouldn’t need to alter these. EUI goes further to customize
              focus states to match the Elastic brand and provide better visual
              states, including color contrast.
            </p>
            <h3>Where is the focus state going?</h3>
            <p>
              Given that a keyboard user primarily navigates pages in one
              direction (either forward or backward), it’s important to have an
              intuitive focus order. Focus order should follow the flow of the
              page to make it easy to follow. If you’ve made a normally
              non-interactive element like a{' '}
              <EuiCode language="html">{'<div>'}</EuiCode> interactive via
              JavaScript, you can enable a tab stop using{' '}
              <EuiCode>tabIndex=0</EuiCode>. If you want something that is only
              focusable programmatically, you can use{' '}
              <EuiCode>tabIndex=-1</EuiCode>.
            </p>
            <EuiCallOut
              iconType="alert"
              title={
                <span>
                  Using <EuiCode>tabIndex</EuiCode> values greater than 0 is
                  problematic and should be avoided.
                </span>
              }
              color="danger"
              size="s"
              heading="p"
            />
            <h3>How do I get back to where I was?</h3>
            <p>
              Navigating complex sites sometimes means your focus state will
              jump around (e.g., skip links, modals, typeaheads, and so on). If
              you remove an element that currently has focus without setting
              focus anywhere else, users start over at the beginning of the
              page. Unless there’s a strong reason to do otherwise, focus state
              should always return to where it was previously if the currently
              focused element disappears. For example, closing a modal might
              mean your focus is on a close button; when the modal closes, you
              should return focus to the button that opened the modal.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiText size="s" grow={false}>
            <h3>Further reading</h3>
            <ul aria-labelledby="focus further-reading">
              <li>
                <EuiLink href="https://www.w3.org/WAI/perspective-videos/keyboard">
                  W3C: Keyboard Compatibility
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://reactjs.org/docs/accessibility.html#programmatically-managing-focus">
                  React docs: Programmatically managing focus
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets">
                  MDN: Keyboard-navigable JavaScript widgets
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://webaim.org/techniques/keyboard">
                  WebAIM: Keyboard Accessibility
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://www.upyoura11y.com/screen-reader-keyboard-navigation">
                  Up Your A11y: Getting Started with Keyboard Navigation and
                  Screen Readers
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://tink.uk/the-difference-between-keyboard-and-screen-reader-navigation/">
                  The difference between keyboard and screen reader navigation
                </EuiLink>
              </li>
            </ul>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Naming',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              An accessible name is the name of an HTML element as it’s exposed
              to assistive technology. An accessible name can then be read by a
              screen reader or can be targeted for an action.
            </p>

            <h3>Most elements</h3>
            <p>
              For most content, the accessible name comes from the element’s
              inner text, such as:{' '}
              <EuiCode language="html" size="s">
                {'<a href="https://elastic.co">Elastic.co</a>'}
              </EuiCode>
              . A screen reader can now read it out something like
              &ldquo;Elastic.co, link&rdquo; or, using voice commands, it can be
              controlled with &ldquo;Click Elastic.co link&rdquo;.
            </p>
            <h3>Images and other elements</h3>
            <p>
              Some content might require special attributes to give an element
              an accessible name. For images, you can use <EuiCode>alt</EuiCode>{' '}
              attributes, such as:
            </p>
            <EuiCodeBlock language="html" paddingSize="s" fontSize="m">
              {'<img src="image1.jpg" alt="An apple lays on a table">'}
            </EuiCodeBlock>
            <h3>Buttons without inner text</h3>
            <p>
              For buttons without descriptive text content, you can rely on ARIA
              to bring meaning back:
            </p>
            <EuiCodeBlock language="html" paddingSize="s" fontSize="m">
              {'<button aria-label="Close modal">Ｘ</button>'}
            </EuiCodeBlock>
            <h3>Forms and more complex patterns</h3>
            <p>
              Some HTML elements have associated elements that provide
              accessible names. Form elements are the most ubiquitous example: a
              checkbox doesn’t have a name by itself, but when it is associated
              with a label, assistive technologies can make the connection:
            </p>
            <EuiCodeBlock language="html" paddingSize="s" fontSize="m">
              {`<input type="checkbox" id="subscribe">
<label for="subscribe">Subscribe to Elastic news</label>`}
            </EuiCodeBlock>
            <h3>Of note: Repeated calls to action</h3>
            <p>
              Having only an accessible name, however, doesn’t always lead to
              the best UX. Take a list of available fields that someone might
              want to add to their filter (say, on the discovery page of a
              popular open source project):
            </p>
            <EuiCodeBlock language="html" paddingSize="m" fontSize="m">
              {`<h3>Available fields</h3>
<ul>
  <li>
    @timestamp
    <button>add</button>
  </li>
  <li>
    _id
    <button>add</button>
  </li>
  <li>
    _index
    <button>add</button>
  </li>
</ul>`}
            </EuiCodeBlock>
            <p>
              Here, the 3 buttons have the same accessible name. There are a few
              different patterns you can use to differentiate between repeated
              items. For example, each button below shows a possible pattern you
              can use (in order of recommended best practice):
            </p>
            <EuiCodeBlock language="html" paddingSize="m" fontSize="m">
              {`<h3 id="available">Available fields</h3>
<ul aria-labelledby="available">
  <li>
    _id
    <button aria-label="add _id field to your current filter">
      add
    </button>
  </li>

  <!-- The next two options are hardest to make work with Elastic’s i18n framework -->

  <li>
    @timestamp
    <button>
      add
      <EuiScreenReaderOnly>
        @timestamp field to your current filter
      </EuiScreenReaderOnly>
    </button>
  </li>

  <li>
    <!-- This isn’t recommended but will work in a pinch -->
    <span id="filed3">_index</span>
    <button id="button3" aria-labelledby="button3 field3">add</button>
  </li>
</ul>
`}
            </EuiCodeBlock>
            <EuiCallOut
              iconType="bell"
              title="Give lists an accessible name to improve their discoverability!"
              heading="p">
              <EuiCodeBlock language="html" paddingSize="m" fontSize="s">
                {`<!-- Can be any heading level or even a paragraph -->
<h1 id="a1b2c3">My favorite fruit</h1>
<ul aria-labelledby="a1b2c3"><!-- ... --></ul>

<!-- You can still provide an accessible title even if there's no visual label -->
<ul aria-label="My favorite vegetables">...</ul>`}
              </EuiCodeBlock>
            </EuiCallOut>
            <EuiSpacer />
          </EuiText>
          <EuiSpacer />
          <EuiText size="s" grow={false}>
            <h3>Further reading</h3>
            <ul aria-labelledby="names further-reading">
              <li>
                <EuiLink href="https://www.w3.org/WAI/tutorials/forms/labels/">
                  W3c: Labeling Controls
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://developer.paciellogroup.com/blog/2017/04/what-is-an-accessible-name">
                  The Paciello Group: What is an accessible name?
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://webaim.org/techniques/forms/controls">
                  WebAIM: Creating Accessible Forms
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://hacks.mozilla.org/2019/06/how-accessibility-trees-inform-assistive-tech">
                  Mozilla: How accessibility trees inform assistive tech
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://alistapart.com/article/semantics-to-screen-readers">
                  A List Apart: Semantics to Screen Readers
                </EuiLink>
              </li>
            </ul>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Testing considerations',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              There are a lot of aspects to accessibility, and covering all the
              bases can be a lot to keep in mind. By relying on standards, you
              can minimize the amount of special casing you have to do in code,
              but you should still be cognizant of the many modalities in which
              users might use your products.
            </p>
            <h3>Low-vision</h3>
            <p>
              While low-vision users may use many assistive technologies in
              tandem, this section focuses on zooming. Two ways that users can
              zoom the page are by increasing the base font-size with browser
              tools or by using a 3rd-party magnifier (sometimes, a physical
              magnifier) to better see the screen.
            </p>
            <p>
              <EuiLink href="https://www.w3.org/WAI/WCAG21/quickref/#resize-text">
                WCAG 1.4.4
              </EuiLink>{' '}
              defines 200% browser zoom should continue to work with no further
              action from the user as a Level AA criteria.
            </p>
            <p>
              <EuiLink href="https://www.youtube.com/watch?v=QjKG4Tx9ER8&t=473s">
                ZoomText
              </EuiLink>{' '}
              is the most popular 3rd-party magnifier that gives users a window
              they can drag over content to magnify and read it out loud.
              Testing for the best experiences here is exceptionally difficult
              because you must make visual judgement calls. Specifically,
              related pieces of information should be close enough together for
              a low-vision user to efficiently interact with the UI.
            </p>
            <h3 id="screen-readers">Low-vision/blind (screen readers)</h3>
            <p>
              Blind and low-vision users often rely on tools, such as screen
              readers and braille readers, to navigate the web. Screen and
              braille readers read the page from top to bottom. Building a page
              with a good structure, will make it quick and easy to navigate.
              Braille readers are a textual representation of what a screen
              reader would say so we can focus on screen reader compatibility.
            </p>
            <p style={{ margin: '0' }}>
              The 3 most common, desktop, screen readers, and their most common
              browser pairings are:
            </p>
            <ul aria-label="Most common, desktop, screen reader/browser combinations">
              <li>JAWS with Chrome</li>
              <li>NVDA with Firefox</li>
              <li>VoiceOver with Safari</li>
            </ul>
            <p style={{ margin: '0' }}>Mobile is a little simpler:</p>
            <ul aria-label="Mobile screen reader/OS combinations">
              <li>VoiceOver for iOS</li>
              <li>TalkBack for Android</li>
            </ul>
            <ul aria-labelledby="screen-readers further-reading">
              <li>
                <EuiLink href="https://www.apple.com/voiceover/info/guide/_1124.html">
                  Apple docs: Learning VoiceOver Basics
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://webaim.org/articles/voiceover">
                  WebAIM: Using VoiceOver to Evaluate Web Accessibility
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://webaim.org/articles/nvda">
                  WebAIM: Using NVDA to Evaluate Web Accessibility
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://webaim.org/articles/jaws">
                  WebAIM: Using JAWS to Evaluate Web Accessibility
                </EuiLink>
              </li>
              <li>
                <EuiLink href="http://uncaughtreferenceerror.com/a-crash-course-to-screenreaders-for-sighted-developers">
                  An Intro To Screen Reader Testing for Sighted Developers
                </EuiLink>
              </li>
            </ul>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Learning resources',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <ul>
              <li>
                A wide-reaching{' '}
                <EuiLink href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility">
                  guide on accessibility on MDN
                </EuiLink>{' '}
                covering basics and best practices for a variety of subjects
              </li>
              <li>
                The <EuiLink href="https://caniuse.com/">caniuse</EuiLink> of
                ARIA attributes:{' '}
                <EuiLink href="https://a11ysupport.io">
                  Accessibility support
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://developers.google.com/web/fundamentals/accessibility">
                  Accessibility web fundamentals by Google
                </EuiLink>
                , similar in content to the MDN guide, but more guided
              </li>
              <li>
                If you prefer videos to reading, a great &ldquo;pick your
                subject&rdquo; style series{' '}
                <EuiLink href="https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g">
                  A11ycasts
                </EuiLink>{' '}
                is available
              </li>
            </ul>
            <h3 id="examples">Practical examples</h3>
            <p>
              For many things, there’s no need to reinvent the wheel. If your
              component is featured in one of these two sources, feel free to
              borrow heavily!
            </p>
            <ul aria-labelledby="examples">
              <li>
                <EuiLink href="https://inclusive-components.design">
                  Inclusive Components
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://github.com/scottaohara/accessible_components">
                  Accessible Components
                </EuiLink>
              </li>
            </ul>
            <h3 id="tooling">Tooling</h3>
            <ul aria-labelledby="tooling">
              <li>
                Axe plugin for{' '}
                <EuiLink href="https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd">
                  Chrome
                </EuiLink>{' '}
                and{' '}
                <EuiLink href="https://addons.mozilla.org/en-US/firefox/addon/axe-devtools">
                  FF
                </EuiLink>
              </li>
            </ul>
            <h3 id="specs">Spec docs</h3>
            <ul aria-labelledby="specs">
              <li>
                <EuiLink href="https://www.w3.org/TR/using-aria">
                  Using ARIA
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://www.w3.org/TR/WCAG21">WCAG 2.1</EuiLink>
              </li>
              <li>
                <EuiLink href="https://www.w3.org/WAI/WCAG21/quickref">
                  How to Meet WCAG (Quick Reference)
                </EuiLink>
              </li>
              <li>
                <EuiLink href="https://www.w3.org/TR/wai-aria-1.1">
                  WAI ARIA 1.1
                </EuiLink>
              </li>
            </ul>
          </EuiText>
        </>
      ),
    },
  ],
};
