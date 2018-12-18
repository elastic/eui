## Concepts

- Axis:
X Axis: the orizontal one, the indepedant variable
Y Axis: the vertical one, the dependant variable

Only one X axis. Multiple Y axis.


- Domain:
Related to a dataset, is the extent of one variable, usually one that needs to be used draw the position of the specific datum along one axis (vertical or horizontal).
On a chart, we always needs to have at least two domain, representing the 2 dimensions of the data we are drawing. Multiples domain can coexist (multi axis charts) but they are not suitable to be used to correctly compare data into multiple dimensions (the correctness of the visualization depends on the data preparation).

- Hierarchical/tree domain (only on x axis):
A domain that consist of multiple levels.

- Series Group:
A set of one or more datasets that, theoretically, shares the same domains.
If multiple data series coexist on the same group, their domains are merged together.



- Data series

- Data Preparation:
To correctly draw a 2 dimension dataset, your data needs to be prepared beforehand.
The praparation usually involves:
  - uniformify the data structure: each data point 


##Chart Dataset

A chart can be feed with data in the following ways:

- one chart type with `data` props configured
- multiple chart types with `data` props configured are combined together:
  - x values are merged together. If chart have multiple different `xScaleType`s, the main x scale type is coerced to `ScaleType.Linear` if all the scales are continuous or to `ScaleType.Ordinal` if one scale type is ordinal. Also temporal scale is, in specific case coerched to linear, so be carefull to configure correctly the scales.
  - if there is a specified x domain on the spec, this is used as x domain for that series, and it's merged together with the existing x domains.
  - specifications with `splitAccessors` are splitted into diffenent series. Each specification is treathed in a separated manner: if you have one chart with 3 series merged to one chart with 1 series, this results in the a chart like that has each x value splitted in two (the number of specification used, two charts) than on split is used to accomodate 3 series and the other to accomodate the remaining series. If you want to threat each series on the same way, split your chart before and create 4 different BarSeries specs, so that these are rendered evenly on the x axis.
  - bar, area, line series with a `stackAccessor` are stacked together each stacked above their respective group (areas with areas, bars with bars, lines with lines. You cannot mix stacking bars above lines above areas). 
  - bar series without `stackAccessors` are clustered together for the same x value
  - area and line series, without `stackAccessors` are just drawn each one on their own layer (not stacked nor clustered).
  - the y value is influenced by the following aspects:
    - if there is a specified y domain on the spec, this is used as y domain for that series
    - if no or only one y axis is specified, each y value is threathed as part of the same domain.
    - if there is more than one y axis (visible or not), the y domains are merged in respect of the same `groupId`. For e.g. two bar charts, and two y axis, each for a spec, one per bar value. The rendered bar height are independent each other, because  of the two axis.
    - if the data are stacked or not. Stacked produce a rendering where the lower bottom of the chart is the previous series y value.

On the current `Visualize Editor`, you can stack or cluster in the following cases:
- when adding multiple Y values: each Y value can be stacked (every type) or clustered (only bars)
- when splitting a series, each series can be stacked (every type) or clustered (only bars)

##Multiple charts/Split charts/Small Multiples (phase 2)

Small multiples are created using the `<SmallMultiples>` component, that takes multiple `<SplittedSeries>` component with the usual element inside. `<SplittedSeries>` can contains only `BarSeries` `AreaSeries` and `LineSeries` Axis and other configuration needs to be configured outside the `SplittedSeries` element.

In case of small multiples, each `SplittedSeries` compute its own x and y domains. Than the x domains are merged and expanded. The same happens with the main Y domains, they are merged together.


### Colors

Each data series can have its own color. 
The color is assigned through the `colorAccessors` prop that specify which data attributes are used to define the color,
for example:
- a dataset without any split accessor or fields that can be used to identify a color will have a single color.
- a dataset that has 1 variable to split the dataset into 3 different series, will have 3 different colors if that variable is specified throught the `colorAccessors`.
- a dataset with 2 split variables, each with 3 different values (a dataset with 3 * 2 series) will have 6 different colors if the two variables are defined in `colorAccessors`
- a dataset with 2 split variables, each with 3 different values, but only one specified in the `colorAccessors` will have only 3 colors.
- if no `colorAccessors` is specified, it will be used `splitAccessors` to identifiy how to coloring the series

## TODO

[x] build the continuous band scales
[x] add original datum to the generated geometries to support tooltip
[x] color for data series
[x] color from props for data series
[ ] rebuild axis spec calculator