import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { GridOnItemsRenderedProps } from 'react-window';
import * as uuid from 'uuid';
import {
  EuiButtonEmpty,
  EuiDataGrid,
  EuiDataGridCellValueElementProps,
  EuiDataGridRefProps,
  EuiDataGridRowHeightsOptions,
  EuiDataGridStyle,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiSwitch,
} from '../../../../../src';

interface Item {
  timestamp: number;
  message: string;
}

interface LoadingChunkBefore {
  id: string;
  status: 'loading-before';
  endTimestamp: number;
  count: number;
  rowIndex: number;
}

interface LoadingChunkAfter {
  id: string;
  status: 'loading-after';
  startTimestamp: number;
  count: number;
  rowIndex: number;
}

interface LoadedChunk {
  id: string;
  status: 'loaded';
  startTimestamp: number;
  endTimestamp: number;
  items: Item[];
  rowIndex: number;
}

type Chunk = LoadingChunkBefore | LoadingChunkAfter | LoadedChunk;

type Chunks = [
  LoadedChunk | LoadingChunkBefore,
  LoadedChunk | LoadingChunkAfter
];

const chunkSize = 50;
const loadingDelay = 3000;
const virtualRowCount = 10000;

export default function DataGridScrollAnchoring() {
  const { chunks, loadChunkBefore, loadChunkAfter, resetChunks } = useChunks();

  const { startTimestamp, endTimestamp } = useMemo(
    () => getTimestamps(chunks),
    [chunks]
  );

  const { startRowIndex, endRowIndex } = useMemo(() => getRowIndices(chunks), [
    chunks,
  ]);

  const loadChunkBeforeEarliestTimestamp = useMemo(() => {
    if (startTimestamp == null) {
      return;
    }

    return () => loadChunkBefore(startTimestamp);
  }, [loadChunkBefore, startTimestamp]);

  const loadChunkAfterLatestTimestamp = useMemo(() => {
    if (endTimestamp == null) {
      return;
    }

    return () => loadChunkAfter(endTimestamp);
  }, [loadChunkAfter, endTimestamp]);

  return (
    <CellDataContext.Provider value={chunks}>
      <Grid
        endRowIndex={endRowIndex ?? virtualRowCount}
        loadChunkBeforeEarliestTimestamp={loadChunkBeforeEarliestTimestamp}
        loadChunkAfterLatestTimestamp={loadChunkAfterLatestTimestamp}
        resetChunks={resetChunks}
        startRowIndex={startRowIndex ?? 0}
        virtualRowCount={virtualRowCount}
      />
    </CellDataContext.Provider>
  );
}

