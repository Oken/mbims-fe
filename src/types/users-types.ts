interface UsersType {
  id: number;
  user_id: string;
  user_name: string;
  phone: string;
  email: string;
}

interface CustomerType {
  id: number;
  customer_name: string;
  email: string;
  phone: string;
  avatar: string;
  customer_address: string;
  city: string;
  customer_description: string;
  customer_code: string;
  country: string;
  customer_status: boolean;
}

export type UsersT = UsersType;

export type CustomerT = CustomerType;
