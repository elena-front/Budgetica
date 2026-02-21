import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from "sequelize";
import { DataTypes, Model } from "sequelize";
import type User from "./user";
import type Budget from "./budget";
import type Category from "./category";

export default class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User["id"]>;
  declare category_id: ForeignKey<Category["id"]>;
  declare budget_id: ForeignKey<Budget["id"]>;
  declare amount: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(models: {
    User: typeof User;
    Budget: typeof Budget;
    Category: typeof Category;
  }) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Budget, { foreignKey: "budget_id" });
    this.belongsTo(models.Category, { foreignKey: "category_id" });
  }

  static initModel(sequelize: Sequelize): typeof Transaction {
    return Transaction.init(
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
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        budget_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: "Transaction",
        sequelize,
      },
    );
  }
}
