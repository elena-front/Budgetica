import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from "sequelize";
import { DataTypes, Model } from "sequelize";
import type Budget from "./budget";
import type User from "./user";

export default class Saving extends Model<
  InferAttributes<Saving>,
  InferCreationAttributes<Saving>
> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User["id"]>;
  declare budget_id: ForeignKey<Budget["id"]>;
  declare amount: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(models: { User: typeof User; Budget: typeof Budget }) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Budget, { foreignKey: "budget_id" });
  }

  static initModel(sequelize: Sequelize): typeof Saving {
    return Saving.init(
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
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: "Saving",
        sequelize,
      },
    );
  }
}
