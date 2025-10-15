# EUI Flyout System

## Core Flyout Components

### `src/components/flyout/flyout.tsx`
The main flyout component that serves as the entry point for all flyout functionality. It intelligently renders different flyout types based on context:
- **Session flyouts**: When `session={true}` or within an active session, renders `EuiFlyoutMain`
- **Child flyouts**: When within a managed flyout context, renders `EuiFlyoutChild`
- **Standard flyouts**: Default behavior renders `EuiFlyoutComponent`
- **Resizable flyouts**: `EuiFlyoutResizable` component exists but is not integrated into main routing logic

### `src/components/flyout/flyout.component.tsx`
The core flyout implementation with comprehensive functionality:
- **Props**: Extensive configuration options including size, padding, positioning, focus management
- **Types**: Support for `push` and `overlay` types, left/right sides, various sizes (s/m/l)
- **Accessibility**: Built-in screen reader support, focus trapping, keyboard navigation with sophisticated ESC key handling
- **Styling**: Dynamic width handling, responsive behavior, theme integration
- **Portal/Overlay**: Conditional portal rendering and overlay mask management
- **Session Logic**: Complex routing logic that determines flyout type based on session state and managed context
- **Responsive Behavior**: Adaptive layout switching for managed flyouts based on viewport width and flyout size combinations

### `src/components/flyout/flyout.styles.ts`
Contains the emotion-based styling for the flyout component, including:
- Base flyout styles
- Size-specific styles (s/m/l)
- Padding size variations
- Push vs overlay type styles
- Side-specific positioning (left/right)
- Animation and transition styles

## Flyout Management System

### `src/components/flyout/manager/flyout_manager.tsx`
The central state management system for flyout sessions:
- **Context Provider**: `EuiFlyoutManager` provides global flyout state
- **Session Management**: Tracks main and child flyout relationships with complex state transitions
- **State Reducer**: Handles flyout lifecycle (add, close, set active, set width)
- **Hooks**: Provides utilities like `useHasActiveSession`, `useCurrentSession`, `useFlyoutWidth`
- **Actions**: `addFlyout`, `closeFlyout`, `setActiveFlyout`, `setFlyoutWidth`
- **Responsive Layout**: `useFlyoutLayoutMode` hook manages responsive behavior for managed flyouts with 90% viewport width rule for switching between `side-by-side` and `stacked` layouts

### `src/components/flyout/manager/flyout_main.tsx`
Renders the primary flyout in a session. Currently a simple wrapper around `EuiManagedFlyout` with `session={true}`. TODO items include handling child flyout presence and adjusting focus/shadow behavior.

### `src/components/flyout/manager/flyout_child.tsx`
Renders child flyouts within a session:
- **Positioning**: Automatically positions relative to main flyout width
- **Constraints**: Forces `type="overlay"` and `ownFocus={false}`
- **Width Integration**: Uses main flyout width for positioning

### `src/components/flyout/manager/flyout_managed.tsx`
The managed flyout wrapper that integrates with the flyout manager system, handling registration and lifecycle management. Includes validation of props for managed flyouts.

### `src/components/flyout/manager/flyout_validation.ts`
Validation utilities for managed flyout props:
- **Named Size Validation**: Child flyouts must use named sizes (s, m, l, fill). Main flyouts can use named sizes or custom values (e.g., '400px'). If size is not provided, main flyouts default to 'm' and child flyouts default to 's'.
- **Size Combination Rules**: Parent and child can't both be 'm', parent and child can't both be 'fill', and 'l' can only be used if the other flyout is 'fill'
- **Title**: Must be provided either through `flyoutMenuProps` or `aria-label`
- **Error Handling**: Comprehensive error messages for invalid configurations

### `src/components/flyout/manager/index.ts`
Exports all manager-related components and utilities for easy importing.

## Specialized Flyout Components

### `src/components/flyout/flyout_resizable.tsx`
A resizable flyout variant that adds drag-to-resize functionality:
- **Drag Resize**: Mouse/touch drag to resize flyout width
- **Keyboard Resize**: Arrow key navigation for accessibility
- **Constraints**: Configurable min/max width with window bounds checking
- **Callbacks**: `onResize` callback for width change notifications
- **Visual Indicator**: Resize handle with border indicator
- **Note**: Not yet integrated into main flyout routing logic

### `src/components/flyout/flyout_menu.tsx`
A specialized flyout component for menu-style content:
- **Layout**: Flex-based header with back button, popover, title, and close button
- **Context Integration**: Uses `EuiFlyoutMenuContext` for close handling
- **Accessibility**: Proper ARIA labels and screen reader support
- **Styling**: Custom menu-specific styling via `flyout_menu.styles.ts`

