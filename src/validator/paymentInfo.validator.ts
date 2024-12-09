import { body } from "express-validator";
import User from "../models/user.model";
import { PaymentInfo } from "../models/paymentInfo.model";

export const paymentInfoValidator = [
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .bail()
    .isInt()
    .withMessage("User ID must be an integer")
    .bail()
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        return Promise.reject("User ID does not exist");
      }
    }),

  body("accountName")
    .notEmpty()
    .withMessage("Account name is required")
    .bail()
    .isString()
    .withMessage("Account name must be a string")
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Account name must be between 1 and 255 characters long"),

  body("bankName")
    .notEmpty()
    .withMessage("Bank name is required")
    .bail()
    .isString()
    .withMessage("Bank name must be a string")
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Bank name must be between 1 and 255 characters long"),

  body("accountNumber")
    .notEmpty()
    .withMessage("Account number is required")
    .bail()
    .isString()
    .withMessage("Account number must be a string")
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Account number must be between 1 and 255 characters long")
    .bail()
    .custom(async (value) => {
      const paymentInfo = await PaymentInfo.findOne({
        where: { accountNumber: value },
      });
      if (paymentInfo) {
        return Promise.reject("Account number already exists");
      }
    }),
];
