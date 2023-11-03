import { Product } from './product';

export interface Invoice {
  invoiceId: number;
  invoiceNo: string;
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
  total: number;
  tax: number;
  netTotal: number;
  paymentStatus: string;
  paymentType: string;
  accountNumber: string;
  paymentDescription: string;
  remarks: string;
  createUser: string;
  createDate: string;
  isGenerated: boolean;
  products: Product[];
}
