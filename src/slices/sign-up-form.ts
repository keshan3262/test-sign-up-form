import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RawSignUpFormValues } from '../types/sign-up';
import { useAppSelector } from '../hooks/redux';

export interface SignUpFormState {
  values: Partial<RawSignUpFormValues>;
}

export const initialState: SignUpFormState = {
  values: {
    paymentMethodType: 'cc'
  }
};

const signUpFormSlice = createSlice({
  name: 'signUpForm',
  initialState,
  reducers: {
    submitPart: ({ values }, { payload: newValues }: PayloadAction<Partial<RawSignUpFormValues>>) => ({
      values: { ...values, ...newValues }
    })
  }
});

export const { submitPart: submitPartAction } = signUpFormSlice.actions;

export const useWholeFormValues = () => useAppSelector(state => state.signUpForm.values);

export const signUpFormReducer = signUpFormSlice.reducer;
