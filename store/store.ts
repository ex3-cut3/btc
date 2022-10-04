import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { coinActions, coinSlice } from './slices/CoinSlice';

const rootReducer = combineReducers({
   coin: coinSlice.reducer
})
export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootReducer = ReturnType<typeof rootReducer>;

export const ALL_ACTIONS = {
   ...coinActions,
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
export const useAction = () => bindActionCreators(ALL_ACTIONS, useAppDispatch());
