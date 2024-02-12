import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiCode,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiIcon,
} from '../../../../src';

import { PageComponentDemo } from './page_demo';
import { PageSectionDemo } from './page_section_demo';
import { PageConfigurationsDemo } from './page_configurations_demo';

export const PageExample = {
  title: 'Page components',
  intro: (
    <>
      <EuiText>
        <p>
          Page layouts are modular and fit together in a precise manner, though
          certain parts can also be added or removed as needed. EUI provides
          both the <strong>individual page components</strong> and an{' '}
          <Link to="/templates/page-template">over-arching template</Link> for
          easily creating some pre-defined layouts.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        iconType="document"
        title="The following examples showcase the individual components only."
      >
        <p>
          If you&apos;re looking for full page layout examples, we recommend
          using the <Link to="/templates/page-template">EuiPageTemplate</Link>{' '}
          and use this page to modify the props of each part of the template.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Page, body, and sidebar',
      wrapText: false,
      text: (
        <div>
          <EuiText>
            <p>
              <strong>EuiPage</strong> is simply a flex wrapper that will
              automatically <EuiCode>grow</EuiCode> to fill the height of a flex
              container. You can also control the flex{' '}
              <EuiCode>direction</EuiCode> and the maximum width using
              <EuiCode>restrictWidth</EuiCode> which centers the page when it
              reaches the provided value (or <EuiCode>1200px</EuiCode> if set to{' '}
              <EuiCode>true</EuiCode>).
            </p>
            <p>
              <strong>EuiPageSidebar</strong> doesn&apos;t contain many
              configurations itself, but it does dictate how the rest of the
              page contents should be displayed. Typically you&apos;ll want to
              wrap all your page contents in <strong>EuiPageBody</strong> and
              set <EuiCode>{'panelled={true}'}</EuiCode> when you have a side
              bar.
            </p>
          </EuiText>
          <PageComponentDemo />
        </div>
      ),
    },
    {
      title: 'Page sections',
      wrapText: false,
      text: (
        <div>
          <EuiText>
            <p>
              <strong>EuiPageSection</strong> is a stackable component that is
              essentially an{' '}
              <Link to="/layout/panel">
                <strong>EuiPanel</strong>
              </Link>{' '}
              with props for quickly creating common usages. It is meant to be a
              direct descendent of <strong>EuiPageBody</strong> You&apos;ll need
              to set <EuiCode>{'grow={false}'}</EuiCode> to any content that you
              don&apos;t want to stretch within the page.
            </p>
            <p>
              To create dividers between contents, use the{' '}
              <EuiCode>bottomBorder</EuiCode> prop. The{' '}
              <EuiCode>{"'extended'"}</EuiCode> version ensures the border
              touches the sides of the parent. It also supports{' '}
              <EuiCode>restrictWidth</EuiCode> and <EuiCode>alignment</EuiCode>{' '}
              to align with common usages.
            </p>
          </EuiText>
          <PageSectionDemo />
        </div>
      ),
    },
    {
      title: 'Page configurations',
      wrapText: false,
      text: (
        <div>
          <EuiText>
            <p>
              When piecing all of the different page components together, the
              state of your application will dictate how best to configure each
              component. Ideally, your main content should always live within a{' '}
              <EuiCode>{"'plain'"}</EuiCode> colored body or section.
            </p>
            <p>
              When using{' '}
              <Link to="/display/empty-prompt">
                <strong>EuiEmptyPrompt</strong>
              </Link>{' '}
              to replace the main contents of your page you will want to use a
              panel color opposite that of the section color. For example:
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiTable>
            <EuiTableHeader>
              <EuiTableHeaderCell width={120}>
                EuiPageSidebar
              </EuiTableHeaderCell>
              <EuiTableHeaderCell width={120}>EuiPageHeader</EuiTableHeaderCell>
              <EuiTableHeaderCell>EuiPageBody</EuiTableHeaderCell>
              <EuiTableHeaderCell>EuiPageSection</EuiTableHeaderCell>
              <EuiTableHeaderCell>EuiEmptyPrompt settings</EuiTableHeaderCell>
            </EuiTableHeader>

            <EuiTableBody>
              <EuiTableRow>
                <EuiTableRowCell>
                  <EuiIcon
                    type="checkInCircleFilled"
                    color="green"
                    title="yes"
                  />
                </EuiTableRowCell>
                <EuiTableRowCell>
                  <EuiIcon
                    type="minusInCircle"
                    color="subdued"
                    title="doesn't matter"
                  />
                </EuiTableRowCell>

                <EuiTableRowCell mobileOptions={{ width: '100%' }}>
                  <EuiCode language="tsx">{'color="plain"'}</EuiCode>
                </EuiTableRowCell>

                <EuiTableRowCell mobileOptions={{ width: '100%' }}>
                  <EuiCode language="tsx">{'color="plain"'}</EuiCode>
                  <br />
                  <EuiCode language="tsx">{'bottomBorder={true}'}</EuiCode>
                </EuiTableRowCell>

                <EuiTableRowCell>
                  <EuiCode language="tsx">{'color="subdued"'}</EuiCode>
                </EuiTableRowCell>
              </EuiTableRow>

              <EuiTableRow>
                <EuiTableRowCell>
                  <EuiIcon type="error" color="danger" title="no" />
                </EuiTableRowCell>
                <EuiTableRowCell>
                  <EuiIcon
                    type="checkInCircleFilled"
                    color="green"
                    title="yes"
                  />
                </EuiTableRowCell>

                <EuiTableRowCell mobileOptions={{ width: '100%' }}>
                  <EuiCode language="tsx">{'color="transparent"'}</EuiCode>
                </EuiTableRowCell>

                <EuiTableRowCell mobileOptions={{ width: '100%' }}>
                  <EuiCode language="tsx">{'color="plain"'}</EuiCode>
                  <br />
                  <EuiCode language="tsx">{'bottomBorder="extended"'}</EuiCode>
                </EuiTableRowCell>

                <EuiTableRowCell>
                  <EuiCode language="tsx">{'color="subdued"'}</EuiCode>
                </EuiTableRowCell>
              </EuiTableRow>

              <EuiTableRow>
                <EuiTableRowCell>
                  <EuiIcon type="error" color="danger" title="no" />
                </EuiTableRowCell>
                <EuiTableRowCell>
                  <EuiIcon type="error" color="danger" title="no" />
                </EuiTableRowCell>

                <EuiTableRowCell mobileOptions={{ width: '100%' }}>
                  <EuiCode language="tsx">{'color="transparent"'}</EuiCode>
                </EuiTableRowCell>

                <EuiTableRowCell mobileOptions={{ width: '100%' }}>
                  <EuiCode language="tsx">{'color="transparent"'}</EuiCode>
                  <br />
                  <EuiCode language="tsx">{'bottomBorder="extended"'}</EuiCode>
                </EuiTableRowCell>

                <EuiTableRowCell>
                  <EuiCode language="tsx">{'color="plain"'}</EuiCode>
                </EuiTableRowCell>
              </EuiTableRow>
            </EuiTableBody>
          </EuiTable>
          <EuiSpacer />

          <EuiCallOut
            title={
              <>
                Reminder:{' '}
                <Link to="/templates/page-template">
                  <strong>EuiPageTemplate</strong>
                </Link>{' '}
                can handle all these configurations for you.
              </>
            }
          />

          <PageConfigurationsDemo />
        </div>
      ),
    },
  ],
};
