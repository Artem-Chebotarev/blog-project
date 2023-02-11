import { renderHook } from '@testing-library/react';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
    jest.useFakeTimers();
    test('execute just once', () => {
        const func = jest.fn();
        const { result } = renderHook(() => useDebounce(func, 500));
        const debouncedFunc = result.current;

        // Execute for the first time
        debouncedFunc();

        // Move on the timer
        jest.advanceTimersByTime(250);
        // try to execute a 2nd time
        debouncedFunc();

        // Fast-forward time
        jest.runAllTimers();

        expect(func).toBeCalledTimes(1);
    });
});
