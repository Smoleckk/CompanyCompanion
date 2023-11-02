export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  qty: number;
  unit: string;
  salesPrice: number;
  vat: number;
  bruttoPrice: number;
  nettoPrice: number;
  isActual: boolean;
}