import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
    username: 'Admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Ch',
    first: 'Art',
    city: 'New-York',
    currency: Currency.USD,
};

describe('fetchProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);

        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
