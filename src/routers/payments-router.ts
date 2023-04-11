import { Router } from 'express';
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import { getPayments, postPayments } from '@/controllers';
import { getPaymentsSchema, postPaymentsSchema } from '@/schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', validateQuery(getPaymentsSchema), getPayments)
  .post('/process', validateBody(postPaymentsSchema), postPayments);

export { paymentsRouter };
