import {AppStatePaymentFeature, paymentState} from "./payment.reducers";
import {createSelector} from "@ngrx/store";

export const paymentFeature = (state: AppStatePaymentFeature) => state.paymentFeature;

export const paymentFeatureInvoices = createSelector(paymentFeature, (state: paymentState) => state.invoices);
export const paymentFeatureLoading = createSelector(paymentFeature, (state: paymentState) => state.loading);
export const paymentFeatureShowInvoiceDetail = createSelector(paymentFeature, (state: paymentState) => state.showInvoiceDetail);
export const paymentFeatureInvoice = createSelector(paymentFeature, (state: paymentState) => state.invoice);

export const paymentFeatureFees = createSelector(paymentFeature, (state: paymentState) => state.fees);
