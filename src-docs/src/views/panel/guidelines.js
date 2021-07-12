import React from 'react';

import { GuideRule, GuideRuleExample } from '../../components';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCard,
} from '../../../../src/components';

export default () => (
  <>
    <EuiText grow={false}>
      <h2>So you want to nest panels...</h2>
      <p>
        Panels are one of the basic building blocks of EUI and have a wide
        variety of styles. They are a great tool to help segment and group
        content. But as layouts grow in complexity, <strong>nesting</strong>{' '}
        panels becomes necessary and it can sometimes be difficult to decide
        what style combinations make sense within a panel stack.
      </p>
      <p>
        The following are some guidelines that are meant to help reduce the
        design choices necessary when nesting panels within panels.
      </p>
    </EuiText>

    <EuiSpacer size="xxl" />

    <EuiPanel
      color="subdued"
      paddingSize="l"
      hasShadow={false}
      style={{ justifyContent: 'center', display: 'flex' }}>
      <EuiPanel hasShadow={true} hasBorder={false} style={{ maxWidth: 650 }}>
        <EuiTitle size="m">
          <span>Panel 1</span>
        </EuiTitle>
        <EuiSpacer />
        <EuiPanel color="subdued">
          <EuiTitle size="s">
            <span>Panel 2</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiFlexGroup wrap={true}>
            <EuiFlexItem>
              <EuiCard
                titleSize="xs"
                layout="horizontal"
                title="Card 1"
                description="Cards are panels too."
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                titleSize="xs"
                layout="horizontal"
                title="Card 2"
                description="Cards are panels too."
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                titleSize="xs"
                layout="horizontal"
                title="Card 3"
                description="Cards are panels too."
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      </EuiPanel>
    </EuiPanel>

    <EuiSpacer size="xxl" />

    <GuideRule
      heading="When nesting 3 or more panels, use different panel styles"
      description="If the same style panel is used between multiple nested panels, the hierarchy can be visually confusing and the benefit of panels breaks down. While there is no hard and fast rule in which sequence of panels styles should be used,
                   varying the styles will help guide the user through the content relationship.">
      <GuideRuleExample
        type="do"
        text="Break up stacked panel styles with different style combinations.">
        <EuiPanel
          hasShadow={true}
          hasBorder={false}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel color="subdued">
            <EuiTitle size="xs">
              <span>Panel 2</span>
            </EuiTitle>
            <EuiSpacer />
            <EuiPanel
              hasShadow={false}
              hasBorder={true}
              style={{ minHeight: 100 }}>
              <EuiTitle size="xxs">
                <span>Panel 3</span>
              </EuiTitle>
            </EuiPanel>
          </EuiPanel>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Too many of same panel style in a stack of panels (3+ deep) isn't helpful.">
        <EuiPanel
          hasShadow={false}
          hasBorder={true}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel hasShadow={false} hasBorder={true}>
            <EuiTitle size="xs">
              <span>Panel 2</span>
            </EuiTitle>
            <EuiSpacer />
            <EuiPanel
              hasShadow={false}
              hasBorder={true}
              style={{ minHeight: 100 }}>
              <EuiTitle size="xxs">
                <span>Panel 3</span>
              </EuiTitle>
            </EuiPanel>
          </EuiPanel>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="xl" />

    <GuideRule
      heading="Limit the use of shadows within a stack of panels"
      description="Shadows are great for drawing focus to a single single layer of a page.
                   But if everything has a shadow it becomes too noisy.
                   Use shadows sparingly and try to use them at either the top or bottom of the stack.">
      <GuideRuleExample
        type="do"
        text="Minimize shadows within a panel stack by removing the shadows from all but a single layer.">
        <EuiPanel
          hasShadow={false}
          hasBorder={true}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel color="subdued">
            <EuiTitle size="xs">
              <span>Panel 2</span>
            </EuiTitle>
            <EuiSpacer />
            <EuiPanel style={{ minHeight: 100 }}>
              <EuiTitle size="xxs">
                <span>Panel 3</span>
              </EuiTitle>
            </EuiPanel>
          </EuiPanel>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Stacking multiple shadowed panels is too noisy.">
        <EuiPanel
          hasShadow={true}
          hasBorder={false}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel hasShadow={true} hasBorder={false}>
            <EuiTitle size="xs">
              <span>Panel 2</span>
            </EuiTitle>
            <EuiSpacer />
            <EuiPanel
              hasShadow={true}
              hasBorder={false}
              style={{ minHeight: 100 }}>
              <EuiTitle size="xxs">
                <span>Panel 3</span>
              </EuiTitle>
            </EuiPanel>
          </EuiPanel>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Don’t overuse panels"
      description={
        'It’s easy to fall into the thinking that everything needs a panel. Carefully consider why you need a panel and if too many elements are fighting for attention.'
      }>
      <GuideRuleExample
        type="do"
        text="Reserve panels for drawing attention to certain elements.">
        <EuiPanel
          color="subdued"
          hasShadow={false}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiTitle size="xs">
            <span>Sub-heading</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel style={{ minHeight: 100 }}>
            <EuiTitle size="xxs">
              <span>Panel 2</span>
            </EuiTitle>
          </EuiPanel>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        text="Remove panel styles but keep the component purely for containment.">
        <EuiPanel
          color="subdued"
          hasShadow={false}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiPanel color="transparent" paddingSize="none">
            <EuiTitle size="xs">
              <span>Panel 2</span>
            </EuiTitle>
            <EuiSpacer />
            <EuiPanel
              hasShadow={true}
              hasBorder={false}
              style={{ minHeight: 100 }}>
              <EuiTitle size="xxs">
                <span>Panel 3</span>
              </EuiTitle>
            </EuiPanel>
          </EuiPanel>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Consider the relationship between sibling panels"
      description="When sibling panels have the same meaning and interaction, like cards, it is best to keep them all visually similar.
                    On the other hand you can use panels to separate main from aside content.
                    In this case, you will want to ensure visual prominence of the main content.">
      <GuideRuleExample
        type="do"
        text="Use the same styles for cards in a row.">
        <EuiPanel
          hasShadow={false}
          hasBorder={true}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel color="subdued">
            <EuiTitle size="xs">
              <span>Panel 2</span>
            </EuiTitle>
            <EuiSpacer />
            <EuiFlexGroup wrap={true}>
              <EuiFlexItem>
                <EuiCard
                  titleSize="xs"
                  layout="horizontal"
                  title="Card 1"
                  description="Cards are panels too."
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiCard
                  titleSize="xs"
                  layout="horizontal"
                  title="Card 2"
                  description="Cards are panels too."
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiPanel>
      </GuideRuleExample>

      <GuideRuleExample type="do" text="Only emphasize the main content panel.">
        <EuiPanel
          color="subdued"
          hasShadow={false}
          style={{ transform: 'scale(.9)' }}>
          <EuiTitle size="s">
            <span>Panel 1</span>
          </EuiTitle>
          <EuiSpacer />
          <EuiFlexGroup responsive={false} wrap={true}>
            <EuiFlexItem grow={2}>
              <EuiPanel
                hasShadow={true}
                hasBorder={false}
                style={{ minHeight: 170 }}>
                <EuiTitle size="xs">
                  <span>Main panel</span>
                </EuiTitle>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiPanel
                hasShadow={false}
                hasBorder={true}
                color="transparent"
                style={{ minHeight: 170 }}>
                <EuiTitle size="xs">
                  <span>Aside panel</span>
                </EuiTitle>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      </GuideRuleExample>
    </GuideRule>
  </>
);
