import { Response } from 'express';
import httpStatus from 'http-status';

import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';
import { unauthorizedError } from '@/errors';
import paymentsService from '@/services/payments-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const { ticketId } = req.query;
    const ticketWithData = await ticketsService.getTicketById(Number(ticketId));

    const userId = req.userId;
    if (ticketWithData.Enrollment.userId !== userId) {
      throw unauthorizedError();
    }

    const payment = ticketWithData.Payment[0];

    const result = {
      id: payment.id,
      ticketId: ticketWithData.id,
      value: ticketWithData.TicketType.price,
      cardIssuer: payment.cardIssuer,
      cardLastDigits: payment.cardLastDigits,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };

    res.status(httpStatus.OK).json(result);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (err.name === 'UnauthorizedError') {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    throw err;
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const { ticketId, cardData } = req.body;
    const ticketWithData = await ticketsService.getTicketById(Number(ticketId));

    const userId = req.userId;
    if (ticketWithData.Enrollment.userId !== userId) {
      throw unauthorizedError();
    }

    const payment = await paymentsService.createPayment(ticketWithData.id, cardData);

    const result = {
      id: payment.id,
      ticketId: ticketWithData.id,
      value: ticketWithData.TicketType.price,
      cardIssuer: payment.cardIssuer,
      cardLastDigits: payment.cardLastDigits,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };

    res.status(httpStatus.OK).json(result);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (err.name === 'UnauthorizedError') {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    throw err;
  }
}
