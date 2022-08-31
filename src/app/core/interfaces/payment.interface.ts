import {PaymentMethodEnum} from "@core/enums";

export interface PaymentCreateInterface {
  conceptId: number;
  amount: number;
  paymentMethod: PaymentMethodEnum
}
