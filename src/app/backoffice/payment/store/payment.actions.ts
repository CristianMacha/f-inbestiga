import {createAction, props} from "@ngrx/store";
import {Fee, Invoice} from "@core/models";

export const loadPayments = createAction('[Payment Component] Load Payments', props<{ roleId: number }>());
export const loadPaymentsByProject = createAction('[Payment Component] Load Payments By Project', props<{ projectId: number }>())
export const paymentsLoadedSuccess = createAction('[Payment Component] Payments Loaded Success', props<{ invoices: Invoice[] }>());
export const loadError = createAction('[Payment Component] Set Error', props<{ payload: any }>());

export const activeShowInvoiceDetail = createAction('[Payment Component] Active Show Invoice Detail', props<{ active: boolean }>());
export const selectPayment = createAction('[Payment Component] Select Payment', props<{ invoice: Invoice }>());
export const loadPayment = createAction('[Payment Component] Load Payment', props<{ invoiceId: number }>())
export const paymentLoadSuccess = createAction('[Payment Component] Payment Load Success', props<{ invoice: Invoice }>());

export const loadFees = createAction('[Payment Component] Load Fees', props<{ invoiceId: number }>());
export const feesLoadedSuccess = createAction('[Payment Component] Fees Loaded Success', props<{ fees: Fee[] }>());
