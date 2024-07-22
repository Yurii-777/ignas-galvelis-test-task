import { param } from 'express-validator';

export const getTokenData = [
  param('tokenName').not().isEmpty().withMessage('Can not be empty').isString().withMessage('Should be a string'),
];
