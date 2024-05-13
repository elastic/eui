// TODO: remove once exported by package itself
// https://github.com/oblador/loki/pull/516
declare module '@loki/create-async-callback' {
  export default function createAsyncCallback(): () => void;
}
