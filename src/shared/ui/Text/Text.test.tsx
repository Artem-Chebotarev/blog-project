import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { Text, TextTheme } from './Text';

describe('Text', () => {
    test('Test render', () => {
        componentRender(<Text title="Title" text="Text" />);
        expect(screen.getByText('Title')).toBeInTheDocument();
    });

    test('Should have class error', () => {
        componentRender(
            <Text title="Title" text="Text" theme={TextTheme.ERROR} />,
        );

        const container = screen.getByText('Title').parentElement;

        expect(container).toHaveClass('error');
    });
});
