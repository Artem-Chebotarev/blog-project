import {
    ActionCreatorsMapObject,
    bindActionCreators,
    createSlice,
} from '@reduxjs/toolkit';
/**
 * папка, куда билдится сам rtk
 */
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useMemo } from 'react';

import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

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
