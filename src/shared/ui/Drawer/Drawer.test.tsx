import { screen } from '@testing-library/react';

import { AnimationContext } from '@/shared/lib/helpers/components/AnimationProvider/AnimationProvider';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { Drawer } from './Drawer';

describe('Drawer', () => {
    test('Drawer render', () => {
        componentRender(
            <AnimationContext.Provider
                value={{
                    isLoaded: false,
                }}
            >
                <Drawer>
                    <div>1</div>
                    <div>2</div>
                </Drawer>
            </AnimationContext.Provider>,
        );
        expect(screen.queryByTestId('Drawer')).not.toBeInTheDocument();
        screen.debug();
    });

    // test('Should have class error', () => {
    //     componentRender(
    //         <Text title="Title" text="Text" theme={TextTheme.ERROR} />,
    //     );

    //     const container = screen.getByText('Title').parentElement;

    //     expect(container).toHaveClass('error');
    // });
});
