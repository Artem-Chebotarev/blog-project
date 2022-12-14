import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('Input', () => {
    test('render input', () => {
        render(<Input />);
        expect(screen.getByTestId('Input')).toBeInTheDocument();
    });

    test('focus on input', async () => {
        render(<Input />);
        const input = screen.getByTestId('Input');

        await userEvent.click(input);

        expect(input).toHaveFocus();
    });

    test('change input', () => {
        type TestElement = Document | Element | Window | Node;

        function hasInputValue(event: TestElement, inputValue: string) {
            return screen.getByDisplayValue(inputValue) === event;
        }

        render(<Input />);

        const input = screen.getByTestId('Input');

        fireEvent.change(input, { target: { value: '123' } });

        expect(hasInputValue(input, '123')).toBe(true);
    });
});
