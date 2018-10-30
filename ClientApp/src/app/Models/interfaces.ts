 export interface ThisOrder {
  type: string;
  order_Number: string,
   address: string;
  state: string;
  zipCode: string;
  accountInfoOrderId: string;
  cpu: string;
  motherboard: string;
  ram: string;
  storage: string;
  gpu: string;
  power_Supply: string;
  cooling_Fan: string;
  case :string;
  total_Price:
   string;
 }

 export interface KeyValuePair {
  name: string;
  price: number;
  hardwareType: string;
  model: string;
  series: string;
  brand: string;
  details: string;
 }

 export interface Account {
  email: string;
  master_account: boolean;
  admin: boolean;
 }

 export interface OrderWDate {
  type: string;
  order_Number: string,
  address: string;
  state: string;
  zipCode: string;
  accountInfoOrderId: string;
  orderDate: Date;
  cpu: string;
  motherboard: string;
  ram: string;
  storage: string;
  gpu: string;
  power_Supply: string;
  cooling_Fan: string;
  case :string;
  total_Price:
   string;
 }

 export interface ThisSellOrder {
  accountsaleitemid: string;
  type: string;
  cooling_Fan: string;
  cpu: string;
  gpu: string;
  motherboard: string;
  power_Supply: string;
  ram: string;
  storage: string;
  case :string;
  total_Price:
   string;
   sellerName: string;
 }

 export interface Components {
  value: string;
  viewValue: string;
 };