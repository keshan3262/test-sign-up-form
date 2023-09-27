import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { signUpFormReducer } from '../slices/sign-up-form';

export const store = configureStore({
  reducer: {
    signUpForm: signUpFormReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
