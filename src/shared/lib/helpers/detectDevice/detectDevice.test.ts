import { detectDevice } from './detectDevice';

describe('detectDevice', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    test('should detect desktop device', () => {
        Object.defineProperty(window, 'matchMedia', {});
        const isDesktop = detectDevice();
        expect(isDesktop).toBe(false);
    });

    test('should detect mobile device', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: '(pointer:coarse)',
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
        const isMobile = detectDevice();
        expect(isMobile).toEqual('(pointer:coarse)');
    });
});
