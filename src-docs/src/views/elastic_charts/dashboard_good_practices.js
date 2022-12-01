/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';

const themingSource = require('!!raw-loader!./theming');

import {
  EuiSpacer,
  EuiText,
  EuiLink,
  EuiImage,
  EuiCallOut,
} from '../../../../src/components';

import dashboard_closure from '../../images/dashboards_closure.png';
import dashboard_colors from '../../images/dashboards_colors_highlight.png';
import dashboard_hierarchy from '../../images/dashboards_hierarchy.png';
import dashboard_margins_01 from '../../images/dashboards_margins_01.png';
import dashboard_margins_02 from '../../images/dashboards_margins_02.png';
import dashboard_ratio from '../../images/dashboards_ratio.png';
import dashboard_right_chart from '../../images/dashboards_right_chart.png';
import dashboard_titles from '../../images/dashboards_titles.png';

export const DashboardGoodPractices = {
  title: 'Dashboard Good Practices',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        <p>
          EUI provides utilities and documentation for working with{' '}
          <EuiLink
            href="https://elastic.github.io/elastic-charts"
            target="_blank"
          >
            Elastic Charts
          </EuiLink>
          , an open source charting library also created and maintained by
          Elastic.
        </p>
      </EuiText>
    </Fragment>
  ),
  sections: [
    {
      title: 'Introduction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Dashboards are the most common way to monitor our own data, to be
            alerted of important events and to gather insights. They typically
            work combining different charts that might be completely unrelated
            as they can share the same data source from different points of
            view. <br />
            <br />
            To understand the role of dashboards it&apos;s important to frame
            what they are and what is their function, to avoid using them in the
            wrong way. We will use the definition that Stephen Few uses in his
            “Information design dashboard”, where he states:
            <br />
            <br />{' '}
            <strong>
              <i>
                A dashboard is a visual display of the most important
                information needed to achieve one or more objectives;
                consolidated and arranged on a single screen so the information
                can be monitored at a glance.
              </i>
            </strong>
            <br />
            <br /> It&apos;s important to learn how to get the best out of this
            tool, to do so we put together a series of high level principles
            that could help you to create a dashboard that leverages your data
            and facilitates its understanding.
          </p>

          <EuiCallOut title="Dashboard practical guides" iconType="logoKibana">
            <p>
              If you are looking for a practical guide of the functionalities of
              dashboards and a basic tutorial on how to handle them, have a look
              at this page:{' '}
              <EuiLink
                href="https://www.elastic.co/guide/en/kibana/current/dashboard.html"
                target="_blank"
              >
                Kibana Guide
              </EuiLink>
              .
            </p>
          </EuiCallOut>
          <EuiSpacer />
        </Fragment>
      ),
    },
    {
      title: 'Context',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            A wide assumption in design is that everything depends on the
            context and dashboards are not different. Similar charts could work
            differently in different environments and therefore we should always
            try to understand as much as possible what kind of context we are
            working with.
            <br />
            <br /> To help this process you can try asking yourself questions
            like:
            <br />
            <br />
            <strong>Who is going to use this dashboard?</strong> <br />
            <br />
            Identifying your users is the most important thing that you have to
            do. This will help you understand how descriptive you have to be
            with title, charts typologies and explanation according to users
            skills and field knowledge.
            <br />
            <br />
            <strong> How much time will the users have?</strong> <br />
            <br />
            Dashboards should always be conceived for an immediate, clear and
            fast fruition. Don&apos;t overcomplicate it, give the users the
            information they need in the best and clearest way possible. <br />
            <br />
            <strong>
              What is the main goal of this dashboard and if there are, what are
              the secondary ones?
            </strong>
            <br />
            <br /> This could help you identify your primary charts and how to
            build up a narrative that could go from primary to secondary charts,
            creating a comprehensive overview of the context. <br />
            <br />
            <strong>
              What kind of charts can help users identify insights in the most
              immediate and clear way?
            </strong>
            <br />
            <br /> We know this is not a simple task and we are currently
            working on a proper series of guidance on how to choose a chart, our
            plan is to have a dedicated page for each chart typology where you
            will be able to find all the information needed ot use it properly.
            In the meanwhile we can recommend two great resources that will help
            you decide what to do with a set of data. First, the chart
            classification made by dr. Andrew Abela is a classic in the
            determination of the best charts based on function. You can find it{' '}
            <EuiLink
              href="https://flowingdata.com/wp-content/uploads/2009/01/chart-chart1.jpg?w=640"
              target="_blank"
            >
              here
            </EuiLink>
            . Second, this great archive made by the Danish design studio Ferdio
            helps you learn about charts and filter by purpose. You can find the
            archive{' '}
            <EuiLink href="https://datavizproject.com/" target="_blank">
              here
            </EuiLink>
            .
          </p>

          <EuiSpacer />
        </Fragment>
      ),
    },
    {
      title: 'Organization and hierarchy',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Studies such as Gestalt show how the positioning of elements in
            space can define their belonging, with a certain degree this can be
            applied to dashboards. <br />
            <br />
            <strong>
              <u>Closure</u>
            </strong>
            <br />
            <br /> Charts that are related to the same typology of data or that
            are somehow connected by meaning should stay close together. When
            two related charts are placed away from each other the effort
            required of the user to move from one to the other could be too
            much, it&apos;s better to try to reduce this effort by putting them
            close together. Sometimes they can also work together. In the
            following example we show how two Metric Charts could live next to a
            Line Chart that share a more detailed version of the same data. As
            you can see the charts colors match, this way we can safely remove
            the legend from the line chart which is no longer necessary and we
            can have a wider understanding of the data.
            <EuiSpacer size="l" />
            <EuiImage
              alt="Dashboard example with related charts, placed closed to each other."
              url={dashboard_closure}
              size="678px"
            />
            <EuiSpacer size="l" />
            <strong>
              <u>Hierarchy</u>
            </strong>
            <br />
            <br /> There are two main concepts that you have to keep in mind
            when organizing charts in a dashboard:
            <br />
            <br />
            <strong>Reading Direction →</strong> Most people are used to reading
            from top to bottom, this concept can be applied on dashboards as
            well. Place at the top of your page the most important charts and
            the ones that could give a brief and immediate summary of the
            context. A good general suggestion would be to increase the level of
            detail while you reach the bottom of the dashboard, this way users
            that are interested in getting all the information can obtain them
            without requiring too much effort from user that only need a quick
            glance of the situation.
            <br />
            <br />
            <strong>Central focal point →</strong> Placing a big chart,
            especially with big visual shapes such as rectangles, at the center
            of the dashboard would help reinforce a natural visual focal point
            that lies in the center of the interface. As you can see in the
            following example, the barchart with blue bears is clearly the
            predominant piece of information and where we want the users to
            focus primarily. Keep in mind these two concepts and use them
            according to your needs.
            <EuiSpacer size="l" />
            <EuiImage
              alt="Dashboard with an organized hierarchy."
              url={dashboard_hierarchy}
              size="678px"
            />
            <EuiSpacer size="l" />
            <strong>
              <u>Rows</u>
            </strong>
            <br />
            <br /> A simple and common practice to structure your dashboard
            would consist in dividing it into rows. Placing charts in rows would
            make them belong to “sections” and therefore they will be considered
            related among each other. It&apos;s a good principle to follow when
            structuring a dashboard from top to bottom into different layers of
            detail and complexity.
          </p>
          <EuiSpacer />
        </Fragment>
      ),
    },
    {
      title: 'Respect the aspect ratio',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Within the data visualization field there have been multiple
            attempts to create a solid and unique rule to guide people in
            designing well proportioned charts. When is it ok to have an
            horizontal layout, how much can we shrink it without losing
            readability? <br />
            <br />
            There is no universal answer to these questions and the rules that
            currently are shared among the data community are far too complex to
            be understood and correctly used by anybody. We believe that a high
            level concept could do the work in our case. We suggest avoiding
            charts that are too narrow or too short, since we mainly deal with
            time series data and keep in mind that an horizontal proportion
            might be the best in showing trends and small variations.
            <br />
            <br />
            There are as usual exceptions, some charts (e.g. scatterplot) might
            benefit from squared proportions, look for specific instructions on
            each chart&apos;s page.
          </p>
          <EuiSpacer size="l" />
          <EuiImage
            alt="Different chart proportions."
            url={dashboard_ratio}
            size="678px"
          />
          <EuiSpacer size="l" />
        </Fragment>
      ),
    },
    {
      title: 'Use the right chart model',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            When creating a new chart please consider its implied features. In
            the following example we can see how the area chart on the left is
            hard to read when we have really small numbers. Lines that move
            diagonally tend to hide small numbers due to the oblique direction
            that they follow, a stacked barchart instead is way better in
            showing details such as the one described. <br />
            <br />
            This is just an example useful to explain the concept and can be
            applied to several typologies of visualization, if you are stuck and
            don&apos;t know which chart to pick please feel free to reach out to
            the datavis team.
          </p>
          <EuiSpacer size="l" />
          <EuiImage
            alt="Comparison between two chart models."
            url={dashboard_right_chart}
            size="678px"
          />
          <EuiSpacer size="l" />
        </Fragment>
      ),
    },
    {
      title: 'Colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>Consistency →</strong>The most important thing to keep in
            mind is that the best option is always to stick with the guidelines
            provided by our EUI. Colors provided there for visualization have
            been tested for accessibility contrast and using them you would be
            sure to properly serving the biggest audience. You can find this
            documentation{' '}
            <EuiLink
              href="https://elastic.github.io/eui/#/elastic-charts/creating-charts"
              target="_blank"
            >
              here
            </EuiLink>
            . <br />
            <br /> In addition to that, following these guidelines you will be
            sure to get a consistent interface that will work perfectly with all
            other solutions.
            <strong>Relevance →</strong>
            If your dashboard is made to identify specific behaviors it might be
            interesting to consider a color setting that could help pointing it
            out. Use a neutral color for generic elements and an accent one for
            the things that you are looking for.
          </p>
          <EuiSpacer size="l" />
          <EuiImage
            alt="Dashboard entirely colored with neutral tones, apart from a highlighted charts which is red."
            url={dashboard_colors}
            size="678px"
          />
          <EuiSpacer size="l" />
          <p>
            <strong>Custom brands →</strong>Sometimes it happens that a
            dashboard needs to be customized according to a client brand
            identity. When so, be cautious and pick really few colors to work
            with, try to make the charts consistent among each other and
            don&apos;t forget about accessibility. <br />
            <br />
            If you want to go deeper and study how to work with colors, consider
            reading this great summary by Lisa Charlotte Muth from{' '}
            <EuiLink
              href="https://blog.datawrapper.de/colors-for-data-vis-style-guides/"
              target="_blank"
            >
              Datawrapper
            </EuiLink>
            .{' '}
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Titles, labels and margins',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>Titles →</strong>
            Titles can have a strong visual impact on dashboards, especially
            when there are a lot of small charts. Two principles can generally
            be followed:
            <br />
            <ul>
              <li>
                remove unnecessary or repetitive titles when the information is
                already explained or written within the chart (e.g. Metric
                Charts)
              </li>
              <li>
                when title is needed make it self explanatory and exhaustive,
                this way you will be able to remove axis titles and other
                specifications leaving more space for the charts itself.
              </li>
            </ul>
          </p>
          <EuiSpacer size="l" />
          <EuiImage
            alt="Example of good and bad use of titles on top of charts."
            url={dashboard_titles}
            size="678px"
          />
          <EuiSpacer size="l" />
          <p>
            <strong>Margins →</strong>
            Kibana dashboards offer the possibility to apply margins between
            chart panels, we would suggest to always do that.
            <br /> Margins create separation between charts which is an
            important visual feature, it helps identifying when two elements
            belong together or not while, at the same time, they provide more
            spacing and empty spaces that are always useful in making our
            interface more clean and elegant.
            <br />
            <br /> Using margins will also automatically apply little shadows to
            panels, this will make them stand out from the background.
          </p>
          <EuiSpacer size="l" />
          <EuiImage
            alt="Example of bad use of titles on top of charts."
            url={dashboard_margins_02}
            size="500px"
            float="left"
          />
          <EuiImage
            alt="Example of good use of titles on top of charts."
            url={dashboard_margins_01}
            size="500px"
          />
          <EuiSpacer size="l" />
          <p>
            <strong>Labels/Numbers/Formatting →</strong>
            Reduce the number of decimal places to the absolutely necessary
            ones. Use tables whenever you need precise numbers. <br />
            If possible, remove redundant labels. If we are talking about Usage
            metrics, then you can easily remove the Usage word used across 7
            charts out of 8 charts in the prev example.
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Lens',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Always use Lens, when possible. There are still a few
            functionalities that you might not find in Lens (within this
            document you can learn more about them:
            <EuiLink
              href="https://docs.google.com/document/d/1uyyFGx6xA5Kvl8c-ZdvXdvBGrHTylxU9F69TGqfzdmw/edit?usp=sharing"
              target="_blank"
            >
              link
            </EuiLink>
            ) but everything is gradually moving into this application. <br />
            It is the best choice to be consistent and up to date and it should
            always be your first choice when creating new visualizations.
          </p>
          <EuiSpacer size="l" />
        </Fragment>
      ),
    },
  ],
};
