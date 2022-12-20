import { AppDispatch } from 'app/providers/StoreProvider';
import { useDispatch } from 'react-redux';

// Типизированный диспатч
export function useAppDispatch() {
    return useDispatch<AppDispatch>();
}
