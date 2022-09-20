export enum PaymentConceptEnum {
  FEE = 'F'
}

export enum PaymentMethodEnum {
  TRANSFER_OR_DEPOSIT = 'TRANSFERENCIA/DEPOSITO',
  YAPE = 'YAPE',
  PLIN = 'PLIN',
  BCP = 'BCP',
  CASH_PAYMENT = 'EFECTIVO',
}

export enum PaymentStatusEnum {
  PROCESSING = 'PROCESANDO',
  VERIFIED = 'VERIFICADO',
  REFUSED = 'RECHAZADO',
}

export const CPaymentStatus = {
  PENDING: PaymentStatusEnum.PROCESSING,
  VERIFIED: PaymentStatusEnum.VERIFIED,
  REFUSED: PaymentStatusEnum.REFUSED,
}
