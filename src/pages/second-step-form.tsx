import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { RawSignUpFormValues } from '../types/sign-up';
import { SignUpForm } from '../layouts/sign-up-form';
import { useAppDispatch } from '../hooks/redux';
import { submitPartAction } from '../slices/sign-up-form';
import { SimpleInput } from '../components/simple-input';
import { useDefaultFormValues, useRedirectIfInvalid } from '../hooks/sign-up-form';
import { firstStepValidationSchema } from './first-step-form';

type SecondStepFormValues = Pick<RawSignUpFormValues, 'email' | 'password' | 'confirmPassword'>; 

export const secondStepValidationSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('This field is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/g, 'Password must contain at least one digit')
    .matches(/[A-Z]/g, 'Password must contain at least one uppercase letter')
    .required('This field is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('This field is required')
});

const fieldsNames = ['email', 'password', 'confirmPassword'] as const;
const previousStepsSchemas = [firstStepValidationSchema];

export const SecondStepForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultValues = useDefaultFormValues(fieldsNames);

  const { handleSubmit, register, formState } = useForm<SecondStepFormValues>({
    resolver: yupResolver(secondStepValidationSchema),
    defaultValues
  });

  const onSubmit = useMemo(() => handleSubmit((values) => {
    dispatch(submitPartAction(values));
    navigate('/step3');
  }), [handleSubmit, dispatch, navigate]);

  useRedirectIfInvalid('/', previousStepsSchemas);

  return (
    <SignUpForm onSubmit={onSubmit}>
      <SimpleInput register={register} formState={formState} name="email" label="Email" type="email" />
      <SimpleInput register={register} formState={formState} name="password" label="Password" type="password" />
      <SimpleInput
        register={register}
        formState={formState}
        name="confirmPassword"
        label="Confirm Password"
        id="confirm-password"
        type="password"
      />
    </SignUpForm>
  );
};