import React from 'react';
import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const TextColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      sampleType="text"
      colors={[
        {
          value: euiTheme.colors.textParagraph,
          token: 'colors.textParagraph',
          description: <>Default color for body text and paragraphs.</>,
        },
        {
          value: euiTheme.colors.textHeading,
          token: 'colors.textHeading',
          description: <>Slightly bolder color for headings and titles.</>,
        },
        {
          value: euiTheme.colors.textSubdued,
          token: 'colors.textSubdued',
          description: (
            <>
              For secondary or less prominent text such as help text,
              descriptions, and labels.
            </>
          ),
        },
        {
          value: euiTheme.colors.textGhost,
          token: 'colors.textGhost',
          description: (
            <>
              Light-colored text for use on <strong>dark backgrounds</strong>.
            </>
          ),
        },
        {
          value: euiTheme.colors.textInk,
          token: 'colors.textInk',
          description: (
            <>
              Dark-colored text for use on <strong>light backgrounds</strong>.
            </>
          ),
        },
        {
          value: euiTheme.colors.link,
          token: 'colors.link',
          description: <>Color for hyperlinks and interactive text elements.</>,
        },
        {
          value: euiTheme.colors.textPrimary,
          token: 'colors.textPrimary',
          description: (
            <>
              Text variant of the <strong>primary</strong> brand color.
            </>
          ),
        },
        {
          value: euiTheme.colors.textAccent,
          token: 'colors.textAccent',
          description: (
            <>
              Text variant of the <strong>accent</strong> brand color.
            </>
          ),
        },
        {
          value: euiTheme.colors.textAccentSecondary,
          token: 'colors.textAccentSecondary',
          description: (
            <>
              Text variant of the <strong>secondary accent</strong> color.
            </>
          ),
        },
        {
          value: euiTheme.colors.textNeutral,
          token: 'colors.textNeutral',
          description: <>Neutral text color for informational content.</>,
        },
        {
          value: euiTheme.colors.textSuccess,
          token: 'colors.textSuccess',
          description: (
            <>
              Text variant of the <strong>success</strong> color for positive
              messages.
            </>
          ),
        },
        {
          value: euiTheme.colors.textWarning,
          token: 'colors.textWarning',
          description: (
            <>
              Text variant of the <strong>warning</strong> color for caution
              messages.
            </>
          ),
        },
        {
          value: euiTheme.colors.textRisk,
          token: 'colors.textRisk',
          description: (
            <>
              Text variant of the <strong>risk</strong> color for elevated
              concern.
            </>
          ),
        },
        {
          value: euiTheme.colors.textDanger,
          token: 'colors.textDanger',
          description: (
            <>
              Text variant of the <strong>danger</strong> color for errors and
              destructive actions.
            </>
          ),
        },
        {
          value: euiTheme.colors.textAssistance,
          token: 'colors.textAssistance',
          description: (
            <>
              Text variant of the <strong>assistance</strong> color for
              supplementary context.
            </>
          ),
        },
      ]}
    />
  );
};
