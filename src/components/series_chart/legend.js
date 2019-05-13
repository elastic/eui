import React from 'react';
import LegendItem from './legend_item';

const Title = ({ children }) => (
  <div className="euiLegendTitle">{children}</div>
);
const Container = ({ children }) => (
  <div className="euiLegendContainer">{children}</div>
);
const LegendContent = ({ children }) => (
  <div className="euiLegendContent">{children}</div>
);
const TruncatedLabel = ({ children }) => (
  <div className="euiLegendTruncatedLabel">{children}</div>
);
const SeriesValue = ({ children }) => (
  <div className="euiLegendSeriesValue">{children}</div>
);
const MoreSeriesContainer = ({ children }) => (
  <div className="euiLegendMoreSeriesContainer">{children}</div>
);

function MoreSeries({ hiddenSeries }) {
  if (hiddenSeries <= 0) {
    return null;
  }

  return <MoreSeriesContainer>(+{hiddenSeries})</MoreSeriesContainer>;
}

export default function Legends({
  chartTitle,
  truncateLegends,
  series,
  hiddenSeries,
  clickLegend,
  seriesVisibility,
}) {
  return (
    <div>
      <Title>{chartTitle}</Title>
      <Container>
        {series
          .filter(serie => !serie.isEmpty)
          .map((serie, i) => {
            const text = (
              <LegendContent>
                {truncateLegends ? (
                  <TruncatedLabel title={serie.title}>
                    {serie.title}
                  </TruncatedLabel>
                ) : (
                  serie.title
                )}
                {serie.legendValue && (
                  <SeriesValue>{serie.legendValue}</SeriesValue>
                )}
              </LegendContent>
            );
            return (
              <LegendItem
                key={i}
                onClick={() => clickLegend(i)}
                disabled={seriesVisibility[i]}
                text={text}
                color={serie.color}
              />
            );
          })}
        <MoreSeries hiddenSeries={hiddenSeries} />
      </Container>
    </div>
  );
}
