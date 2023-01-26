import {
    ActionCreatorsMapObject,
    AsyncThunk,
    bindActionCreators,
    createSlice,
} from '@reduxjs/toolkit';
/**
 * папка, куда билдится сам rtk
 */
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useMemo } from 'react';

import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
    ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
    [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
        ? BoundAsyncThunk<Actions[key]>
        : Actions[key];
};

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = () => {
        const dispatch = useAppDispatch();

        return useMemo(
            () =>
                bindActionCreators(
                    slice.actions as ActionCreatorsMapObject,
                    dispatch,
                ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [],
        );
    };

    return {
        ...slice,
        useActions,
    };
}
