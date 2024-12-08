import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import User from "./user.model";

export class RefreshToken extends Model {
  public id!: number;
  public user_id!: number;
  public token!: string;
  public isRevoked!: boolean;
  public revokedAt!: Date;
  public expiresAt!: Date;
  public createdAt!: Date;
}

RefreshToken.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    isRevoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "refreshTokens",
    timestamps: true,
  }
);
