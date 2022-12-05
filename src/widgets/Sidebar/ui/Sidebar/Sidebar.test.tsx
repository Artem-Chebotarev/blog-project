import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/config/tests/componentRender/componentRender';
import { Sidebar } from 'widgets/Sidebar';

describe('Sidebar', () => {
    test('some name', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toogle', () => {
        componentRender(<Sidebar />);
        const toogleBtn = screen.getByTestId('sidebar-toogle');

        fireEvent.click(toogleBtn);

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
