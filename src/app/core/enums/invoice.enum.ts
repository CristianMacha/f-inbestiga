export enum EInvoiceStatus {
  PENDING = 'PENDIENTE',
  PROCESSING = 'PROCESANDO',
  PAID_OUT = 'PAGADO',
}

export enum EInvoicePaymentMethod {
  YAPE = 'YAPE',
  PLIN = 'PLIN',
  BCP = 'BCP',
  INTERBANK = 'INTERBANK',
  BBVA = 'BBVA',
  SCONTIABANK = 'SCOTIABANK',
  CASH_PAYMENT = 'EFECTIVO',
}

export const CInvoiceStatus = {
  PENDING: 'PENDIENTE',
  PROCESSING: 'PROCESANDO',
  PAID_OUT: 'PAGADO'
}
