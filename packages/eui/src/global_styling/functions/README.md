# Typography Functions

This directory contains typography-related utility functions for EUI's design system.

## FontBase System

EUI supports a dual base system that allows separate base values for spacing/sizing and typography:

### Single Base System (Amsterdam)
```typescript
base: 16  // Used for both spacing and typography
```

### Dual Base System (Borealis)
```typescript
base: {
  base: 16,      // Used for spacing, sizing, and layout
  fontBase: 14   // Used specifically for typography calculations
}
```

### Key Functions

#### `euiFontSizeFromScale(scale, theme, options)`
Calculates font-size values using the appropriate base:
- **Borealis**: Uses `fontBase` (14px) for typography
- **Amsterdam**: Uses `base` (16px) for backward compatibility

#### `euiLineHeightFromBaseline(scale, theme, options)`
Calculates line-height values with theme-aware thresholds:
- **Borealis**: Uses `fontBase * 1.2` threshold for more sizes with full line-height
- **Amsterdam**: Uses `base` threshold for original behavior

### Usage Examples

```typescript
// Borealis theme with dual base
const borealisTheme = {
  base: { base: 16, fontBase: 14 },
  font: {
    scale: { s: 1, m: 1.143 },
    body: { scale: 'm' },
    defaultUnits: 'px'
  }
};

// Size 's' calculation: fontBase (14px) * scale (1) = 14px
const fontSize = euiFontSizeFromScale('s', borealisTheme);
// Result: "14px"

// Amsterdam theme with single base
const amsterdamTheme = {
  base: 16,
  font: {
    scale: { s: 1, m: 1.143 },
    body: { scale: 'm' },
    defaultUnits: 'px'
  }
};

// Size 's' calculation: base (16px) * scale (1) = 16px
const fontSize = euiFontSizeFromScale('s', amsterdamTheme);
// Result: "16px"
```

### Theme Configuration

To use the dual base system in a custom theme:

```typescript
export const base: _EuiThemeBase = {
  base: 16,      // Spacing and sizing base
  fontBase: 14   // Typography base
};
```

### Backward Compatibility

The system is fully backward compatible:
- Themes with `base: number` continue to work unchanged
- Themes with `base: { base: number, fontBase?: number }` use the new system
- If `fontBase` is not provided, it falls back to `base`
