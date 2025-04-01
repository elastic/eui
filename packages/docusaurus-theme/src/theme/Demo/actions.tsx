import { ComponentType } from 'react';
import { DemoSourceMeta } from '../../components/demo/demo';

export type ActionComponentProps = {
  activeSource: DemoSourceMeta | null;
  sources: DemoSourceMeta[];
};

export type ActionComponent = ComponentType<ActionComponentProps>;

export const extraActions: ActionComponent[] = [];
