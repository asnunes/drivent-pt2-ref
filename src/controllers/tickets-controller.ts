import httpStatus from 'http-status';
import { Request, Response } from 'express';

import enrollmentsService from '@/services/enrollments-service';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketsType(req: Request, res: Response) {
  const tickets = await ticketsService.getTicketTypes();

  return res.status(httpStatus.OK).json(tickets);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const ticket = await ticketsService.getTicketsByEnrollmentId(enrollment.id);

    const result = {
      id: ticket.id,
      status: ticket.status,
      ticketTypeId: ticket.ticketTypeId,
      enrollmentId: ticket.enrollmentId,
      TicketType: {
        id: ticket.TicketType.id,
        name: ticket.TicketType.name,
        price: ticket.TicketType.price,
        isRemote: ticket.TicketType.isRemote,
        includesHotel: ticket.TicketType.includesHotel,
        createdAt: ticket.TicketType.createdAt.toISOString(),
        updatedAt: ticket.TicketType.updatedAt.toISOString(),
      },
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
    };

    return res.status(httpStatus.OK).json(result);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).json(err);
    }

    throw err;
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const ticketType = await ticketsService.getTicketTypeById(req.body.ticketTypeId);

    const ticket = await ticketsService.createTicket(enrollment.id, ticketType.id);

    const result = {
      id: ticket.id,
      status: ticket.status,
      ticketTypeId: ticket.ticketTypeId,
      enrollmentId: ticket.enrollmentId,
      TicketType: {
        id: ticketType.id,
        name: ticketType.name,
        price: ticketType.price,
        isRemote: ticketType.isRemote,
        includesHotel: ticketType.includesHotel,
        createdAt: ticketType.createdAt.toISOString(),
        updatedAt: ticketType.updatedAt.toISOString(),
      },
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
    };

    return res.status(httpStatus.CREATED).json(result);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).json(err);
    }

    throw err;
  }
}
