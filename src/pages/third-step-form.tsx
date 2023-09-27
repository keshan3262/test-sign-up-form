import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { RawSignUpFormValues } from '../types/sign-up';
import { SignUpForm } from '../layouts/sign-up-form';
import { useAppDispatch } from '../hooks/redux';
import { submitPartAction, useWholeFormValues } from '../slices/sign-up-form';
import { SimpleInput } from '../components/simple-input';
import { useDefaultFormValues, useRedirectIfInvalid } from '../hooks/sign-up-form';
import { firstStepValidationSchema } from './first-step-form';
import { secondStepValidationSchema } from './second-step-form';
import './third-step-form.css';

type ThirdStepFormValues = Pick<RawSignUpFormValues, 'paymentMethodType' | 'payPalEmail' | 'creditCardNumber'>; 

const thirdStepValidationSchema = yup.object().shape({
  paymentMethodType: yup.string().oneOf(['cc', 'pp']).required('This field is required'),
  payPalEmail: yup.string().when('paymentMethodType', {
    is: 'pp',
    then: schema => schema.email('Must be a valid email').required('This field is required'),
  }),
  creditCardNumber: yup.string().when('paymentMethodType', {
    is: 'cc',
    then: schema => schema
      .matches(/^[0-9]{16}$/, 'Credit card number must be 16 digits')
      .test('luhn-algorithm', 'Credit card number is invalid', value => {
        if (typeof value !== 'string' || !/^[0-9]{16}$/.test(value)) {
          return true;
        }

        let nCheck = 0;
        let bEven = false;
        const valueArr = value.split('').reverse();

        for (let i = 0; i < valueArr.length; i++) {
          let cDigit = parseInt(valueArr[i], 10);

          if (bEven) {
            if ((cDigit *= 2) > 9) cDigit -= 9;
          }

          nCheck += cDigit;
          bEven = !bEven;
        }

        return (nCheck % 10) === 0; 
      })
      .required('This field is required'),
  })
});

const fieldsNames = ['paymentMethodType', 'payPalEmail', 'creditCardNumber'] as const;
const previousStepsSchemas = [firstStepValidationSchema, secondStepValidationSchema];

export const ThirdStepForm = () => {
  const dispatch = useAppDispatch();
  const defaultValues = useDefaultFormValues(fieldsNames);

  const { handleSubmit, register, formState, watch } = useForm<ThirdStepFormValues>({
    resolver: yupResolver(thirdStepValidationSchema),
    defaultValues
  });
  const paymentMethodType = watch('paymentMethodType');
  const wholeFormValues = useWholeFormValues();

  const onSubmit = useMemo(() => handleSubmit((values) => {
    dispatch(submitPartAction(values));
    console.log({ ...wholeFormValues, ...values });
  }), [handleSubmit, dispatch, wholeFormValues]);

  useRedirectIfInvalid('/', previousStepsSchemas);

  return (
    <SignUpForm onSubmit={onSubmit}>
      <fieldset>
        <legend>Please choose payment method:</legend>
        <div className="flex-flex-col">
          <SimpleInput
            register={register}
            formState={formState}
            name="paymentMethodType"
            label="PayPal"
            type="radio"
            value="pp"
            showError={false}
          />
          <SimpleInput
            register={register}
            formState={formState}
            name="paymentMethodType"
            label="Credit Card"
            type="radio"
            value="cc"
          />
        </div>
        {paymentMethodType === 'pp' && (
          <SimpleInput
            register={register}
            formState={formState}
            name="payPalEmail"
            label="PayPal Email"
            type="email"
          />
        )}
        {paymentMethodType === 'cc' && (
          <SimpleInput
            register={register}
            formState={formState}
            name="creditCardNumber"
            label="Credit Card Number"
            type="text"
          />
        )}
      </fieldset>
    </SignUpForm>
  );
};
