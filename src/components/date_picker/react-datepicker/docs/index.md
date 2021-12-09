<!--
/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2018 HackerOne Inc and individual contributors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
-->
# `index` (component)

| name                         | type                           | default value      | description |
| ---------------------------- | ------------------------------ | ------------------ | ----------- |
| `adjustDateOnChange`         | `bool`                         |                    |             |
| `allowSameDay`               | `bool`                         | `false`            |             |
| `autoComplete`               | `string`                       |                    |             |
| `autoFocus`                  | `bool`                         |                    |             |
| `calendarClassName`          | `string`                       |                    |             |
| `calendarContainer`          | `func`                         |                    |             |
| `children`                   | `node`                         |                    |             |
| `className`                  | `string`                       |                    |             |
| `clearButtonTitle`           | `string`                       |                    |             |
| `customInput`                | `element`                      |                    |             |
| `customInputRef`             | `string`                       |                    |             |
| `dateFormat`                 | `union(string\|array)`         | `"L"`              |             |
| `dateFormatCalendar`         | `string`                       | `"MMMM YYYY"`      |             |
| `dayClassName`               | `func`                         |                    |             |
| `disabled`                   | `bool`                         | `false`            |             |
| `disabledKeyboardNavigation` | `bool`                         | `false`            |             |
| `dropdownMode`               | `enum("scroll"\|"select")`     | `"scroll"`         |             |
| `endDate`                    | `object`                       |                    |             |
| `excludeDates`               | `array`                        |                    |             |
| `excludeTimes`               | `array`                        |                    |             |
| `filterDate`                 | `func`                         |                    |             |
| `fixedHeight`                | `bool`                         |                    |             |
| `forceShowMonthNavigation`   | `bool`                         |                    |             |
| `formatWeekDay`              | `func`                         |                    |             |
| `formatWeekNumber`           | `func`                         |                    |             |
| `highlightDates`             | `array`                        |                    |             |
| `id`                         | `string`                       |                    |             |
| `includeDates`               | `array`                        |                    |             |
| `includeTimes`               | `array`                        |                    |             |
| `injectTimes`                | `array`                        |                    |             |
| `inline`                     | `bool`                         |                    |             |
| `isClearable`                | `bool`                         |                    |             |
| `locale`                     | `string`                       |                    |             |
| `maxDate`                    | `object`                       |                    |             |
| `maxTime`                    | `object`                       |                    |             |
| `minDate`                    | `object`                       |                    |             |
| `minTime`                    | `object`                       |                    |             |
| `monthsShown`                | `number`                       | `1`                |             |
| `name`                       | `string`                       |                    |             |
| `nextMonthButtonLabel`       | `string`                       | `"Next month"`     |             |
| `onBlur`                     | `func`                         | `function() {}`    |             |
| `onChange`                   | `func`                         | `function() {}`    |             |
| `onChangeRaw`                | `func`                         |                    |             |
| `onClickOutside`             | `func`                         | `function() {}`    |             |
| `onFocus`                    | `func`                         | `function() {}`    |             |
| `onInputClick`               | `func`                         | `function() {}`    |             |
| `onInputError`               | `func`                         | `function() {}`    |             |
| `onKeyDown`                  | `func`                         | `function() {}`    |             |
| `onMonthChange`              | `func`                         | `function() {}`    |             |
| `onSelect`                   | `func`                         | `function() {}`    |             |
| `onWeekSelect`               | `func`                         |                    |             |
| `onYearChange`               | `func`                         | `function() {}`    |             |
| `open`                       | `bool`                         |                    |             |
| `openToDate`                 | `object`                       |                    |             |
| `peekNextMonth`              | `bool`                         |                    |             |
| `placeholderText`            | `string`                       |                    |             |
| `popperClassName`            | `string`                       |                    |             |
| `popperContainer`            | `func`                         |                    |             |
| `popperModifiers`            | `object`                       |                    |             |
| `popperPlacement`            | `enumpopperPlacementPositions` |                    |             |
| `popperProps`                | `object`                       |                    |             |
| `preventOpenOnFocus`         | `bool`                         | `false`            |             |
| `previousMonthButtonLabel`   | `string`                       | `"Previous Month"` |             |
| `readOnly`                   | `bool`                         | `false`            |             |
| `renderCustomHeader`         | `func`                         |                    |             |
| `renderDayContents`          | `func`                         | `function(date) {  |

return date;
}`|| |`required`|`bool`||| |`scrollableMonthYearDropdown`|`bool`||| |`scrollableYearDropdown`|`bool`||| |`selected`|`object`||| |`selectsEnd`|`bool`||| |`selectsStart`|`bool`||| |`shouldCloseOnSelect`|`bool`|`true`|| |`showDisabledMonthNavigation`|`bool`||| |`showMonthDropdown`|`bool`||| |`showMonthYearDropdown`|`bool`||| |`showTimeSelect`|`bool`|`false`|| |`showTimeSelectOnly`|`bool`||| |`showWeekNumbers`|`bool`||| |`showYearDropdown`|`bool`||| |`startDate`|`object`||| |`startOpen`|`bool`||| |`tabIndex`|`number`||| |`timeCaption`|`string`|`"Time"`|| |`timeFormat`|`string`||| |`timeIntervals`|`number`|`30`|| |`title`|`string`||| |`todayButton`|`node`||| |`useShortMonthInDropdown`|`bool`||| |`useWeekdaysShort`|`bool`||| |`utcOffset`|`union(number\|string)`||| |`value`|`string`||| |`weekLabel`|`string`||| |`withPortal`|`bool`|`false`|| |`yearDropdownItemNumber`|`number`|||