const Grid = memo(function ScrollingExampleGrid({
  endRowIndex,
  loadChunkBeforeEarliestTimestamp,
  loadChunkAfterLatestTimestamp,
  resetChunks,
  startRowIndex,
  virtualRowCount,
}: {
  endRowIndex: number;
  loadChunkBeforeEarliestTimestamp?: () => void;
  loadChunkAfterLatestTimestamp?: () => void;
  resetChunks?: () => void;
  startRowIndex: number;
  virtualRowCount: number;
}) {
  const [euiGridKey, setEuiGridKey] = useState(uuid.v4());
  const remountGrid = useCallback(() => {
    setEuiGridKey(uuid.v4());
  }, []);

  const imperativeGridRef = useRef<EuiDataGridRefProps>(null);

  /**
   * scroll anchoring
   */

  const [isScrollAnchoring, setScrollAnchoring] = useState(true);

  const rowHeightsOptions = useMemo<EuiDataGridRowHeightsOptions>(
    () => ({
      defaultHeight: 'auto',
      scrollAnchorRow: isScrollAnchoring ? 'start' : undefined,
    }),
    [isScrollAnchoring]
  );

  /**
   * the usual grid setup
   */

  const gridStyle = useMemo(
    (): EuiDataGridStyle => ({
      rowHover: 'none',
    }),
    []
  );

  const columns = useMemo(
    () => [
      { id: 'index', initialWidth: 100 },
      { id: 'timestamp', initialWidth: 200 },
      { id: 'message' },
    ],
    []
  );

  const columnVisibility = useMemo(
    () => ({
      visibleColumns: ['index', 'timestamp', 'message'],
      setVisibleColumns: () => undefined,
    }),
    []
  );

  const extraToolbarItems = useMemo<
    EuiDataGridToolBarAdditionalControlsOptions
  >(
    () => ({
      left: {
        append: (
          <>
            <EuiButtonEmpty onClick={remountGrid}>remount grid</EuiButtonEmpty>
            <EuiButtonEmpty onClick={resetChunks}>reset data</EuiButtonEmpty>
            <EuiButtonEmpty
              disabled={!loadChunkBeforeEarliestTimestamp}
              onClick={loadChunkBeforeEarliestTimestamp}
            >
              prepend
            </EuiButtonEmpty>
            <EuiButtonEmpty
              disabled={!loadChunkAfterLatestTimestamp}
              onClick={loadChunkAfterLatestTimestamp}
            >
              append
            </EuiButtonEmpty>
          </>
        ),
      },
      right: (
        <>
          <EuiButtonEmpty
            onClick={() =>
              imperativeGridRef.current?.scrollToItem?.({
                rowIndex: Math.floor(virtualRowCount / 2),
                align: 'start',
              })
            }
          >
            scroll to middle
          </EuiButtonEmpty>
          <EuiSwitch
            checked={isScrollAnchoring}
            onChange={(evt) => setScrollAnchoring(evt.target.checked)}
            label="Use scroll anchor"
          />
        </>
      ),
    }),
    [
      isScrollAnchoring,
      loadChunkAfterLatestTimestamp,
      loadChunkBeforeEarliestTimestamp,
      remountGrid,
      resetChunks,
      virtualRowCount,
    ]
  );

  const onItemsRendered = useCallback(
    ({
      visibleRowStartIndex,
      visibleRowStopIndex,
    }: GridOnItemsRenderedProps) => {
      if (visibleRowStartIndex === 0 && visibleRowStartIndex < startRowIndex) {
        // scroll to initial position
        imperativeGridRef.current?.scrollToItem?.({
          rowIndex: Math.floor((startRowIndex + endRowIndex) / 2),
          align: 'start',
        });
      } else if (visibleRowStartIndex === startRowIndex) {
        // trigger prepending of a chunk
        loadChunkBeforeEarliestTimestamp?.();
      } else if (visibleRowStopIndex === endRowIndex) {
        // trigger appending of a chunk
        loadChunkAfterLatestTimestamp?.();
      } else if (visibleRowStartIndex < startRowIndex) {
        // block scrolling outside of loaded area
        imperativeGridRef.current?.scrollToItem?.({
          rowIndex: startRowIndex,
          align: 'start',
        });
      } else if (visibleRowStopIndex > endRowIndex) {
        // block scrolling outside of loaded area
        imperativeGridRef.current?.scrollToItem?.({
          rowIndex: endRowIndex,
          align: 'end',
        });
      }
    },
    [
      endRowIndex,
      loadChunkAfterLatestTimestamp,
      loadChunkBeforeEarliestTimestamp,
      startRowIndex,
    ]
  );

  return (
    <EuiDataGrid
      key={euiGridKey}
      height={1000}
      aria-label="a long list of log entries"
      ref={imperativeGridRef}
      columns={columns}
      columnVisibility={columnVisibility}
      gridStyle={gridStyle}
      rowCount={virtualRowCount}
      rowHeightsOptions={rowHeightsOptions}
      renderCellValue={renderCell}
      toolbarVisibility={{
        additionalControls: extraToolbarItems,
      }}
      virtualizationOptions={{
        onItemsRendered,
      }}
    />
  );
});

