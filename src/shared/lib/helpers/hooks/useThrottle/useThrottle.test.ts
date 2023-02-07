import { renderHook } from '@testing-library/react';

import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
    test('should be defined', () => {
        expect(useThrottle).toBeDefined();
    });

    test('should have a value to be returned', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useThrottle(callback, 100));
        expect(result.current).toBeInstanceOf(Function);
    });
    test('calls the callback function after the specified delay', () => {
        let counter = 0;
        const callback = () => {
            counter += 1;
        };
        const delay = 100;
        const { result } = renderHook(() => useThrottle(callback, delay));
        const throttledCallback = result.current;

        // Call the throttled callback multiple times
        throttledCallback();
        throttledCallback();
        throttledCallback();

        // Check that the callback has been called only once
        expect(counter).toBe(1);
    });
});
