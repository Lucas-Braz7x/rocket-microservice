import amqp from "amqplib";

if (!process.env.BROKER_URL) {
  throw new Error("A variável de ambiente 'BROKER_URL' não foi configurada");
}

export const broker = await amqp.connect(process.env.BROKER_URL);
