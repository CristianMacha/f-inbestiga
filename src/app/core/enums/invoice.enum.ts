export enum EInvoiceStatus {
  ALL = 'ALL',
  PENDING = 'PENDIENTE',
  PARTIAL = 'PARCIAL',
  PAID_OUT = 'PAGADO',
}

export const CInvoiceStatus = {
  PENDING: EInvoiceStatus.PENDING,
  PARTIAL: EInvoiceStatus.PARTIAL,
  PAID_OUT: EInvoiceStatus.PAID_OUT
}
