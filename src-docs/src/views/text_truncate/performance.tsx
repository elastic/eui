import React, { useState, useEffect, useRef, useMemo } from 'react';
import { css } from '@emotion/react';
import { throttle } from 'lodash';
import { faker } from '@faker-js/faker';
import { FixedSizeList } from 'react-window';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiFormRow,
  EuiFieldNumber,
  EuiSwitch,
  EuiSpacer,
  EuiTextTruncate,
} from '../../../../src';

export default () => {
  // Testing toggles
  const [canvasRendering, setCanvasRendering] = useState(true);
  const measurementRenderAPI = canvasRendering ? 'canvas' : 'dom';
  const [virtualization, setVirtualization] = useState(false);
  const [throttleMs, setThrottleMs] = useState(0);
  const [lineCount, setLineCount] = useState(100);

  // Number of lines of text to render
  const text = useMemo(() => {
    return Array.from({ length: lineCount }, () => faker.lorem.lines(5));
  }, [lineCount]);

  // Width resize observer
  const widthRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(200);

  useEffect(() => {
    if (!widthRef.current) return;

    const onObserve = throttle((entries) => {
      // Skipping a forEach as we're only observing one element
      setWidth(entries[0].contentRect.width);
    }, throttleMs);

    const resizeObserver = new ResizeObserver(onObserve);

    document.fonts.ready.then(() => {
      resizeObserver.observe(widthRef.current!);
    });

    () => resizeObserver.disconnect();
  }, [throttleMs]);

  return (
    <EuiText>
      <EuiFlexGroup alignItems="center">
        <EuiSwitch
          label="Toggle canvas rendering"
          checked={canvasRendering}
          onChange={() => setCanvasRendering(!canvasRendering)}
        />
        <EuiSwitch
          label="Toggle virtualization"
          checked={virtualization}
          onChange={() => setVirtualization(!virtualization)}
        />
        <EuiFormRow label="Resize throttle" display="columnCompressed">
          <EuiFieldNumber
            value={throttleMs}
            onChange={(e) => setThrottleMs(Number(e.target.value))}
            style={{ width: 100 }}
            compressed
          />
        </EuiFormRow>
        <EuiFlexItem css={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
          <EuiFormRow label="Lines" display="columnCompressed">
            <EuiFieldNumber
              value={lineCount}
              onChange={(e) => setLineCount(Number(e.target.value))}
              style={{ width: 100 }}
              compressed
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />

      <EuiPanel
        panelRef={widthRef}
        css={css`
          overflow: auto;
          resize: horizontal; /* Not all browsers support resize logical properties yet */
          resize: inline;
          max-inline-size: 100%;
          inline-size: 600px;
          block-size: 300px;
        `}
      >
        {virtualization ? (
          <FixedSizeList
            width={width}
            height={268}
            itemCount={100}
            itemSize={24}
          >
            {({ index, style }) => (
              <EuiTextTruncate
                style={style}
                key={index}
                text={text[index]}
                truncation="middle"
                width={width}
                measurementRenderAPI={measurementRenderAPI}
              />
            )}
          </FixedSizeList>
        ) : (
          text.map((text, i) => (
            <EuiTextTruncate
              key={i}
              text={text}
              truncation="middle"
              width={width}
              measurementRenderAPI={measurementRenderAPI}
            />
          ))
        )}
      </EuiPanel>
      <EuiSpacer />
      <p>
        Drag the panel resize handle to test performance. Use the controls above
        to compare the performance of different approaches.
      </p>
    </EuiText>
  );
};
