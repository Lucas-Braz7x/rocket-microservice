export interface OrderCreatedMessage {
  orderId: string;
  amount: number;
  custumer: {
    id: string;
  };
}
