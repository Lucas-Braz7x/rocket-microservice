import type { OrderCreatedMessage } from "../../../../contracts/messages/order-created-message.ts";
import { channels } from "../channels/index.ts";

export const sendOrderCreated = (data: OrderCreatedMessage) => {
  channels.orders.sendToQueue("orders", Buffer.from(JSON.stringify(data)));
};
