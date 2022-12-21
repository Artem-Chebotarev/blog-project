import { screen } from '@testing-library/react';
import { componentRender } from 'shared/config/tests/componentRender/componentRender';
import { Applink } from 'shared/ui/Applink/Applink';

describe('Applink', () => {
    test('Test render', () => {
        componentRender(<Applink to="/">HOME</Applink>);
        expect(screen.getByText('HOME')).toBeInTheDocument();
    });

    test('Should be a link that have href value to "/login', () => {
        componentRender(<Applink data-testid="link" to="/login">LOGIN</Applink>);
        const link = screen.getByTestId('link');
        expect(link.getAttribute('href')).toBe('/login');
    });
});
