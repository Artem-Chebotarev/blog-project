import { render, screen } from '@testing-library/react';

import { Portal } from './Portal';

describe('Portal component', () => {
    test('Portal render', () => {
        const TestComponent = () => <div data-testid="TestComponent">Test</div>;

        render(
            <Portal>
                <TestComponent />
            </Portal>,
        );
        expect(screen.getByTestId('TestComponent')).toBeInTheDocument();
    });
});
