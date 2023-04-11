import { Router } from 'express';
import { getTickets, getTicketsType, postTicket } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { postTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getTickets)
  .get('/types', getTicketsType)
  .post('/', validateBody(postTicketSchema), postTicket);

export { ticketsRouter };
