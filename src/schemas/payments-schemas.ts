import Joi from 'joi';

export const getPaymentsSchema = Joi.object({
  ticketId: Joi.number().integer().positive().required(),
}).required();

export const postPaymentsSchema = Joi.object({
  ticketId: Joi.number().integer().positive().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required(),
  }),
})
  .required()
  .unknown(false);
