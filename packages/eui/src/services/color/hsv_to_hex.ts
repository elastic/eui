/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { HEX, HSV } from "./color_types";
import { hsv, valid } from "chroma-js";

export function hsvToHex({ h, s, v }: HSV): HEX {
	//Create a new chroma-js color from HSV provided
	const color = hsv(h, s, v);

	//If color valid convert HSV to HEX
	if (valid(color)) {
		return color.hex();
	}

	// fallback to prevent errors
	return "";
}
