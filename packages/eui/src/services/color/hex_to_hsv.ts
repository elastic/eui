/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { HEX, HSV } from "./color_types";
import { hex, valid } from "chroma-js";

export function hexToHsv(hexCode: HEX): HSV {
	//Create a new chroma-js color from hexCode provided
	const color = hex(hexCode);

	//If color valid convert from HEX to HSV
	if (valid(color)) {
		const [h, s, v] = color.hsv();

		return { h, s, v };
	}

	// fallback to prevent errors
	return { h: Number.NaN, s: Number.NaN, v: Number.NaN };
}
