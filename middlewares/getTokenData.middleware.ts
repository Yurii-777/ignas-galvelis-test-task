import { param } from 'express-validator';

export const getTokenData = [
  param('id').not().isEmpty().withMessage('Can not be empty').isString().withMessage('Should be a string'),
];
