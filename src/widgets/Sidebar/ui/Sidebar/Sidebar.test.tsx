import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslation } from 'shared/lib/helpers/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from 'widgets/Sidebar';

describe('Sidebar', () => {
    test('some name', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toogle', () => {
        renderWithTranslation(<Sidebar />);
        const toogleBtn = screen.getByTestId('sidebar-toogle');

        fireEvent.click(toogleBtn);

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
