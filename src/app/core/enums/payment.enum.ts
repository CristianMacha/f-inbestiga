export enum PaymentConceptEnum {
  FEE = 'F'
}

export enum PaymentMethodEnum {
  TRANSFER = 'TRANSFERENCIA/DEPOSITO',
  CASH = 'EFECTIVO',
  PLIN = 'PLIN',
  YAPE = 'YAPE',
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
