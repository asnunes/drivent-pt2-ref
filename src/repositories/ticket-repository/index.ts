import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

function findByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

function findById(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      TicketType: true,
      Enrollment: true,
      Payment: true,
    },
  });
}

function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: TicketStatus.RESERVED,
    },
  });
}

function tagAsPaid(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  findByEnrollmentId,
  createTicket,
  findById,
  tagAsPaid,
};

export default ticketRepository;
