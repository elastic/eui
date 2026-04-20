/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getFlyoutManagerStore, _resetFlyoutManagerStore } from './store';
import { LEVEL_MAIN, LEVEL_CHILD } from './const';

describe('Flyout Manager Store', () => {
  beforeEach(() => {
    _resetFlyoutManagerStore();
  });

  afterEach(() => {
    _resetFlyoutManagerStore();
  });

  describe('singleton behavior', () => {
    it('should return the same instance on multiple calls', () => {
      const store1 = getFlyoutManagerStore();
      const store2 = getFlyoutManagerStore();

      expect(store1).toBe(store2);
    });

    it('should create a new instance after reset', () => {
      const store1 = getFlyoutManagerStore();
      _resetFlyoutManagerStore();
      const store2 = getFlyoutManagerStore();

      expect(store1).not.toBe(store2);
    });
  });

  describe('historyItems stability', () => {
    it('should maintain stable references when sessions do not change', () => {
      const store = getFlyoutManagerStore();

      // Add a main flyout (creates a session)
      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);

      const firstHistoryItems = store.historyItems;

      // Perform an action that does NOT change sessions (only width)
      store.setFlyoutWidth('flyout-1', 500);

      const secondHistoryItems = store.historyItems;

      // References should be the same since sessions didn't change
      expect(secondHistoryItems).toBe(firstHistoryItems);
    });

    it('should update references when sessions change', () => {
      const store = getFlyoutManagerStore();
      const historyKey = Symbol();

      // Add first flyout (with shared historyKey)
      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      const firstHistoryItems = store.historyItems;

      // Add second flyout (same historyKey so they share history)
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      const secondHistoryItems = store.historyItems;

      // References should be different since sessions changed
      expect(secondHistoryItems).not.toBe(firstHistoryItems);

      // Should have one history item (the first session, same group)
      expect(secondHistoryItems).toHaveLength(1);
      expect(secondHistoryItems[0].title).toBe('First Flyout');
    });

    it('should create stable onClick handlers within the same session state', () => {
      const store = getFlyoutManagerStore();
      const historyKey = Symbol();

      // Add two flyouts (same historyKey) to create history
      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const firstHistoryItems = store.historyItems;
      const firstOnClick = firstHistoryItems[0].onClick;

      // Access history items again without changing sessions
      store.setFlyoutWidth('flyout-2', 400);
      const secondHistoryItems = store.historyItems;
      const secondOnClick = secondHistoryItems[0].onClick;

      // The entire array should be the same reference
      expect(secondHistoryItems).toBe(firstHistoryItems);
      // The onClick handler should also be the same reference
      expect(secondOnClick).toBe(firstOnClick);
    });

    it('should properly compute history items with correct titles', () => {
      const store = getFlyoutManagerStore();
      const historyKey = Symbol();

      // Create multiple sessions (same historyKey so they share history)
      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-3',
        'Third Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const historyItems = store.historyItems;

      // Should have 2 history items (previous sessions in same group, reverse order)
      expect(historyItems).toHaveLength(2);
      expect(historyItems[0].title).toBe('Second Flyout');
      expect(historyItems[1].title).toBe('First Flyout');
    });

    it('should include iconType in history items when sessions were added with iconType', () => {
      const store = getFlyoutManagerStore();
      const historyKey = Symbol();

      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey,
        'faceHappy'
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const historyItems = store.historyItems;

      expect(historyItems).toHaveLength(1);
      expect(historyItems[0].title).toBe('First Flyout');
      expect(historyItems[0].iconType).toBe('faceHappy');
      expect(historyItems[0].onClick).toBeDefined();
    });

    it('should have functional onClick handlers', () => {
      const store = getFlyoutManagerStore();
      const historyKey = Symbol();

      // Create two sessions (same historyKey)
      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const historyItems = store.historyItems;

      // Click the history item to go back to first flyout
      historyItems[0].onClick();

      // Should have navigated back - history should now be empty
      expect(store.historyItems).toHaveLength(0);
      expect(store.getState().sessions).toHaveLength(1);
      expect(store.getState().sessions[0].mainFlyoutId).toBe('flyout-1');
    });

    it('should keep intervening groups when history onClick navigates within a group', () => {
      const store = getFlyoutManagerStore();
      const keyA = Symbol();
      const keyB = Symbol();

      store.addFlyout('a-1', 'A1', LEVEL_MAIN, undefined, keyA);
      store.addFlyout('b-1', 'B1', LEVEL_MAIN, undefined, keyB);
      store.addFlyout('a-2', 'A2', LEVEL_MAIN, undefined, keyA);

      expect(store.historyItems).toHaveLength(1);
      expect(store.historyItems[0].title).toBe('A1');

      // Navigate to A1 from A2 history item.
      store.historyItems[0].onClick();

      // B1 should still exist and be restored behind the active A group.
      expect(store.getState().sessions.map((s) => s.mainFlyoutId)).toEqual([
        'b-1',
        'a-1',
      ]);
      expect(store.getState().flyouts.map((f) => f.flyoutId)).toEqual([
        'a-1',
        'b-1',
      ]);
    });

    it('should include current session child history first, then previous main sessions (child items most recent first)', () => {
      const store = getFlyoutManagerStore();
      const historyKey = Symbol();

      store.addFlyout('main-1', 'Main', LEVEL_MAIN, undefined, historyKey);
      store.addFlyout('child-1', 'Child 1', LEVEL_CHILD);
      store.addFlyout('child-2', 'Child 2', LEVEL_CHILD);

      const historyItems = store.historyItems;

      expect(historyItems).toHaveLength(1); // one child in history (Child 1), no previous mains
      expect(historyItems[0].title).toBe('Child 1');
      expect(historyItems[0].onClick).toBeDefined();

      // Add a second main (same historyKey): current session becomes main-2 (no child), so history = previous session in group (main-1 had children)
      store.addFlyout('main-2', 'Main 2', LEVEL_MAIN, undefined, historyKey);
      const historyItems2 = store.historyItems;
      expect(historyItems2).toHaveLength(2); // main-1 had Child 2 and Child 1 in history
      expect(historyItems2[0].title).toBe('Child 2');
      expect(historyItems2[1].title).toBe('Child 1');
    });

    it('should have empty historyItems (zero depth) when only one main', () => {
      const store = getFlyoutManagerStore();
      store.addFlyout('main-1', 'Main', LEVEL_MAIN);
      expect(store.historyItems).toHaveLength(0);
    });

    it('should have empty historyItems (zero depth) when one main and one child (no child-to-child)', () => {
      const store = getFlyoutManagerStore();
      store.addFlyout('main-1', 'Main', LEVEL_MAIN);
      store.addFlyout('child-1', 'Child', LEVEL_CHILD);
      expect(store.historyItems).toHaveLength(0);
    });

    it('should not share history when no historyKey is passed (each session gets unique Symbol)', () => {
      const store = getFlyoutManagerStore();

      store.addFlyout('main-1', 'First', LEVEL_MAIN);
      store.addFlyout('main-2', 'Second', LEVEL_MAIN);

      // Each session has its own Symbol, so no shared history - current session has no previous in its group
      expect(store.historyItems).toHaveLength(0);
    });
  });

  describe('store subscription', () => {
    it('should notify subscribers when state changes', () => {
      const store = getFlyoutManagerStore();
      const listener = jest.fn();

      const unsubscribe = store.subscribe(listener);

      store.addFlyout('flyout-1', 'Test Flyout', LEVEL_MAIN);

      expect(listener).toHaveBeenCalledTimes(1);

      unsubscribe();
    });

    it('should not notify unsubscribed listeners', () => {
      const store = getFlyoutManagerStore();
      const listener = jest.fn();

      const unsubscribe = store.subscribe(listener);
      unsubscribe();

      store.addFlyout('flyout-1', 'Test Flyout', LEVEL_MAIN);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should notify all subscribers', () => {
      const store = getFlyoutManagerStore();
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      store.subscribe(listener1);
      store.subscribe(listener2);

      store.addFlyout('flyout-1', 'Test Flyout', LEVEL_MAIN);

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('event subscription', () => {
    it('should emit CLOSE_SESSION event when a session is removed by going back', () => {
      const store = getFlyoutManagerStore();
      const eventListener = jest.fn();
      const historyKey = Symbol();

      // Create two sessions (same historyKey so goBack only removes one)
      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const sessions = store.getState().sessions;
      expect(sessions).toHaveLength(2);

      // Subscribe to events
      const unsubscribe = store.subscribeToEvents(eventListener);

      // Go back one session (within same history group)
      store.goBack();

      // Should have emitted CLOSE_SESSION for the second session only
      expect(eventListener).toHaveBeenCalledTimes(1);
      expect(eventListener).toHaveBeenCalledWith({
        type: 'CLOSE_SESSION',
        session: sessions[1],
      });

      unsubscribe();
    });

    it('should emit CLOSE_SESSION event when navigating to a previous flyout', () => {
      const store = getFlyoutManagerStore();
      const eventListener = jest.fn();
      const historyKey = Symbol();

      // Create three sessions (same historyKey)
      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-3',
        'Third Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const sessions = store.getState().sessions;
      expect(sessions).toHaveLength(3);

      // Subscribe to events
      const unsubscribe = store.subscribeToEvents(eventListener);

      // Navigate to first flyout (should remove sessions 2 and 3)
      store.goToFlyout('flyout-1');

      // Should have emitted CLOSE_SESSION for sessions 2 and 3
      expect(eventListener).toHaveBeenCalledTimes(2);
      expect(eventListener).toHaveBeenNthCalledWith(1, {
        type: 'CLOSE_SESSION',
        session: sessions[1],
      });
      expect(eventListener).toHaveBeenNthCalledWith(2, {
        type: 'CLOSE_SESSION',
        session: sessions[2],
      });

      unsubscribe();
    });

    it('should notify all event subscribers', () => {
      const store = getFlyoutManagerStore();
      const eventListener1 = jest.fn();
      const eventListener2 = jest.fn();
      const historyKey = Symbol();

      store.addFlyout(
        'flyout-1',
        'First Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const sessions = store.getState().sessions;

      store.subscribeToEvents(eventListener1);
      store.subscribeToEvents(eventListener2);

      // Go back one session (same group)
      store.goBack();

      // Both listeners should have been called once (one session removed)
      expect(eventListener1).toHaveBeenCalledTimes(1);
      expect(eventListener1).toHaveBeenCalledWith({
        type: 'CLOSE_SESSION',
        session: sessions[1],
      });
      expect(eventListener2).toHaveBeenCalledTimes(1);
      expect(eventListener2).toHaveBeenCalledWith({
        type: 'CLOSE_SESSION',
        session: sessions[1],
      });
    });

    it('should emit CLOSE_SESSION event when a session is removed by closeFlyout', () => {
      const store = getFlyoutManagerStore();
      const eventListener = jest.fn();

      // Create a session
      store.addFlyout('flyout-1', 'Test Flyout', LEVEL_MAIN);

      const sessions = store.getState().sessions;
      expect(sessions).toHaveLength(1);

      const unsubscribe = store.subscribeToEvents(eventListener);

      // Close the main flyout
      store.closeFlyout('flyout-1');

      // Should have emitted CLOSE_SESSION
      expect(eventListener).toHaveBeenCalledTimes(1);
      expect(eventListener).toHaveBeenCalledWith({
        type: 'CLOSE_SESSION',
        session: sessions[0],
      });

      unsubscribe();
    });

    it('should emit CLOSE_SESSION events when all sessions are removed by closeAllFlyouts', () => {
      const store = getFlyoutManagerStore();
      const eventListener = jest.fn();
      const historyKey = Symbol();

      // Create sessions (same historyKey so closeAllFlyouts closes both)
      store.addFlyout(
        'flyout-1',
        'Test Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );
      store.addFlyout(
        'flyout-2',
        'Second Flyout',
        LEVEL_MAIN,
        undefined,
        historyKey
      );

      const sessions = store.getState().sessions;
      expect(sessions).toHaveLength(2);

      const unsubscribe = store.subscribeToEvents(eventListener);

      // closeAllFlyouts closes only current history group (both sessions share key)
      store.closeAllFlyouts();

      // Should have emitted CLOSE_SESSION for both sessions
      expect(eventListener).toHaveBeenCalledTimes(2);
      expect(eventListener).toHaveBeenNthCalledWith(1, {
        type: 'CLOSE_SESSION',
        session: sessions[0],
      });
      expect(eventListener).toHaveBeenNthCalledWith(2, {
        type: 'CLOSE_SESSION',
        session: sessions[1],
      });

      // Should have no sessions left
      expect(store.getState().sessions).toHaveLength(0);

      unsubscribe();
    });
  });
});
