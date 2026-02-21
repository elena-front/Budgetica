import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from "sequelize";
import { DataTypes, Model } from "sequelize";
import type Transaction from "./transaction";
import type Budget from "./budget";
import type User from "./user";

export default class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User["id"]>;
  declare budget_id: ForeignKey<Budget["id"]>;
  declare name: string;
  declare budget_limit: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(models: {
    User: typeof User;
    Budget: typeof Budget;
    Transaction: typeof Transaction;
  }) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Budget, { foreignKey: "budget_id" });
    this.hasMany(models.Transaction, { foreignKey: "category_id" });
  }

  static initModel(sequelize: Sequelize): typeof Category {
    return Category.init(
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
        budget_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        budget_limit: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: "Category",
        sequelize,
      },
    );
  }
}
