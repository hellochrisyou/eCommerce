export interface thisOrder {
    type: string;    
    order_Number: string,
    address: string;
    AccountInfoOrderId: string;
    cpu: string;
    motherboard: string;
    ram: string;
    storage: string;        
    gpu: string;  
    power_Supply: string;
    cooling_Fan: string;
    case: string;
    total_Price: string; 
    }
  
  export interface KeyValuePair 
  {
    name: string;
    price: string;
    model: string;
    series: string;
    brand: string;
    details: string;
    
  }