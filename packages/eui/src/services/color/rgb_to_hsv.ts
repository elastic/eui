/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { HSV, RGB } from "./color_types";
import { rgb, valid } from "chroma-js";

export function rgbToHsv({ r, g, b }: RGB): HSV {
	//Create a new chroma-js color from RGB provided
	const color = rgb(r, g, b);

	//If color valid convert RGB to HSV
	if (valid(color)) {
		let [h, s, v] = color.hsv();

		h = Number.isNaN(h) ? 0 : h;

		return { h, s, v };
	}

	// fallback to prevent errors
	return { h: Number.NaN, s: Number.NaN, v: Number.NaN };
}
