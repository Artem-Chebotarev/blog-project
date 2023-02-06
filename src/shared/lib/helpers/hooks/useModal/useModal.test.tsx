import { renderHook, act } from '@testing-library/react';

import { useModal } from './useModal';

describe('useModal hook', () => {
    const onCloseMock = jest.fn();
    const animationDelay = 500;

    test('returns the correct state values', () => {
        const { result } = renderHook(() =>
            useModal({
                onClose: onCloseMock,
                isOpen: true,
                animationDelay,
            }),
        );
        expect(result.current.isClosing).toBe(false);
        expect(result.current.isMounted).toBe(true);
        expect(result.current.close).toBeInstanceOf(Function);
    });

    it('calls the onClose function when close is called', () => {
        const { result } = renderHook(() =>
            useModal({
                onClose: onCloseMock,
                isOpen: true,
                animationDelay,
            }),
        );
        act(() => {
            result.current.close();
        });
        expect(result.current.isClosing).toBe(true);
    });
});
