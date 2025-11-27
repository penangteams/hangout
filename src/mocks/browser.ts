import { setupWorker } from 'msw/browser';  // from msw/browser in v2
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