function renderCell({ rowIndex, columnId }: EuiDataGridCellValueElementProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const chunks = useContext(CellDataContext);

  if (columnId === 'index') {
    return <IndexCell rowIndex={rowIndex} />;
  } else {
    const { chunk: rowChunk, indexInChunk } = findRowInChunks(
      rowIndex,
      chunks
    ) ?? { chunk: undefined, indexInChunk: -1 };

    if (rowChunk == null) {
      return null;
    }

    if (columnId === 'timestamp') {
      return <TimestampCell rowChunk={rowChunk} indexInChunk={indexInChunk} />;
    } else {
      return <MessageCell rowChunk={rowChunk} indexInChunk={indexInChunk} />;
    }
  }
}

const IndexCell = memo<{ rowIndex: number }>(
  function ScrollingExampleIndexCell({ rowIndex }) {
    return <>{`${rowIndex}`}</>;
  }
);

const TimestampCell = memo<{ rowChunk: Chunk; indexInChunk: number }>(
  function ScrollingExampleTimestampCell({ rowChunk, indexInChunk }) {
    if (
      rowChunk.status === 'loading-before' ||
      rowChunk.status === 'loading-after'
    ) {
      return <>?</>;
    } else {
      return <pre>{`${rowChunk.items[indexInChunk].timestamp}`}</pre>;
    }
  }
);

const MessageCell = memo<{ rowChunk: Chunk; indexInChunk: number }>(
  function ScrollingExampleMessageCell({ rowChunk, indexInChunk }) {
    if (
      rowChunk.status === 'loading-before' ||
      rowChunk.status === 'loading-after'
    ) {
      return <>Loading...</>;
    } else {
      return <pre>{`${rowChunk.items[indexInChunk].message}`}</pre>;
    }
  }
);

const generateRandomItems = (startTimestamp: number, count: number): Item[] => {
  return Array.from(Array(count), (_value, index) =>
    generateRandomItem(startTimestamp + index)
  );
};

const generateRandomItem = (timestamp: number): Item => {
  const numberOfLines = Math.ceil(Math.random() * 10) + 1;
  const message = Array.from(
    Array(numberOfLines),
    (_value, index) => `line ${index}`
  ).join('\n');

  return {
    timestamp,
    message,
  };
};

type ChunkAction =
  | { type: 'reset' }
  | { type: 'load-before'; endTimestamp: number; number: number }
  | { type: 'load-before-success'; items: Item[] }
  | { type: 'load-after'; startTimestamp: number; number: number }
  | { type: 'load-after-success'; items: Item[] };

const initialTimestamp = 1000000;
const initialChunks: Chunks = [
  {
    id: uuid.v4(),
    status: 'loaded',
    startTimestamp: initialTimestamp - chunkSize,
    endTimestamp: initialTimestamp - 1,
    items: generateRandomItems(initialTimestamp - chunkSize, chunkSize),
    rowIndex: Math.floor(virtualRowCount / 2) - chunkSize,
  },
  {
    id: uuid.v4(),
    status: 'loaded',
    startTimestamp: initialTimestamp,
    endTimestamp: initialTimestamp + chunkSize,
    items: generateRandomItems(initialTimestamp, chunkSize),
    rowIndex: Math.floor(virtualRowCount / 2),
  },
];

