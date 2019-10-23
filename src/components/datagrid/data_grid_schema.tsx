import React, { useMemo, ReactNode } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridInMemoryValues,
} from './data_grid_types';

import { EuiI18n } from '../i18n';

import { palettes } from '../../services/color/eui_palettes';
import { IconType } from '../icon';

export interface EuiDataGridSchemaDetector {
  /**
   * The name of this data type, matches #EuiDataGridColumn / schema `schema`
   */
  type: string;
  /**
   * The function given the text value of a cell and returns a score of [0...1] of how well the value matches this data type
   */
  detector: (value: string) => number;
  /**
   * A custom comparator function when performing in-memory sorting on this data type, takes `(a: string, b: string, direction: 'asc' | 'desc) => -1 | 0 | 1`
   */
  comparator?: (a: string, b: string, direction: 'asc' | 'desc') => -1 | 0 | 1;
  /**
   * The icon used to visually represent this data type. Accepts any `EuiIcon IconType`.
   */
  icon: IconType;
  /**
   * The color associated with this data type; it's used to color the icon
   */
  color: string;
  /**
   * Text for how to represent an ascending sort of this data type, e.g. 'A -> Z'
   */
  sortTextAsc: ReactNode;
  /**
   * Text for how to represent a descending sort of this data type, e.g. 'Z -> A'
   */
  sortTextDesc: ReactNode;
}

