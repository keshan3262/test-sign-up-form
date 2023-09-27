import { BaseSyntheticEvent, ReactElement, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SignInFormProps {
  children: ReactElement | ReactElement[];
  onSubmit: (e?: BaseSyntheticEvent) => void;
}

export const SignUpForm = ({ children, onSubmit }: SignInFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onBackClick = useCallback(() => navigate(-1), [navigate]);

  const isFirstStep = location.pathname === '/';
  const isLastStep = location.pathname === '/step3';

  return (
    <form onSubmit={onSubmit}>
      {children}
      <div className="form-actions">
        {!isFirstStep && <button type="button" onClick={onBackClick}>Back</button>}
        <button type="submit">{isLastStep ? 'Submit' : 'Next'}</button>
      </div>
    </form>
  );
};
