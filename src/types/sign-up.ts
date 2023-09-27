interface PaymentMethodBase {
  type: 'pp' | 'cc';
}

interface PaypalPaymentMethod extends PaymentMethodBase {
  type: 'pp';
  email: string;
}

interface CreditCardPaymentMethod extends PaymentMethodBase {
  type: 'cc';
  cardNumber: string;
}

export type PaymentMethod = PaypalPaymentMethod | CreditCardPaymentMethod;

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  paymentMethod: PaymentMethod;
}

export interface RawSignUpFormValues extends Omit<SignUpFormValues, 'paymentMethod' | 'firstName' | 'lastName'> {
  fullName: string;
  paymentMethodType: PaymentMethod['type'];
  payPalEmail?: string;
  creditCardNumber?: string;
}
