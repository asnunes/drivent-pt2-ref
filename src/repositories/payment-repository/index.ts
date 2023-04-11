import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function createPayment(data: CreatePayment) {
  const result = await prisma.payment.create({
    data: {
      ticketId: data.ticketWithTicketType.id,
      value: data.ticketWithTicketType.TicketType.price,
      cardIssuer: data.issuer,
      cardLastDigits: data.number.slice(-4),
    },
  });

  return result;
}

export type CreatePayment = {
  ticketWithTicketType: Ticket & {
    TicketType: TicketType;
  };
  issuer: string;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
};

const paymentRepository = {
  createPayment,
};

export default paymentRepository;
