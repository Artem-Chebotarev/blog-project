import { fireEvent, screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { Sidebar } from './Sidebar';

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
