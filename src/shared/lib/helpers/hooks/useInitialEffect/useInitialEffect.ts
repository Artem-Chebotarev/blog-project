import { useEffect } from 'react';

/**
 * hook for using effect once
 * @param callback
 */
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        /**
         * чтобы не отправлять запросы на бэк в сторибуке
         * чтобы не крутился лоадер при тестировании
         */
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
