import { useMemo } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridInMemoryValues,
} from './data_grid_types';

export interface SchemaDetector {
  type: string;
  detector: (value: string) => number;
  icon: string;
  color: string;
  sortTextAsc: string;
  sortTextDesc: string;
}

const schemaDetectors: SchemaDetector[] = [
  {
    type: 'boolean',
    detector(value: string) {
      return value === 'true' || value === 'false' ? 1 : 0;
    },
    icon: 'invert',
    color: 'primary',
    sortTextAsc: 'False-True',
    sortTextDesc: 'True-False',
  },
  {
    type: 'currency',
    detector(value: string) {
      const matchLength = (value.match(
        // currency prefers starting with 1-3 characters for the currency symbol
        // then it matches against numerical data + $
        /(^[^-(]{1,3})?[$-(]*[\d,]+(\.\d*)?[$)]*/
      ) || [''])[0].length;

      // if there is no currency symbol then reduce the score
      const hasCurrency = value.indexOf('$') !== -1;
      const confidenceAdjustment = hasCurrency ? 1 : 0.95;

      return (matchLength / value.length) * confidenceAdjustment || 0;
    },
    icon: 'heart',
    color: 'primary',
    sortTextAsc: 'Low-High',
    sortTextDesc: 'High-Low',
  },
  {
    type: 'datetime',
    detector(value: string) {
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
    color: 'primary',
    sortTextAsc: 'Old-New',
    sortTextDesc: 'New-Old',
  },
  {
    type: 'numeric',
    detector(value: string) {
      const matchLength = (value.match(/[%-(]*[\d,]+(\.\d*)?[%)]*/) || [''])[0]
        .length;
      return matchLength / value.length || 0;
    },
    icon: 'number',
    color: 'primary',
    sortTextAsc: 'Low-High',
    sortTextDesc: 'High-Low',
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
  extraSchemaDetectors: SchemaDetector[] = []
) {
  const scores: SchemaTypeScore[] = [];
  const detectors = [...schemaDetectors, ...extraSchemaDetectors];

  for (let i = 0; i < detectors.length; i++) {
    const { type, detector } = detectors[i];
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
  schemaDetectors: SchemaDetector[] | undefined,
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
  }, [inMemoryValues]);
  return schema;
}

export function getMergedSchema(
  detectedSchema: EuiDataGridSchema,
  columns: EuiDataGridColumn[]
) {
  const mergedSchema = { ...detectedSchema };

  for (let i = 0; i < columns.length; i++) {
    const { id, dataType } = columns[i];
    if (dataType != null) {
      if (detectedSchema.hasOwnProperty(id)) {
        mergedSchema[id] = { ...detectedSchema[id], columnType: dataType };
      } else {
        mergedSchema[id] = { columnType: dataType };
      }
    }
  }

  return mergedSchema;
}

// Given a provided schema, return the details for the schema
// Useful for grabbing the color or icon
export function getDetailsForSchema(providedSchema: string | null) {
  const results = schemaDetectors.filter(matches => {
    return matches.type === providedSchema;
  });

  return results[0];
}
