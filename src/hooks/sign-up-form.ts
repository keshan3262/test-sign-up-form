import pick from 'lodash.pick';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useWholeFormValues } from '../slices/sign-up-form';
import { RawSignUpFormValues } from '../types/sign-up';

export const useDefaultFormValues = <T extends keyof RawSignUpFormValues>(keys: readonly T[]) => {
  const wholeFormValues = useWholeFormValues();

  return useMemo(() => pick(wholeFormValues, keys), [wholeFormValues, keys]);
};

export const useRedirectIfInvalid = (redirectionPath: string, schemas: yup.ObjectSchema<Record<string, unknown>>[]) => {
  const wholeFormValues = useWholeFormValues();
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = schemas.every(schema => schema.isValidSync(wholeFormValues));

    if (!isValid) {
      navigate(redirectionPath);
    }
  }, [wholeFormValues, schemas, redirectionPath, navigate]);
};
