import { createSlice } from '@reduxjs/toolkit';
import type { renderDateState } from '../type/type.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';


const initialState: renderDateState = {
    month: 0,
    year: 0
}

export const renderDate = createSlice({
    name: 'renderDate',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<renderDateState>) => {
            state.month = action.payload.month;
            state.year = action.payload.year;
        }
    }
});

export const { setDate } = renderDate.actions;
export const selectRenderDate = (state: RootState) => state.renderDate;