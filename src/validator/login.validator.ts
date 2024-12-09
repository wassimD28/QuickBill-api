import { body } from "express-validator";

export const loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isString()
    .withMessage("Username must be a valid string.")
    .bail(),
  body("password").notEmpty().withMessage("Password is required").bail(),
];
