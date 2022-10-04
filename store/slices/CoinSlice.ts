import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '../../models/Coin';

export const coinInitialState: Coin = {
   bpi: null!,
   chartName: '',
   disclaimer: '',
   time: {updated: '', updatedISO: '', updateduk: ''}
}

export const coinSlice = createSlice({
   initialState: coinInitialState,
   name: 'coinSlice',
   reducers: {
      setCoin: (state, action: PayloadAction<Coin>) =>{
         return action.payload;
      }
   }
})

export const coinActions = coinSlice.actions;
