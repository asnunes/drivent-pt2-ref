import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import ticketTypeRepository from '@/repositories/ticket-type-repository';

function getTicketTypes() {
  return ticketTypeRepository.findAll();
}

async function getTicketTypeById(id: number) {
  const result = await ticketTypeRepository.findById(id);
  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getTicketsByEnrollmentId(enrollmentId: number) {
  const result = await ticketRepository.findByEnrollmentId(enrollmentId);
  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getTicketById(id: number) {
  const result = await ticketRepository.findById(id);
  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  const result = await ticketRepository.createTicket(enrollmentId, ticketTypeId);

  return result;
}

const ticketsService = {
  getTicketTypes,
  getTicketTypeById,
  getTicketsByEnrollmentId,
  getTicketById,
  createTicket,
};

export default ticketsService;
