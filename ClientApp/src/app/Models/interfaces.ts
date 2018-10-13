export interface thisOrder {
    type: string;    
    order_Number: string,
    address: string;
    accountInfoOrderId: string;
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
    price: number;
    hardwareType: string;
    model: string;
    series: string;
    brand: string;
    details: string;    
  }

  //added
  export interface account
  {
    email: string;
    master_account: boolean;
    admin: boolean;
  }
  
  
  export interface orderWDate {
    type: string;    
    order_Number: string,
    address: string;
    accountInfoOrderId: string;
    orderDate: Date;
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
    //end

    
  export interface thisSellOrder  {
    accountsaleitemid: string;
    type: string;  
    cooling_Fan: string;
    cpu: string;
    gpu: string;
    motherboard: string;
    power_Supply: string;
    ram: string;
    storage: string;        
    case: string;
    total_Price: string; 
    sellername: string;
  }

  export interface components {
    value: string;
    viewValue: string;
  };  