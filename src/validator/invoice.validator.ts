import { body } from "express-validator";
import { Client } from "../models/client.model";
import { Invoice } from "../models/invoice.model";
import User from "../models/user.model";

export const invoiceValidator = [
  body("invoiceNumber")
    .notEmpty()
    .withMessage("Invoice number is required")
    .bail()
    .isString()
    .withMessage("Invoice number must be a string")
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Invoice number must be between 1 and 255 characters long")
    .bail()
    .custom(async (value, { req }) => {
      const invoice = await Invoice.findOne({
        where: { invoiceNumber: value, user_id: req.body.user_id },
      });
      if (invoice) {
        return Promise.reject("Invoice number already exists for this user");
      }
    }),

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

  body("reciver_id")
    .notEmpty()
    .withMessage("Receiver ID is required")
    .bail()
    .isInt()
    .withMessage("Receiver ID must be an integer")
    .bail()
    .custom(async (value, { req }) => {
      const client = await Client.findByPk(value);
      if (!client) {
        return Promise.reject("Receiver ID does not exist");
      } else if (client.user_id !== req.body.user_id) {
        return Promise.reject(
          "Receiver ID (client) does not belong to the specified User ID"
        );
      }
    }),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .bail()
    .isDate()
    .withMessage("Due date must be a valid date"),

  body("subtotal")
    .notEmpty()
    .withMessage("Subtotal is required")
    .bail()
    .isDecimal()
    .withMessage("Subtotal must be a decimal"),

  body("total")
    .notEmpty()
    .withMessage("Total is required")
    .bail()
    .isDecimal()
    .withMessage("Total must be a decimal"),

  body("currency")
    .notEmpty()
    .withMessage("Currency is required")
    .bail()
    .isString()
    .withMessage("Currency must be a string")
    .bail()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-letter code"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .bail()
    .isIn(["draft", "sent", "paid", "overdue"])
    .withMessage(
      "Status must be one of the following: draft, sent, paid, overdue"
    ),
];
