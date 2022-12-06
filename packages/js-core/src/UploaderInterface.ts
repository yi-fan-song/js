import type { GenericAbortSignal } from './GenericAbortSignal';
import type { GenericFile } from './GenericFile';

export interface UploaderInterface {
  upload: (files: GenericFile[], options: UploaderOptions) => Promise<string[]>;
}

export type UploaderOptions = {
  onProgress?: (percent: number, ...args: any) => void;
  signal?: GenericAbortSignal;
};