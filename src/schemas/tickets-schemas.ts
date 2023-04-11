import Joi from 'joi';

export const postTicketSchema = Joi.object({
  ticketTypeId: Joi.number().integer().positive().required(),
}).unknown(false);
