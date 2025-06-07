import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { channels } from "../broker/channels/index.ts";
import { db } from "../db/client.ts";
import { randomUUID } from "node:crypto";
import { schema } from "../db/schema/index.ts";
import { sendOrderCreated } from "../broker/messages/order-created.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: "*" });

app.get("/health-check", () => {
  return "App rodando normalmente!!!";
});

app.post(
  "/orders",
  {
    schema: {
      body: z.object({
        amount: z.coerce.number(),
      }),
    },
  },
  async (request, reply) => {
    const { amount } = request.body;

    console.log("Criando pedido com valor");

    const orderId = randomUUID();

    sendOrderCreated({
      orderId,
      amount,
      custumer: {
        id: "a1769f22-ac85-4b74-a30a-0b487ae05cab",
      },
    });

    await db.insert(schema.orders).values({
      id: orderId,
      customerId: "a1769f22-ac85-4b74-a30a-0b487ae05cab",
      amount,
    });

    return reply.status(201).send();
  }
);

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.log("[ORDERS] Tô rodandooooooooo");
});
