import { notFoundError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function createPayment(ticketId: number, cardData: CardData) {
  const ticket = await ticketRepository.findById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const result = await paymentRepository.createPayment({
    ticketWithTicketType: ticket,
    issuer: cardData.issuer,
    name: cardData.name,
    number: cardData.number,
    cvv: cardData.cvv,
    expirationDate: cardData.expirationDate,
  });

  await ticketRepository.tagAsPaid(ticketId);

  return result;
}

export type CardData = {
  issuer: string;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
};

const paymentsService = {
  createPayment,
};

export default paymentsService;
