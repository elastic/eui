/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Utility for performing math callbacks on a string with CSS units
 * and returning a string with its unit preserved.
 *
 * Example usage:
 * mathWithUnits('4px', (x) => x / 2) = '2px';
 * mathWithUnits(euiTheme.size.xs, (x) => x + 2) = '6px';
 * mathWithUnits([euiTheme.size.l, euiTheme.size.s], (x, y) => x - y) = '16px';
 *
 * When any input contains a CSS var() reference, the callback is probed with
 * test values to determine its linear coefficients, and an equivalent calc()
 * expression is emitted instead:
 * mathWithUnits('var(--size)', (x) => x / 2) = 'calc(var(--size) / 2)';
 */
type ValueTypes = string | number | undefined; // Unfortunately, this is the CSSProperties[] type used for several euiTheme vars

// --- Temporary perf instrumentation ---
let _callCount = 0;
let _totalTime = 0;
// --- End instrumentation ---

export const mathWithUnits = (
  values: ValueTypes | ValueTypes[], // Can accept a single input or array of inputs
  callback: (...args: number[]) => number, // Can be multiplication, division, addition, etc.
  unit: string = '' // Optional: allow specifying an override unit to return
) => {
  const _t0 = performance.now();
  _callCount++;

  if (!Array.isArray(values)) values = [values];

  // When any value is a CSS var() reference, emit a calc() expression
  // instead of evaluating the callback in JS
  if (values.some((v) => typeof v === 'string' && v.includes('var('))) {
    const _elapsed = performance.now() - _t0;
    _totalTime += _elapsed;
    console.log(`mathWithUnits #${_callCount} (var path): ${_elapsed.toFixed(3)}ms | total: ${_totalTime.toFixed(3)}ms`, values);
    return _emitCalcForVars(values, callback, unit);
  }

  const foundNumericValues: number[] = [];
  let foundUnit = '';

  values.forEach((value) => {
    if (typeof value === 'string') {
      const regex = /(?<value>-?[\d.]+)(?<unit>%|[a-zA-Z]*)/;
      const matches = regex.exec(value);

      const numericValue = Number(matches?.groups?.value);

      if (!isNaN(numericValue)) {
        foundNumericValues.push(numericValue);
      } else {
        throw new Error('No valid numeric value found');
      }

      if (!unit && matches?.groups?.unit) {
        if (!foundUnit) {
          foundUnit = matches.groups.unit;
        } else if (foundUnit !== matches.groups.unit) {
          throw new Error(
            'Multiple units found. Use `calc()` to mix and math multiple unit types (e.g. `%` & `px`) instead'
          );
        }
      }
    } else if (typeof value === 'number') {
      foundNumericValues.push(value);
    } else {
      throw new Error('Invalid value type - pass a string or number');
    }
  });

  const _result = `${callback(...foundNumericValues)}${unit || foundUnit}`;
  const _elapsed = performance.now() - _t0;
  _totalTime += _elapsed;
  console.log(`mathWithUnits #${_callCount}: ${_elapsed.toFixed(3)}ms | total: ${_totalTime.toFixed(3)}ms`, values, '->', _result);
  return _result;
};

/**
 * When CSS var() references are present, probe the callback with test values
 * to determine its linear coefficients, then emit an equivalent calc() expression.
 *
 * Only the var() positions are probed (at 0 vs 1). Literal values (numbers and
 * parseable CSS strings) are fixed at their actual numeric values during probing,
 * so callbacks like `(x, y) => x * y` work correctly when one arg is a literal.
 *
 * Assumes the callback is linear *in the var() arguments*.
 */
const _emitCalcForVars = (
  values: ValueTypes[],
  callback: (...args: number[]) => number,
  overrideUnit: string
): string => {
  const n = values.length;

  // Classify each value: is it a var() ref or a literal we can parse?
  const isVar: boolean[] = [];
  const baselineArgs: number[] = []; // Actual numeric values for literals, 0 for var refs
  let cssUnit = overrideUnit;

  for (let i = 0; i < n; i++) {
    const v = values[i];
    if (typeof v === 'string' && v.includes('var(')) {
      isVar.push(true);
      baselineArgs.push(0);
    } else if (typeof v === 'number') {
      isVar.push(false);
      baselineArgs.push(v);
    } else if (typeof v === 'string') {
      isVar.push(false);
      const match = /(-?[\d.]+)(%|[a-zA-Z]*)/.exec(v);
      baselineArgs.push(Number(match?.[1]) || 0);
      if (!cssUnit && match?.[2]) {
        cssUnit = match[2];
      }
    } else {
      isVar.push(false);
      baselineArgs.push(0);
    }
  }

  if (!cssUnit) cssUnit = 'px';

  // Probe: fix literal positions at their actual values,
  // probe each var() position at 0 (baseline) then 1 to determine its coefficient
  const constant = _preciseRound(callback(...baselineArgs));

  const varIndices: number[] = [];
  const coefficients: number[] = [];

  for (let i = 0; i < n; i++) {
    if (!isVar[i]) continue;
    varIndices.push(i);
    const probe = [...baselineArgs];
    probe[i] = 1;
    coefficients.push(_preciseRound(callback(...probe) - constant));
  }

  // Build calc() expression — only var() positions appear as variable terms
  const varTerms: string[] = [];

  for (let j = 0; j < varIndices.length; j++) {
    const coeff = coefficients[j];
    if (coeff === 0) continue;
    const valueStr = String(values[varIndices[j]]);

    if (varTerms.length === 0) {
      varTerms.push(_formatTerm(coeff, valueStr));
    } else if (coeff > 0) {
      varTerms.push(`+ ${_formatTerm(coeff, valueStr)}`);
    } else {
      varTerms.push(`- ${_formatTerm(Math.abs(coeff), valueStr)}`);
    }
  }

  // If no var() terms contribute (callback ignores its input), return the constant directly
  if (varTerms.length === 0) {
    return constant === 0 ? `0${cssUnit}` : `${constant}${cssUnit}`;
  }

  // Append constant if non-zero
  if (constant !== 0) {
    const cStr = `${Math.abs(constant)}${cssUnit}`;
    varTerms.push(constant > 0 ? `+ ${cStr}` : `- ${cStr}`);
  }

  return `calc(${varTerms.join(' ')})`;
};

/** Format a coefficient × value term for calc(). Coefficient may be negative for first terms. */
const _formatTerm = (coeff: number, value: string): string => {
  const absCoeff = Math.abs(coeff);

  if (absCoeff === 1) {
    return coeff < 0 ? `${value} * -1` : value;
  }

  // Use division for readability when coefficient is a simple reciprocal
  const reciprocal = 1 / absCoeff;
  if (Number.isInteger(reciprocal) && reciprocal > 1) {
    return `${value} / ${coeff < 0 ? -reciprocal : reciprocal}`;
  }

  return `${coeff} * ${value}`;
};

/** Round to avoid floating-point artifacts from callback probing */
const _preciseRound = (n: number): number =>
  Math.round(n * 1e10) / 1e10;
