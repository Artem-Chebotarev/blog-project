import { useEffect } from 'react';

export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        // чтобы не отправлять запросы на бэк в сторибуке
        if (__PROJECT__ !== 'storybook') {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