const reduceChunksState = (state: Chunks, action: ChunkAction): Chunks => {
  switch (action.type) {
    case 'reset': {
      return initialChunks;
    }
    case 'load-before': {
      const [firstChunk] = state;

      if (firstChunk.status !== 'loaded') {
        return state; // limit to one loading chunk for simplicity
      }

      const newFirstChunk: LoadingChunkBefore = {
        id: uuid.v4(),
        status: 'loading-before',
        endTimestamp: action.endTimestamp,
        count: action.number,
        rowIndex: firstChunk.rowIndex - 1,
      };

      return [newFirstChunk, firstChunk];
    }
    case 'load-before-success': {
      const [firstChunk, ...rest] = state;

      if (firstChunk.status !== 'loading-before') {
        return state; // ignore if it wasn't loading
      }

      const updatedFirstChunk: LoadedChunk = {
        id: firstChunk.id,
        status: 'loaded',
        startTimestamp: action.items[0].timestamp,
        endTimestamp: action.items[action.items.length - 1].timestamp,
        items: action.items,
        rowIndex:
          firstChunk.rowIndex +
          (getRowCountOfChunk(firstChunk) - action.items.length),
      };

      return [updatedFirstChunk, ...rest];
    }
    case 'load-after': {
      const [, lastChunk] = state;

      if (lastChunk.status !== 'loaded') {
        return state; // limit to one loading chunk for simplicity
      }

      const newLastChunk: LoadingChunkAfter = {
        id: uuid.v4(),
        status: 'loading-after',
        startTimestamp: action.startTimestamp,
        count: action.number,
        rowIndex: lastChunk.rowIndex + lastChunk.items.length,
      };

      return [lastChunk, newLastChunk];
    }
    case 'load-after-success': {
      const [firstChunk, lastChunk] = state;

      if (lastChunk.status !== 'loading-after') {
        return state; // ignore if it wasn't loading
      }

      const updatedLastChunk: LoadedChunk = {
        id: lastChunk.id,
        status: 'loaded',
        startTimestamp: action.items[0].timestamp,
        endTimestamp: action.items[action.items.length - 1].timestamp,
        items: action.items,
        rowIndex: lastChunk.rowIndex,
      };

      return [firstChunk, updatedLastChunk];
    }
    default: {
      return state;
    }
  }
};

function useChunks() {
  const [chunks, dispatch] = useReducer(reduceChunksState, initialChunks);

  const resetChunks = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const loadChunkBefore = useCallback((endTimestamp: number) => {
    dispatch({ type: 'load-before', endTimestamp, number: chunkSize });

    setTimeout(() => {
      const items = generateRandomItems(endTimestamp - chunkSize, chunkSize);

      dispatch({ type: 'load-before-success', items });
    }, loadingDelay);
  }, []);

  const loadChunkAfter = useCallback((startTimestamp: number) => {
    dispatch({ type: 'load-after', startTimestamp, number: chunkSize });

    setTimeout(() => {
      const items = generateRandomItems(startTimestamp, chunkSize);

      dispatch({ type: 'load-after-success', items });
    }, loadingDelay);
  }, []);

  return {
    chunks,
    resetChunks,
    loadChunkBefore,
    loadChunkAfter,
  };
}

const CellDataContext = createContext<Chunks>(initialChunks);

const getTimestamps = ([firstChunk, lastChunk]: Chunks): {
  startTimestamp: number | undefined;
  endTimestamp: number | undefined;
} => {
  const startTimestamp =
    firstChunk.status === 'loaded' ? firstChunk.startTimestamp : undefined;
  const endTimestamp =
    lastChunk.status === 'loaded' ? lastChunk.endTimestamp : undefined;

  return {
    startTimestamp,
    endTimestamp,
  };
};

const getRowIndices = ([firstChunk, lastChunk]: Chunks): {
  startRowIndex: number;
  endRowIndex: number;
} => {
  const startRowIndex = firstChunk.rowIndex;
  const endRowIndex = lastChunk.rowIndex + getRowCountOfChunk(lastChunk);

  return {
    startRowIndex,
    endRowIndex,
  };
};

const getRowCountOfChunk = (chunk: Chunk) =>
  chunk.status === 'loaded' ? chunk.items.length : 1;

const findRowInChunks = (
  rowIndex: number,
  chunks: Chunk[]
): { chunk: Chunk; indexInChunk: number } | undefined => {
  const chunk = chunks.find(
    (c) =>
      rowIndex >= c.rowIndex && rowIndex < c.rowIndex + getRowCountOfChunk(c)
  );

  if (chunk != null) {
    return {
      chunk,
      indexInChunk: rowIndex - chunk.rowIndex,
    };
  }
};