const numericChars = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  '-',
]);
export const schemaDetectors: EuiDataGridSchemaDetector[] = [
  {
    type: 'boolean',
    detector(value) {
      return value.toLowerCase() === 'true' || value.toLowerCase() === 'false'
        ? 1
        : 0;
    },
    comparator(a, b, direction) {
      const aValue = a.toLowerCase() === 'true';
      const bValue = b.toLowerCase() === 'true';
      if (aValue < bValue) return direction === 'asc' ? 1 : -1;
      if (aValue > bValue) return direction === 'asc' ? -1 : 1;
      return 0;
    },
    icon: 'invert',
    color: palettes.euiPaletteColorBlind.colors[5],
    sortTextAsc: (
      <EuiI18n
        token="euiDataGridSchema.booleanSortTextAsc"
        default="True-False"
      />
    ),
    sortTextDesc: (
      <EuiI18n
        token="euiDataGridSchema.booleanSortTextDesc"
        default="False-True"
      />
    ),
  },
  {
    type: 'currency',
    detector(value) {
      const matchLength = (value.match(
        // currency prefers starting with 1-3 characters for the currency symbol
        // then it matches against numerical data + $
        /(^[^-(.]{1,3})?[$-(]*[\d,]+(\.\d*)?[$)]*/
      ) || [''])[0].length;

      // if there is no currency symbol then reduce the score
      const hasCurrency = value.indexOf('$') !== -1;
      const confidenceAdjustment = hasCurrency ? 1 : 0.95;

      return (matchLength / value.length) * confidenceAdjustment || 0;
    },
    comparator: (a, b, direction) => {
      const aChars = a.split('').filter(char => numericChars.has(char));
      const aValue = parseFloat(aChars.join(''));

      const bChars = b.split('').filter(char => numericChars.has(char));
      const bValue = parseFloat(bChars.join(''));

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    },
    icon: 'currency',
    color: palettes.euiPaletteColorBlind.colors[0],
    sortTextAsc: (
      <EuiI18n
        token="euiDataGridSchema.currencySortTextAsc"
        default="Low-High"
      />
    ),
    sortTextDesc: (
      <EuiI18n
        token="euiDataGridSchema.currencySortTextDesc"
        default="High-Low"
      />
    ),
  },
  {
    type: 'datetime',
    detector(value) {
      // matches the most common forms of ISO-8601
      const isoTimestampMatch = value.match(
        // 2019 - 09    - 17     T 12     : 18    : 32      .853     Z or -0600
        /^\d{2,4}-\d{1,2}-\d{1,2}(T?\d{1,2}:\d{1,2}:\d{1,2}(\.\d{3})?(Z|[+-]\d{4})?)?/
      );

      // matches 9 digits (seconds) or 13 digits (milliseconds) since unix epoch
      const unixTimestampMatch = value.match(/^(\d{9}|\d{13})$/);

      const isoMatchLength = isoTimestampMatch
        ? isoTimestampMatch[0].length
        : 0;

      // reduce the confidence of a unix timestamp match to 75%
      // (a column of all unix timestamps should be numeric instead)
      const unixMatchLength = unixTimestampMatch
        ? unixTimestampMatch[0].length * 0.75
        : 0;

      return Math.max(isoMatchLength, unixMatchLength) / value.length || 0;
    },
    icon: 'calendar',
    color: palettes.euiPaletteColorBlind.colors[7],
    sortTextAsc: (
      <EuiI18n token="euiDataGridSchema.dateSortTextAsc" default="New-Old" />
    ),
    sortTextDesc: (
      <EuiI18n token="euiDataGridSchema.dateSortTextDesc" default="Old-New" />
    ),
  },
  {
    type: 'numeric',
    detector(value) {
      const matchLength = (value.match(/[%-(]*[\d,]+(\.\d*)?[%)]*/) || [''])[0]
        .length;
      return matchLength / value.length || 0;
    },
    comparator: (a, b, direction) => {
      const aChars = a.split('').filter(char => numericChars.has(char));
      const aValue = parseFloat(aChars.join(''));

      const bChars = b.split('').filter(char => numericChars.has(char));
      const bValue = parseFloat(bChars.join(''));

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    },
    icon: 'number',
    color: palettes.euiPaletteColorBlind.colors[0],
    sortTextAsc: (
      <EuiI18n token="euiDataGridSchema.numberSortTextAsc" default="Low-High" />
    ),
    sortTextDesc: (
      <EuiI18n
        token="euiDataGridSchema.numberSortTextDesc"
        default="High-Low"
      />
    ),
  },
  {
    type: 'json',
    detector(value: string) {
      // does this look like it might be a JSON object?
      const maybeArray = value[0] === '[' && value[value.length - 1] === ']';
      const maybeObject = value[0] === '{' && value[value.length - 1] === '}';
      if (!maybeArray && !maybeObject) return 0;

      try {
        JSON.parse(value);
        return 1;
      } catch (e) {
        return 0;
      }
    },
    comparator: (a, b, direction) => {
      if (a.length > b.length) return direction === 'asc' ? 1 : -1;
      if (a.length < b.length) return direction === 'asc' ? 1 : -1;
      return 0;
    },
    icon: 'visVega',
    color: palettes.euiPaletteColorBlind.colors[3],
    sortTextAsc: (
      <EuiI18n
        token="euiDataGridSchema.jsonSortTextAsc"
        default="Small-Large"
      />
    ),
    sortTextDesc: (
      <EuiI18n
        token="euiDataGridSchema.jsonSortTextDesc"
        default="Large-Small"
      />
    ),
  },
];

export interface EuiDataGridSchema {
  [columnId: string]: { columnType: string | null };
}

interface SchemaTypeScore {
  type: string;
  score: number;
}

function scoreValueBySchemaType(
  value: string,
  schemaDetectors: EuiDataGridSchemaDetector[] = []
) {
  const scores: SchemaTypeScore[] = [];

  for (let i = 0; i < schemaDetectors.length; i++) {
    const { type, detector } = schemaDetectors[i];
    const score = detector(value);
    scores.push({ type, score });
  }

  return scores;
}

// completely arbitrary minimum match I came up with
// represents lowest score a type detector can have to be considered valid
const MINIMUM_SCORE_MATCH = 0.5;

export function useDetectSchema(
  inMemoryValues: EuiDataGridInMemoryValues,
  schemaDetectors: EuiDataGridSchemaDetector[] | undefined,
  autoDetectSchema: boolean
) {
  const schema = useMemo(() => {
    const schema: EuiDataGridSchema = {};
    if (autoDetectSchema === false) {
      return schema;
    }

    const columnSchemas: {
      [columnId: string]: { [type: string]: number[] };
    } = {};

    // for each row, score each value by each detector and put the results on `columnSchemas`
    const rowIndices = Object.keys(inMemoryValues);

    for (let i = 0; i < rowIndices.length; i++) {
      const rowIndex = rowIndices[i];
      const rowData = inMemoryValues[rowIndex];
      const columnIds = Object.keys(rowData);

      for (let j = 0; j < columnIds.length; j++) {
        const columnId = columnIds[j];

        const schemaColumn = (columnSchemas[columnId] =
          columnSchemas[columnId] || {});

        const columnValue = rowData[columnId].trim();
        const valueScores = scoreValueBySchemaType(
          columnValue,
          schemaDetectors
        );

        for (let k = 0; k < valueScores.length; k++) {
          const valueScore = valueScores[k];
          if (schemaColumn.hasOwnProperty(valueScore.type)) {
            const existingScore = schemaColumn[valueScore.type];
            existingScore.push(valueScore.score);
          } else {
            // first entry for this column
            schemaColumn[valueScore.type] = [valueScore.score];
          }
        }
      }
    }

    // for each column, reduce each detector type's score to a single value and find the best fit
    return Object.keys(columnSchemas).reduce<EuiDataGridSchema | any>(
      (schema, columnId) => {
        const columnScores = columnSchemas[columnId];
        const typeIds = Object.keys(columnScores);

        const typeSummaries: {
          [type: string]: {
            mean: number;
            sd: number;
          };
        } = {};

        let bestType = null;
        let bestScore = 0;

        for (let i = 0; i < typeIds.length; i++) {
          const typeId = typeIds[i];

          const typeScores = columnScores[typeId];

          // find the mean
          let totalScore = 0;
          for (let j = 0; j < typeScores.length; j++) {
            const score = typeScores[j];
            totalScore += score;
          }
          const mean = totalScore / typeScores.length;

          // compute standard deviation
          let sdSum = 0;
          for (let j = 0; j < typeScores.length; j++) {
            const score = typeScores[j];
            sdSum += (score - mean) * (score - mean);
          }
          const sd = Math.sqrt(sdSum / typeScores.length);

          const summary = { mean, sd };

          // the mean-standard_deviation calculation is fairly arbitrary but fits the patterns I've thrown at it
          // it is meant to represent the scores' average and distribution
          const score = summary.mean - summary.sd;
          if (score > MINIMUM_SCORE_MATCH) {
            if (bestType == null || score > bestScore) {
              bestType = typeId;
              bestScore = score;
            }
          }

          typeSummaries[typeId] = summary;
        }
        schema[columnId] = { columnType: bestType };

        return schema;
      },
      {}
    );
  }, [inMemoryValues, schemaDetectors]);
  return schema;
}

export function getMergedSchema(
  detectedSchema: EuiDataGridSchema,
  columns: EuiDataGridColumn[]
) {
  return useMemo(() => {
    const mergedSchema = { ...detectedSchema };

    for (let i = 0; i < columns.length; i++) {
      const { id, schema } = columns[i];
      if (schema != null) {
        if (detectedSchema.hasOwnProperty(id)) {
          mergedSchema[id] = { ...detectedSchema[id], columnType: schema };
        } else {
          mergedSchema[id] = { columnType: schema };
        }
      }
    }

    return mergedSchema;
  }, [detectedSchema, columns]);
}

// Given a provided schema, return the details for the schema
// Useful for grabbing the color or icon
export function getDetailsForSchema(
  detectors: EuiDataGridSchemaDetector[],
  providedSchema: string | null
) {
  const results = detectors.filter(matches => {
    return matches.type === providedSchema;
  });

  return results[0];
}
