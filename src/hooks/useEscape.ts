import { useKey } from 'react-use';

export interface UseEscape {
  (handler: Parameters<typeof useKey>[1]): void;
}

export const useEscape: UseEscape = handler => useKey('Escape', handler);
