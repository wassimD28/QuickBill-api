import { body } from "express-validator";

export const accessTokenValidator = [
  body("refreshToken")
    .notEmpty()
    .withMessage("Access token is required")
    .bail()
    .isString()
    .withMessage("Access token must be a valid string."),
];
