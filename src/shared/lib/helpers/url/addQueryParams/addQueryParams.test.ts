import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            search: 'java',
        });
        expect(params).toBe('?search=java');
    });
    test('test with multiple params', () => {
        const params = getQueryParams({
            search: 'java',
            page: '2',
            limit: '9',
            sort: 'views',
            order: 'asc',
        });
        expect(params).toBe('?search=java&page=2&limit=9&sort=views&order=asc');
    });
    test('test with undefined', () => {
        const params = getQueryParams({});
        expect(params).toBe('?');
    });
});
