import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from "sequelize";
import { DataTypes, Model } from "sequelize";
import type User from "./user";
import type Category from "./category";
import type Saving from "./saving";
import type Transaction from "./transaction";

export default class Budget extends Model<
  InferAttributes<Budget>,
  InferCreationAttributes<Budget>
> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User["id"]>;

  declare month: number;
  declare year: number;
  declare total_amount: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(models: {
    User: typeof User;
    Category: typeof Category;
    Saving: typeof Saving;
    Transaction: typeof Transaction;
  }) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.hasMany(models.Category, { foreignKey: "budget_id" });
    this.hasMany(models.Transaction, { foreignKey: "budget_id" });
  }

  static initModel(sequelize: Sequelize): typeof Budget {
    return Budget.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        month: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.NUMBER,
          allowNull: true,
        },
        total_amount: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: "Budget",
        sequelize,
      },
    );
  }
}
