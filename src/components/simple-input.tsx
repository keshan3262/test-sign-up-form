import { FieldPath, FieldValues, FormState, UseFormRegister } from 'react-hook-form';

interface SimpleInputProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  formState: FormState<TFieldValues>;
  name: FieldPath<TFieldValues>;
  id?: string;
  label: string;
  type?: 'text' | 'password' | 'radio' | 'email';
  value?: string;
  showError?: boolean;
}

export const SimpleInput = <TFieldValues extends FieldValues>(
  { register, formState, name, id = name, label, type, value, showError = true }: SimpleInputProps<TFieldValues>
) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input {...register(name)} id={id} type={type} value={value} />
    {showError && <p>{formState.errors[name]?.message?.toString() ?? null}</p>}
  </>
);
