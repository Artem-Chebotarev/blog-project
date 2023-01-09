import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/providers/StoreProvider';

/**
 * Typed dispatch
 * @returns
 */
export function useAppDispatch() {
    return useDispatch<AppDispatch>();
}
