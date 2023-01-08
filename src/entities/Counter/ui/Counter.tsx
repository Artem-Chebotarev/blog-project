import { Button } from '@/shared/ui/Button';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const counterValue = useCounterValue();
    const { decrement, increment, add } = useCounterActions();

    const handleIncrement = () => {
        increment();
    };

    const handleDecrement = () => {
        decrement();
    };

    const handleAdd = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="increment-btn" onClick={handleIncrement}>
                increment
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDecrement}>
                decrement
            </Button>
            <Button data-testid="add-btn" onClick={handleAdd}>
                +5
            </Button>
        </div>
    );
};
