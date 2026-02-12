/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getFlyoutManagerStore, _resetFlyoutManagerStore } from './store';
import { LEVEL_MAIN } from './const';

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

      // Add first flyout
      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);
      const firstHistoryItems = store.historyItems;

      // Add second flyout (creates a new session)
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);
      const secondHistoryItems = store.historyItems;

      // References should be different since sessions changed
      expect(secondHistoryItems).not.toBe(firstHistoryItems);

      // Should have one history item (the first session)
      expect(secondHistoryItems).toHaveLength(1);
      expect(secondHistoryItems[0].title).toBe('First Flyout');
    });

    it('should create stable onClick handlers within the same session state', () => {
      const store = getFlyoutManagerStore();

      // Add two flyouts to create history
      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);

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

      // Create multiple sessions
      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-3', 'Third Flyout', LEVEL_MAIN);

      const historyItems = store.historyItems;

      // Should have 2 history items (all previous sessions, in reverse order)
      expect(historyItems).toHaveLength(2);
      expect(historyItems[0].title).toBe('Second Flyout');
      expect(historyItems[1].title).toBe('First Flyout');
    });

    it('should have functional onClick handlers', () => {
      const store = getFlyoutManagerStore();

      // Create two sessions
      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);

      const historyItems = store.historyItems;

      // Click the history item to go back to first flyout
      historyItems[0].onClick();

      // Should have navigated back - history should now be empty
      expect(store.historyItems).toHaveLength(0);
      expect(store.getState().sessions).toHaveLength(1);
      expect(store.getState().sessions[0].mainFlyoutId).toBe('flyout-1');
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

      // Create two sessions
      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);

      const sessions = store.getState().sessions;
      expect(sessions).toHaveLength(2);

      // Subscribe to events
      const unsubscribe = store.subscribeToEvents(eventListener);

      // Go back one session
      store.goBack();

      // Should have emitted CLOSE_SESSION for the second session
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

      // Create three sessions
      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-3', 'Third Flyout', LEVEL_MAIN);

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

      store.addFlyout('flyout-1', 'First Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);

      const sessions = store.getState().sessions;

      store.subscribeToEvents(eventListener1);
      store.subscribeToEvents(eventListener2);

      // Go back one session
      store.goBack();

      // Both listeners should have been called
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

      // Create sessions
      store.addFlyout('flyout-1', 'Test Flyout', LEVEL_MAIN);
      store.addFlyout('flyout-2', 'Second Flyout', LEVEL_MAIN);

      const sessions = store.getState().sessions;
      expect(sessions).toHaveLength(2);

      const unsubscribe = store.subscribeToEvents(eventListener);

      // Closing flyout will close all sessions
      store.closeAllFlyouts();

      // Should have emitted CLOSE_SESSION
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
