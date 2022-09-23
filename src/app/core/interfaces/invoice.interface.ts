import {FilterListInterface} from "./filter.interface";
import {EInvoiceStatus} from "@core/enums";

export interface InvoiceFilterInterface extends FilterListInterface {
  status: EInvoiceStatus;
}
