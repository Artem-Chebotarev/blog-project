import { AppDispatch } from 'app/providers/StoreProvider';
import { useDispatch } from 'react-redux';

// Типизированный диспатч
export const useAppDispatch = () => useDispatch<AppDispatch>();
