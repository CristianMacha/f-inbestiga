export enum PaymentConceptEnum {
  FEE = 'F'
}

export enum PaymentMethodEnum {
  YAPE = 'YAPE',
  PLIN = 'PLIN',
  BCP = 'BCP',
  INTERBANK = 'INTERBANK',
  BBVA = 'BBVA',
  SCONTIABANK = 'SCOTIABANK',
  CASH_PAYMENT = 'EFECTIVO',
}

export enum PaymentStatusEnum {
  PENDING = 'PENDIENTE',
  VERIFIED = 'VERIFICADO',
  REFUSED = 'RECHAZADO',
}

export const CPaymentStatus = {
  PENDING: PaymentStatusEnum.PENDING,
  VERIFIED: PaymentStatusEnum.VERIFIED,
  REFUSED: PaymentStatusEnum.REFUSED,
}
