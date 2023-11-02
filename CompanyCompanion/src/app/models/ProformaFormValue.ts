import { Product } from './product';

export interface ProformaFormValue {
  proformaId: number;
  proformaNo: string;
  placeOfIssue: string;
  dateIssued: string;
  dueDate: string;
  invoiceDate: string;
  customerName: string;
  customerNip: string;
  customerDeliveryAddress: string;
  customerCityCode: string;
  sellerId: string;
  sellerIdName: string;
  sellerNip: string;
  sellerDeliveryAddress: string;
  sellerCityCode: string;
  total: string;
  tax: string;
  netTotal: string;
  paymentStatus: string;
  paymentType: string;
  accountNumber: string;
  paymentDescription: string;
  remarks: string;
  products: Product[]; // Tutaj możesz określić typ produktów, jeśli jest to tablica określonego typu.
  isGenerated: boolean;
}
