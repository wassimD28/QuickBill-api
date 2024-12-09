import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/interfaces/common.interface";
import { AccessLevel, ModelType } from "../types/enums/common.enum";
import { Invoice } from "../models/invoice.model";
import { Product } from "../models/product.model";
import { Client } from "../models/client.model";
import { LineItem } from "../models/lineItem.model";
import { PaymentInfo } from "../models/paymentInfo.model";
import { RefreshToken } from "../models/refreshToken.model";

export const setAuthorization = (
  entity: ModelType,
  accessLevel: AccessLevel
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const entityName = entity;
    const entity_id = req.params.id;
    let response: ApiResponse;
    if (!entity_id) {
      response = {
        success: false,
        message: "Entity ID is required",
      };
      res.status(400).json(response);
      return;
    }
    let Entity: any;

    switch (entityName) {
      case ModelType.INVOICE:
        Entity = Invoice;
        break;
      case ModelType.PRODUCT:
        Entity = Product;
        break;
      case ModelType.CLIENT:
        Entity = Client;
        break;
      case ModelType.LINE_ITEM:
        Entity = LineItem;
        break;
      case ModelType.PAYMENT_INFO:
        Entity = PaymentInfo;
        break;
      case ModelType.REFRESH_TOKEN:
        Entity = RefreshToken;
        break;
      default:
        response = {
          success: false,
          message: "Invalid model type",
        };
        res.status(400).json(response);
        return;
    }
    // check if the entity exists
    const entityExists = await Entity.findByPk(entity_id);
    if (!entityExists) {
      response = {
        success: false,
        message: `${entityName} entity not found`,
      };
      res.status(404).json(response);
      return;
    }
    // check if the entity belongs to the authenticated user or the authenticated user is an admin
    const authenticatedUser = req.auth;
    switch (accessLevel) {
      // check if the user is the entity owner
      case AccessLevel.OWNER_ONLY:
        if (entityExists.user_id !== authenticatedUser?.user_id) {
          response = {
            success: false,
            message: "Unauthorized to access this entity",
          };
          res.status(403).json(response);
          return;
        }
        break;
      // check if the user is an admin
      case AccessLevel.ADMIN_ONLY:
        if (!authenticatedUser?.roles?.includes("ADMIN")) {
          response = {
            success: false,
            message: "Unauthorized to access this entity",
          };
          res.status(403).json(response);
          return;
        }
        break;
      // check if the user is the entity owner or an admin
      case AccessLevel.OWNER_OR_ADMIN:
        if (
          entityExists.user_id !== authenticatedUser?.user_id &&
          !authenticatedUser?.roles?.includes("ADMIN")
        ) {
          response = {
            success: false,
            message: "Unauthorized to access this entity",
          };
          res.status(403).json(response);
          return;
        }
        break;
      // default case for invalid access level
      default:
        response = {
          success: false,
          message: "Invalid access level",
        };
        res.status(400).json(response);
        return;
    }
    // Call the next middleware or route handler
    next();
  };
};
