/** @jsxImportSource @emotion/react */

import { EuiCodeBlock, useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  extractInstruction,
  type Instruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';

import { DraggablePanel } from './draggable-panel';
import {
  findItem,
  initialData,
  insertChild,
  insertBefore,
  insertAfter,
  removeItem,
  type Tree,
} from './data';

export default () => {
  const { euiTheme } = useEuiTheme();

  const [items, setItems] = useState<Tree>(initialData);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const target = location.current.dropTargets[0];

        if (!target) return;

        const sourceId = source.data.id as string;
        const targetId = target.data.id as string;

        if (sourceId === targetId) return;

        const instruction: Instruction | null = extractInstruction(target.data);

        if (!instruction) return;
        if (instruction.blocked) return;

        const itemToMove = findItem(items, sourceId);
        if (!itemToMove) return;

        let updatedTree = removeItem(items, sourceId);

        if (instruction.operation === 'combine') {
          updatedTree = insertChild(updatedTree, targetId, itemToMove);
        } else if (instruction.operation === 'reorder-before') {
          updatedTree = insertBefore(updatedTree, targetId, itemToMove);
        } else if (instruction.operation === 'reorder-after') {
          updatedTree = insertAfter(updatedTree, targetId, itemToMove);
        }

        setItems(updatedTree);
      },
    });
  }, [items]);

  const wrapperStyles = css`
    background-color: ${euiTheme.colors.backgroundBasePlain};
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.s};
    min-height: 100%;
    padding: ${euiTheme.size.base};
  `;

  return (
    <div css={wrapperStyles}>
      {items.map((item, index) => (
        <DraggablePanel key={item.id} index={index} {...item} />
      ))}
      <EuiCodeBlock language="json">
        {JSON.stringify(items, null, 2)}
      </EuiCodeBlock>
    </div>
  );
};
