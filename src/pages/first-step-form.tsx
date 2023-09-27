import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { RawSignUpFormValues } from '../types/sign-up';
import { SignUpForm } from '../layouts/sign-up-form';
import { useAppDispatch } from '../hooks/redux';
import { submitPartAction } from '../slices/sign-up-form';
import { SimpleInput } from '../components/simple-input';
import { useDefaultFormValues } from '../hooks/sign-up-form';

type FirstStepFormValues = Pick<RawSignUpFormValues, 'fullName'>; 

export const firstStepValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^([a-zA-Z]{3,}\s?){2,}$/, 'Full name must be in format: Firstname Lastname')
    .required('This field is required')
});

const fieldsNames = ['fullName'] as const;

export const FirstStepForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultValues = useDefaultFormValues(fieldsNames);

  const { handleSubmit, register, formState } = useForm<FirstStepFormValues>({
    resolver: yupResolver(firstStepValidationSchema),
    defaultValues
  });

  const onSubmit = useMemo(() => handleSubmit((values) => {
    dispatch(submitPartAction(values));
    navigate('/step2');
  }), [handleSubmit, dispatch, navigate]);

  return (
    <SignUpForm onSubmit={onSubmit}>
      <SimpleInput register={register} formState={formState} name="fullName" label="Full Name" id="full-name" />
    </SignUpForm>
  );
};
