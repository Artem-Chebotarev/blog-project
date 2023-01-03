import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/providers/StoreProvider';

// Типизированный диспатч
export function useAppDispatch() {
    return useDispatch<AppDispatch>();
}
