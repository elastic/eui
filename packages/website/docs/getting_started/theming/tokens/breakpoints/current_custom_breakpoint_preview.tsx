import { useCurrentEuiBreakpoint } from '@elastic/eui';

export const CurrentCustomBreakpointPreview = () => (
  <>
    Current custom breakpoint: <strong>{useCurrentEuiBreakpoint()}</strong>
  </>
);
