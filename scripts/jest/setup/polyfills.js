import { MutationObserver } from '../polyfills/mutation_observer';

Object.defineProperty(window, 'MutationObserver', { value: MutationObserver });