### `src/components/flyout/flyout_menu_context.ts`
React context for flyout menu components, providing `onClose` callback to child components.

## Styling and Theming

### `src/components/flyout/flyout.styles.ts`
Core flyout styling with emotion CSS-in-JS:
- Responsive design patterns
- Theme variable integration
- Animation and transition styles
- Size and positioning utilities

### `src/components/flyout/flyout_menu.styles.ts`
Menu-specific styling for the flyout menu component.

### `src/components/flyout/manager/flyout.styles.ts`
Managed flyout styling for the flyout managment system.

## Testing and Documentation

### `src/components/flyout/flyout.spec.tsx`
Unit tests for the main flyout component functionality.

### `src/components/flyout/flyout.test.tsx`
Additional test coverage for flyout behavior and edge cases.

### `src/components/flyout/flyout_menu.stories.tsx`
Storybook stories demonstrating flyout menu usage and variations.

### `src/components/flyout/manager/flyout_manager.stories.tsx`
Storybook stories for the flyout manager system and session management.

### `src/components/flyout/manager/flyout_child.stories.tsx`
Storybook stories showcasing child flyout behavior and positioning.

## Integration

### `src/components/flyout/index.ts`
Main export file that exposes all public flyout APIs:
- Core components: `EuiFlyout`, `EuiFlyoutComponent`
- Body/Header/Footer components
- Resizable and menu variants
- Animation utilities

### `src/components/provider/provider.tsx`
The EUI provider that includes `EuiFlyoutManager` in its component tree, ensuring flyout management is available throughout the application.

## Key Features

- **Session Management**: Multi-level flyout sessions with main/child relationships
- **Accessibility**: Full keyboard navigation, screen reader support, focus management with sophisticated ESC key handling
- **Responsive Design**: Adaptive behavior based on screen size and breakpoints with intelligent layout switching for managed flyouts (side-by-side vs stacked) when combined flyout widths exceed 90% of viewport
- **Theme Integration**: Seamless integration with EUI's theming system
- **Type Safety**: Comprehensive TypeScript support with proper prop typing and validation
- **Performance**: Optimized rendering with proper cleanup and memory management
- **Size Validation**: Business rule enforcement for flyout size combinations and managed flyout constraints

## TODOs

### Performance Issues

- **Excessive Re-renders**: The flyout manager reducer creates new arrays on every action, causing unnecessary re-renders for all flyout components
- **Unmemoized Style Calculations**: The `cssStyles` array in `flyout.component.tsx` is recalculated on every render without memoization
- **Memory Leaks**: `document.activeElement` is stored in a ref but never cleaned up, potentially causing memory leaks
- **Inefficient DOM Queries**: Focus trap selectors query the DOM on every render without caching

### Accessibility Issues

- **Focus Trap Edge Cases**: The focus trap logic with shards could fail if DOM elements are removed or changed during flyout lifecycle
- **Missing Error Recovery**: No fallback behavior when focus management fails
- **Inconsistent Keyboard Navigation**: Different flyout types may have different keyboard behavior patterns

### Architectural Concerns

- **Tight Coupling**: The flyout system is tightly coupled to the provider system, making it difficult to use standalone
- **State Management Complexity**: The session management system has complex state transitions that could lead to inconsistent UI states
- **Missing Error Boundaries**: No error handling for flyout rendering failures or state corruption
- **Unclear Session Logic**: The complex session routing logic in `flyout.tsx` (lines 40-50) is difficult to understand and maintain
- **Incomplete Integration**: Resizable flyout functionality exists but is not integrated into main routing logic
- **Missing Cleanup**: Focus references and event listeners are not properly cleaned up

### Recommended Improvements

1. **Memoize Style Calculations**: Use `useMemo` for the `cssStyles` array to prevent unnecessary recalculations
2. **Add Error Boundaries**: Wrap flyout components in error boundaries to handle rendering failures gracefully
3. **Improve Type Safety**: Replace `any` types with proper type guards and add comprehensive prop validation
4. **Optimize State Updates**: Use immutable update patterns that minimize re-renders in the manager
5. **Add Cleanup Logic**: Properly clean up focus references and event listeners in useEffect cleanup functions
6. **Simplify Session Logic**: Break down the complex session routing logic into smaller, testable functions
7. **Integrate Resizable Flyouts**: Complete the integration of resizable flyout functionality into the main routing logic
8. **Add Comprehensive Testing**: Add unit tests for complex state transitions and edge cases
9. **Improve Documentation**: Add inline documentation for complex logic and state management patterns
10. **Performance Monitoring**: Add performance monitoring for flyout rendering and state updates
