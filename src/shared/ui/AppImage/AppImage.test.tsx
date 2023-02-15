import { render, screen } from '@testing-library/react';

import { Skeleton } from '../Skeleton';

import { AppImage } from './AppImage';

describe('AppImage', () => {
    test('Test render', () => {
        render(<AppImage />);
        expect(screen.getByTestId('AppImage')).toBeInTheDocument();
    });

    test('Test fallback', () => {
        const fallback = <Skeleton width={50} height={50} border="50%" />;
        render(<AppImage fallback={fallback} />);
        const appImage = screen.queryByTestId('AppImage');
        expect(appImage).not.toBeInTheDocument();
    });
});
